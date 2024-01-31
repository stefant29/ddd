import { ICompany, NewCompany } from './company.model';

export const sampleWithRequiredData: ICompany = {
  id: '0319a5df-9d7e-4315-9ce1-53e3ab657a53',
};

export const sampleWithPartialData: ICompany = {
  id: '9cd88dba-98f2-4ae6-bc9f-a92e51931d08',
  name: 'knowledgeably',
};

export const sampleWithFullData: ICompany = {
  id: '07ac4327-7da6-4c9b-b548-c063d84d2025',
  name: 'anti',
};

export const sampleWithNewData: NewCompany = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
