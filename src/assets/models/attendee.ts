
export interface Attendee extends Object {
  id: string,
  first_name: string,
  last_name: string,
  barcode: Badge[],
}

export interface Badge extends Object {
  attendee_id: string,
  barcode: string,
  timestamp: string,
}
