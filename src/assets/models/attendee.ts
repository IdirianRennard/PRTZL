
export interface Attendee extends Object {
  attendee_id: string,
  first_name: string,
  last_name: string,
  barcode: Badge[],
}

export interface Badge extends Object {
  id: string,
  timestamp: string
}
