export interface Geo {
  type: string,
  coordinates: [number]
};
export interface Address {
  street1: string,
  street2: string,
  city: string,
  state: string,
  zipcode: string
};
export interface Location {
   address: Address,
   geo: Geo
};
export interface Theater {
  theaterId: number,
  location: Location
};
