<template>
  <div id="app">
    <div id="nav">
      <el-button size="small" @click="handleClick">选择</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ipcRenderer, EventEmitter } from "electron";

import fs from "fs";
import Ng from "./nginx/Ng";
@Component({})
export default class App extends Vue {
  mounted() {
    ipcRenderer.on("sendPath", this.getPath);
  }
  handleClick(): void {
    ipcRenderer.send("showDialog");
  }
  getPath(d: EventEmitter, data: any): void {
    let path = data[0];
    console.log(path);
    if (path) {
      console.log(path);
      fs.readFile(
        path,
        { encoding: "utf-8" },
        (err: NodeJS.ErrnoException | null, data) => {
          console.log(err, data);
          if (!err) {
            let app = Ng.parse(data);
            console.log(app);
          }
        }
      );
    }
  }
  beforeDestroy() {
    ipcRenderer.removeAllListeners("sendPath");
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
