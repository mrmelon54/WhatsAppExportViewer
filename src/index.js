// This file is the entry point for the Electron application.

const {autoUpdater} = require("electron-updater");
const {app, BrowserWindow, Menu, dialog, ipcMain, shell} = require("electron");
const {getMenuTemplate} = require("./menu");
const fs = require("fs");
const path = require("path");
const readLinesN2M = require("./utils/ReadLinesN2M");
const countLines = require("./utils/CountLines");
const makeDir = require("make-dir");
const envPaths = require("env-paths");

// app paths
const appPaths = envPaths.default("WhatsAppExportViewer");
console.log("Using app config path:", appPaths.config);

var currentPackage;

if (path.basename(__dirname) == "app.asar") {
  console.log("Package info hidden in app.asar");
  let d = path.dirname(__dirname);
  currentPackage = JSON.parse(fs.readFileSync(path.join(d, "app.asar", "package.json"), "utf8"));
} else {
  currentPackage = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
}

function defaultConfig() {
  return {
    firstName: "",
  };
}

const funcs = {
  openAbout,
};

function openAbout() {
  const options = {
    type: "info",
    buttons: ["Ok"],
    defaultId: 2,
    title: currentPackage.productName,
    message: currentPackage.productName,
    detail: `
Version: ${currentPackage.version}
ID: ${currentPackage.appId}
Copyright: ${currentPackage.copyright}
Electron: ${process.versions.electron}
Chrome: ${process.versions.chrome}
NodeJS: ${process.versions.node}
V8: ${process.versions.v8}
`,
  };

  dialog.showMessageBox(null, options, () => {});
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.on("will-navigate", (_event, url) => {
    if (url.startsWith("file://") || url.startsWith("http://localhost:3000/")) return;
    _event.preventDefault();
    shell.openExternal(url);
  });

  const menu = Menu.buildFromTemplate(getMenuTemplate(win, funcs));
  Menu.setApplicationMenu(menu);

  if (process.env.NODE_ENV !== "development") {
    // Load production build
    win.loadFile(`${__dirname}/renderer/dist/index.html`);
  } else {
    // Load vite dev server page
    console.log("Development mode");
    win.loadURL("http://localhost:3000/");
  }
}

app.on("ready", () => {
  autoUpdater.checkForUpdatesAndNotify();
});

app.whenReady().then(() => {
  ipcMain.handle("file:countLines", async (_, p) => await new Promise((resolve, _) => countLines(p, n => resolve(n))));
  ipcMain.handle(
    "file:readLines",
    async (_, p, n, m) =>
      await new Promise((resolve, _) => {
        let lines = [];
        readLinesN2M(
          p,
          n,
          m,
          line => lines.push(line),
          () => resolve(lines),
        );
      }),
  );
  ipcMain.handle("config:load", () => {
    return new Promise((resolve, _) => {
      fs.readFile(path.join(appPaths.config, "config.json"), {encoding: "utf8"}, (error, data) => {
        if (error) resolve(defaultConfig());
        else {
          let j;
          try {
            j = JSON.parse(data);
          } catch (e) {
            j = {};
          }
          resolve(Object.assign(defaultConfig(), j));
        }
      });
    });
  });
  ipcMain.handle("config:save", (_event, data) => {
    return new Promise((resolve, reject) => {
      makeDir.sync(appPaths.config);
      fs.writeFile(path.join(appPaths.config, "config.json"), JSON.stringify(data, null, 2), error => {
        if (error) reject(error);
        else resolve();
      });
    });
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
