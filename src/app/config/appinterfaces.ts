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
  countrycall= 'country call number',
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
  mobile = 'Pharmacy Number',
  pharmacyname = 'Pharmacy Name',
  personalid = 'National Id Number',
  reg_num = 'Registeration Number',
  syndicate_num = 'Syndicate Number',


}

export enum IEnAddOfferForm {
  drug_id= 'Drug name',
  expire_date= 'Expiry date',
  discount= 'Discount',
  price= 'Price',
  quantity= 'Quantity'
}

export interface Offers {
  concentration:string,
  content:string,
  created_at:any,
  discount:number,
  drug_id:number,
  expire_date:string,
  id:number,
  name:string,
  price:string,
  quantity:number,
  subunit:string,
  updated_at: any,
  user_id:number,
  using_date:string,
  options: boolean
}
