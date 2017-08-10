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

export enum IEnAddPharmacy {
  governorate = 'Governorate',
  city = 'City',
  area = 'Area',
  address = 'Address',
  landmark = 'LandMark',
  mobile = 'Pharmacy Number',
  pharmacyname = 'Pharmacy Name',
  personalid = 'Personal Id',
  reg_num = 'Registeration Id',
  syndicate_num = 'Syndicate Number'
}
