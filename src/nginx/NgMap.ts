import Base from "./Base";

export default class NgMap extends Base {
  constructor(path: Array<string>) {
    super(path, "map");
  }
  formatter(n: number): string {
    return super.formatter(n);
  }
}
