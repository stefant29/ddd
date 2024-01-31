import { IB, NewB } from './b.model';

export const sampleWithRequiredData: IB = {
  id: 'fd929b2d-e947-45c8-afb7-fa942f486e43',
};

export const sampleWithPartialData: IB = {
  id: '0f3d930d-0f69-4180-9ff3-da7f9557465d',
  name: 'unleash',
};

export const sampleWithFullData: IB = {
  id: '3cb1c016-ef64-4787-a40c-5f736491d101',
  name: 'reassert surcharge elegantly',
};

export const sampleWithNewData: NewB = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
