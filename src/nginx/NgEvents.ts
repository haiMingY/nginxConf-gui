import Item from "./Item";
import { createSpace } from "./util";
import Base from "./Base";
export default class NgEvents extends Base {
  constructor(path: Array<string>) {
    super(path, "events");
  }
  formatter(n: number = 0): string {
    return super.formatter(n);
  }
}
