export interface Notification {
  sender_id:number,
  recipient_id:number,
  type:string,
  read:boolean,
  content:string,
  deleted:boolean
}

