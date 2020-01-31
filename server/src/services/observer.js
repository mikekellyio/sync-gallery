const chokidar = require("chokidar");
const EventEmitter = require("events").EventEmitter;
const fsExtra = require("fs-extra");

class Observer extends EventEmitter {
  constructor() {
    super();
  }

  watchFolder(folder) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for folder changes on: ${folder}`
      );

      var watcher = chokidar.watch(folder, { persistent: true });

      watcher.on("add", async filePath => {
        if (filePath.includes("jpg")) {
          console.log(
            `[${new Date().toLocaleString()}] ${filePath} has been added.`
          );

          // emit an event when new file has been added
          this.emit("file-added", {
            type: "file-added",
            path: `api/images/${filePath.split("/").pop()}`
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Observer;
