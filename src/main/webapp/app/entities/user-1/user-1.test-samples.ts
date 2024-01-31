import { IUser1, NewUser1 } from './user-1.model';

export const sampleWithRequiredData: IUser1 = {
  id: '15050148-b605-4c73-bc04-6599de643c96',
};

export const sampleWithPartialData: IUser1 = {
  id: '11b06ae5-97a0-40cb-9cf7-5c611ee888e9',
  cnp: 'single up hourly',
};

export const sampleWithFullData: IUser1 = {
  id: 'f011e39c-813f-4e60-ab8f-9d10088fc97c',
  nume: 'envious accidentally',
  prenume: 'softly',
  cnp: 'and',
};

export const sampleWithNewData: NewUser1 = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
