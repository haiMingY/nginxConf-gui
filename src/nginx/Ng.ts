import Main from "./Main";
import Base from "./Base";
import Http from "./Http";
import Item from "./Item";
import Location from "./Location";
import NgEvents from "./NgEvents";
import server from "./Server";
import NgMap from "./NgMap";

function filter(path: Array<string>, type: string = ""): Array<string> {
  return path.filter(
    e => e && trim(e) && trim(e) !== "{" && e !== type.toLowerCase()
  );
}

function create(type: string, path: Array<string>): Base {
  let lower = type.toLowerCase().trim();
  if (lower === "http") {
    return new Http();
  } else if (lower === "events") {
    return new NgEvents(path);
  } else if (lower === "server") {
    return new server(path);
  } else if (lower === "location") {
    return new Location(path);
  } else if (lower === "map") {
    return new NgMap(path);
  }
  console.log("------type", type, "--------path", path);
  return new Base(path, "");
}

function normalize(arr: Array<string>): Array<string> {
  let result: Array<string> = [];
  arr.forEach((e, i) => {
    e = e.replace(/\s/g, "");
    if (i !== 0 && e !== "}" && e) {
      result.push(e);
    }
  });
  return result;
}

function trim(params: string) {
  let reg = /\s/g;
  return params.replace(reg, "");
}
export default class NgJson {
  static parse(str: string): Main {
    const ngItemArr = str.split(/\n/g);
    let main = new Main();
    let queue: Array<Base> = [];
    ngItemArr.forEach(e => {
      let hasSiren = e.trim().startsWith("#");
      const reg = /[#|;]/g;
      e = e.replace(reg, "");
      if (e.includes("{")) {
        let prevObj = queue[queue.length - 1];
        let arr = filter(e.split(" "));
        let type = trim(arr[0]);
        let obj = create(type, normalize(arr));
        obj.isComment = hasSiren;
        queue.push(obj);
        if (type === "events") {
          main.setEvents(obj);
        } else if (type === "http") {
          main.https.push(obj);
        } else {
          if (prevObj) {
            prevObj.addChild(obj);
          }
        }
      } else if (e.includes("}")) {
        queue.pop();
      } else {
        let prevObj = queue[queue.length - 1] || main;
        let item = new Item();
        if (!e.replace("#", "").trim()) {
          item.blankLine = true;
        } else {
          if (hasSiren) {
            item.content = e;
            item.isComment = hasSiren;
          } else {
            let str = e.trim().split(" ");
            item.key = str[0];
            item.value = normalize(str);
          }
        }
        prevObj.addFiled(item);
      }
    });
    return main;
  }
}
