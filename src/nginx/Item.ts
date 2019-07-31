import { createSpace } from "./util";
type value_type = string | Number;

export default class Item {
  blankLine: Boolean = false; //空行
  isComment: Boolean = false; // 是不是注释
  content: string = ""; // 注释内容
  itemKey: string = ""; // 名称
  itemValue: Array<value_type> = []; // 值
  constructor(itemKey?: string, itemValue?: Array<value_type>) {
    this.itemKey = itemKey || "";
    this.itemValue = itemValue || [];
  }
  setBlankLine(blankLine: Boolean) {
    this.blankLine = blankLine;
  }
  toString(): String {
    return this.formatter(0);
  }
  formatter(space: number): string {
    let str = " ";
    if (!this.blankLine) {
      if (!this.isComment) {
        console.log(this.itemKey, this.itemValue);
        str += this.itemKey + " " + this.itemValue.join(" ") + ";";
      } else {
        str += "#" + this.content;
      }
    }
    return createSpace(space) + str;
  }
}
