import { Room } from "./Room";

export interface CalProps { 
  room: Room; 
  from: string; 
  to: string; 
  onSelect:(iso:string)=>void; 
  onClose:()=>void; 
  selectingFrom: boolean; 
}