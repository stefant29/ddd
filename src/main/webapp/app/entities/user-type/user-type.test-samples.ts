import { IUserType, NewUserType } from './user-type.model';

export const sampleWithRequiredData: IUserType = {
  id: '7cac9dbf-1ee1-4786-bfd7-485c7885ee01',
};

export const sampleWithPartialData: IUserType = {
  id: '3110e9dd-7dcd-4726-bcc9-2e84317dc19c',
};

export const sampleWithFullData: IUserType = {
  id: '4feb7699-ad7f-4afd-8db4-2c1b9cd05f31',
  type: 'apparatus blindly',
};

export const sampleWithNewData: NewUserType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
