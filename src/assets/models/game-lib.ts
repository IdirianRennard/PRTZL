import { Icon } from "./icon";

export interface GameTab extends Object {
  name: string;
  loc: string;
  icon: Icon
}

export interface LibCheckoutTxn extends Object {
  attendee: number;
  game: number;
  timestame: string;
}
