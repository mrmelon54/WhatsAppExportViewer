import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // Receive trigger
  handleFileOpen: callback => ipcRenderer.on("file:open", callback),

  // Invoke trigger
  invokeFileCountLines: p => ipcRenderer.invoke("file:countLines", p),
  invokeFileReadLines: (p, n, m) => ipcRenderer.invoke("file:readLines", p, n, m),
  invokeLoadConfig: () => ipcRenderer.invoke("config:load"),
  invokeSaveConfig: data => ipcRenderer.invoke("config:save", data),
});
