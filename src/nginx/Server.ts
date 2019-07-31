import Base from "./Base";

export default class server extends Base {
  constructor(path: Array<string>) {
    super(path, "server");
  }
  formatter(n: number): string {
    return super.formatter(n);
  }
}
