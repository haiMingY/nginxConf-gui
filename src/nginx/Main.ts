import Item from "./Item";
import Http from "./Http";
import NgEvents from "./NgEvents";
export default class Main {
  Fields: Array<Item> = [];
  events: NgEvents = new NgEvents([]);
  https: Array<Http> = [];
  constructor() {}
  setEvents(events: NgEvents) {
    this.events = events;
  }
  addFiled(filed: Item) {
    this.Fields.push(filed);
  }
  addHttp(http: Http) {
    this.https.push(http);
  }
  formatter(): string {
    return "";
  }

  print() {
    console.log(this.Fields);
    console.log(this.events.formatter(0));
    console.log(this.https[0].formatter(0));
  }
}
