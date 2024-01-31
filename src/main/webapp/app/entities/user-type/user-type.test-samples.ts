import { IUserType, NewUserType } from './user-type.model';

export const sampleWithRequiredData: IUserType = {
  id: '17891c8d-04c8-4133-8007-085f241429f5',
};

export const sampleWithPartialData: IUserType = {
  id: 'f09b2f26-a89f-4df3-a066-43e840a22487',
  type: 'succumb',
};

export const sampleWithFullData: IUserType = {
  id: 'a8465e93-9197-4020-bf5b-43eebc0786c6',
  type: 'round when times',
};

export const sampleWithNewData: NewUserType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
