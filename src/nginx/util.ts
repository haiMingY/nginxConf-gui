export function createSpace(num: number): string {
  let str = "";
  while (num-- > 0) {
    str += "\t";
  }
  return str;
}
