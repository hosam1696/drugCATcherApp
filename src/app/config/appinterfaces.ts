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
export enum IEnSignUpControls {
  firstname= 'First Name',
  lastname = 'Last Name',
  mobile = 'Mobile number',
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
  personalid = 'Personal Id',
  reg_num = 'Registeration Id',
  syndicate_num = 'Syndicate Number',


}
