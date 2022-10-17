const {shell, dialog} = require("electron");

const isMac = process.platform === "darwin";

function getMenuTemplate(mainWindow, funcs) {
  return [
    ...(isMac
      ? [
          {
            role: "appMenu",
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: "File",
      submenu: [
        {
          label: "Open File",
          accelerator: "CmdOrCtrl+O",
          // this is the main bit hijack the click event
          click() {
            // construct the select file dialog
            dialog
              .showOpenDialog(mainWindow, {
                properties: ["openFile"],
              })
              .then(function (fileObj) {
                // the fileObj has two props
                if (!fileObj.canceled) mainWindow.webContents.send("file:open", fileObj.filePaths);
              })
              .catch(function (err) {
                console.error(err);
              });
          },
        },
        isMac
          ? {
              role: "close",
            }
          : {
              role: "quit",
            },
      ],
    },
    {
      role: "editMenu",
    },
    {
      role: "viewMenu",
    },
    {
      role: "windowMenu",
    },
    {
      role: "help",
      submenu: [
        {
          label: "Developer Website",
          click: async () => {
            await shell.openExternal("https://software.onpointcoding.net/whatsappexportviewer");
          },
        },
        {
          label: "About",
          click: async () => {
            funcs.openAbout();
          },
        },
      ],
    },
  ];
}

module.exports = {getMenuTemplate};
