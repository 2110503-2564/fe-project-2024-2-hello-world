'use client';



export interface BookingItem {
  _id: string;
  reserveDate: string;
  restaurant: Restaurant | null;
  user: {  // Define 'user' as an object
    _id: string;
    name: string;
    email: string;
  };
}

export interface Restaurant {
  _id:string,
  name:string,
  address:string,
  phone:string,
  open_time:string,
  close_time:string,
  picture:string,
}

export interface RestaurantItem {
  id: string;
  name: string;
  picture: string;
}

export interface RestaurantJson {
  count: number;
  data: RestaurantItem[];
}