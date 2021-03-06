import { ipcMain, dialog } from "electron";
ipcMain.on("showDialog", function name(event: any) {
  dialog.showOpenDialog(
    {
      title: "选择配置文件",
      buttonLabel: "选择",
      filters: [
        {
          name: "ngConfig",
          extensions: ["conf"]
        }
      ],
      properties: ["openFile"]

      // filters: [{
      //     extensions: '.conf',
      //     name: ''
      // }]
    },
    result => {
      // ipcMain.emit("sendPath", result);
      console.log("------------result");
      event.reply("sendPath", result);
    }
  );
});

ipcMain.on("getSavePathDialog", function(event: any) {
  dialog.showOpenDialog(
    {
      title: "选择保存文件夹",
      buttonLabel: "选择",
      filters: [],
      properties: ["openDirectory"]

      // filters: [{
      //     extensions: '.conf',
      //     name: ''
      // }]
    },
    result => {
      // ipcMain.emit("sendPath", result);
      console.log("------------result");
      event.reply("saveData", result);
    }
  );
});
