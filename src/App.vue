<template>
  <div id="app">
    <div id="nav">
      <el-button size="small" @click="handleClick">选择</el-button>
      <el-button size="small" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ipcRenderer, EventEmitter } from "electron";
import Ng from "./nginx/Ng";
const fs = require("fs");
const path = require("path");
@Component({})
export default class App extends Vue {
  main: string = "";
  mounted() {
    ipcRenderer.on("sendPath", this.getPath);
    ipcRenderer.on("saveData", this.saveData);
  }
  handleClick(): void {
    ipcRenderer.send("showDialog");
  }
  save() {
    ipcRenderer.send("getSavePathDialog");
  }

  saveData(d: EventEmitter, paths: any) {
    console.log(d);
    console.log(paths);
    let dir = paths[0];
    let filePath = path.resolve(dir, "nginx.conf");
    console.log("filePath", filePath);
    fs.writeFile(
      filePath,
      this.main,
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) throw err;
        console.log("-data", data);
      }
    );
  }
  getPath(d: EventEmitter, paths: any): void {
    let filePath = paths[0];
    if (filePath) {
      // let data = fs.readFileSync(filePath, { encoding: "utf-8" });
      // let app = Ng.parse(data);
      // console.log(app);
      fs.readFile(
        filePath,
        { encoding: "utf-8" },
        (err: NodeJS.ErrnoException | null, data: string) => {
          console.log(err, data);
          if (!err) {
            let app = Ng.parse(data);
            let str = app.formatter();
            this.main = str;
            // fs.writeFile("");
          }
        }
      );
    }
  }
  beforeDestroy() {
    ipcRenderer.removeAllListeners("sendPath");
    ipcRenderer.removeAllListeners("saveData");
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
