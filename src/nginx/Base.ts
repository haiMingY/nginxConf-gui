import Item from "./Item";
import { createSpace } from "./util";
export default class Base {
  name: string = "";
  isComment: Boolean = false; // 注释?
  path: Array<string> = [];
  Fields: Array<Item> = [];
  children: Array<any> = [];
  constructor(path: Array<string>, name: string) {
    this.path = path;
    this.name = name;
  }
  addFiled(filed: Item) {
    this.Fields.push(filed);
  }

  addChild(child: any) {
    this.children.push(child);
  }

  formatter(n: number): string {
    let str = "\n" + createSpace(n);
    if (this.isComment) str += "#";
    str += this.name + " " + this.path.join(" ") + " {\n";
    str += this.Fields.map(e => e.formatter(n + 2)) + "\n";
    str += this.children.map(e => e.formatter(n + 2));
    str += "\n" + createSpace(n);
    if (this.isComment) str += "#";
    return str + "} \n";
  }
}
