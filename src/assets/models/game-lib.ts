import { Icon } from "./icon";

export interface GameLibraryDto extends Object {
  title: string;
  barcode: string | number | null;
  goodForKids: string | boolean | null;
  goodFor2P: string | boolean | null;
  players: string | null;
  estTime: string | number | null;
  recAge: string | null;
  ptw: string | boolean | null;
  notes: string;
}


export interface GameTab extends Object {
  name: string;
  loc: string;
  icon: Icon
}

export interface LibCheckoutTxn extends Object {
  attendee_barcode: string;
  game_barcode: string;
  timestamp: string;
}
