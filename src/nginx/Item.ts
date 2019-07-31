import { createSpace } from "./util";
type value_type = string | Number;

export default class Item {
  blankLine: Boolean = false; //空行
  isComment: Boolean = false; // 是不是注释
  content: string = ""; // 注释内容
  key: string = ""; // 名称
  value: Array<value_type> = []; // 值
  constructor(key?: string, value?: Array<value_type>) {
    this.key = key || "";
    this.value = value || [];
  }
  toString(): String {
    return this.formatter(0);
  }
  formatter(space: number): string {
    let str = "";
    if (!this.blankLine) {
      if (!this.isComment) {
        str += this.key + " " + this.value.join(" ") + ";";
      } else {
        str += "#" + this.content.trim();
      }
      return createSpace(space) + str + "\n";
    }
    return "";
  }
}
