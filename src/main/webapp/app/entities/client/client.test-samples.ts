import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: '48f0afd0-b893-49f4-b24b-03f6c8ab49d2',
};

export const sampleWithPartialData: IClient = {
  id: '6ec0b818-eb2b-44c5-8149-84b54670cba6',
  name: 'or underlie what',
};

export const sampleWithFullData: IClient = {
  id: '07c1919d-f3e2-4754-9e7d-cb031cf4be15',
  name: 'yahoo around',
};

export const sampleWithNewData: NewClient = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
