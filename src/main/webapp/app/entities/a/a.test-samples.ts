import { IA, NewA } from './a.model';

export const sampleWithRequiredData: IA = {
  id: '2129d6bd-38e8-430b-afe4-0f2d66537eba',
};

export const sampleWithPartialData: IA = {
  id: 'eb4c686d-ad44-4aa9-850f-d692e056eb63',
  name: 'indolent entity',
};

export const sampleWithFullData: IA = {
  id: '1ae3fd39-4b13-40f5-9fe8-03910414e474',
  name: 'lean ha brr',
};

export const sampleWithNewData: NewA = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
