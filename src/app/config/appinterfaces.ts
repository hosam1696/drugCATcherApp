export interface IuserLocData {
  city: string,
  country: string,
  hostname: string,
  ip: string,
  loc: any,
  org: string,
  region: string,
  latitude?:number,
  longitude?:number
}

export enum IEnLoginControls {
  email = 'Email',
  password = 'Password'
}
export enum IEnSignUpControls {
  first_name= 'First Name',
  last_name = 'Last Name',
  phone = 'Mobile number',
  email = 'Email',
  country =  'Country',
  country_code= 'country Dial number',
  password = 'Password',
  agreeTerms = 'Agree Terms',
  InsurePassword= 'Confirm Password'
}
export enum IEnFormControls {
  governorate = 'Governorate',
  city = 'City',
  area = 'Area',
  address = 'Address',
  landmark = 'LandMark',
  phone = 'Pharmacy Number',
  name = 'Pharmacy Name',
  personal_id = 'National Id Number',
  registeration_number = 'Registeration Number',
  syndicate_id_number = 'Syndicate Number',


}

export enum IEnAddOfferForm {
  drug_id= 'Drug name',
  expire_date= 'Expiry date',
  discount= 'Discount',
  price= 'Price',
  quantity= 'Quantity'
}

export interface Offers {
  concentration: string,
  content: string,
  created_at:any,
  discount:number,
  drug_id:number,
  expire_date:string,
  id: number,
  offer_id: number,
  name:string,
  price:string,
  quantity:number,
  subunit:string,
  updated_at: any,
  user_id:number,
  using_date:string,
  options: boolean
}

export interface ILoginData {
  id: number,
  email: string,
  token?:string
}

export interface  IUserData {

}


export enum ERequestStatus {
  pendingrequest = 0, // No Actions Yet on the request
  confirmRequest = 1, // offer owner accepted request to be delivered
  cancelRequest  = 2,  // offer requester user refused request to be delivered
  cancelDelivery = 3, // offer owner canceled  delivery process
  cancelPendingRequest  = 4,  // offer owner refused request to be delivered from first time
  cancelPending = 5, // offer requester user refused and refuse his request
  Delivered      = 6// offer owner had delivered the offer
}

export enum ERequestType {
  pendingRequest = 'Pending Request',
  offerDelivery  = 'Offer Delivery',
  requestDelivery= 'RequestDelivery'
}
