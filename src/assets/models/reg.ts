import { Player } from './player';

export interface Reg extends Player {
  id: number,
  badge: number,
  first_name: string,
  last_name: string,
  timestamp: string
}
