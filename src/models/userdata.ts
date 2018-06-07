export interface UserData {
  avatar: any;
  comments: any[];
  creation: Date;
  email: string;
  engagement: string;
  favorites: {};
  firstConnect: false;
  hobbies : any[];
  identity: { mobileVerified: boolean, firstName: string, lastName: string; mobilePhone: string};
  isActive: boolean;
  isAdmin: boolean;
  isValidate: boolean;
  lastLogin: {with: string, when: Date, ua: {}};
  lastSearchs: any[];
  lastVisited: {places: any[], spots: any[]};
  messages: {myTravelRequests: any [], myPlacesBookingRequests: any[]};
  modification: Date;
  myPlaces: any[];
  mySpots: any[];
  rating: {};
  referral: {};
  shortId: string;
  stripe: {};
  _id: string;
}
