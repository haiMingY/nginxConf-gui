import Base from "./Base";

export default class Location extends Base {
  constructor(path: Array<string>) {
    super(path, "location");
  }
  formatter(n: number): string {
    return super.formatter(n);
  }
}
