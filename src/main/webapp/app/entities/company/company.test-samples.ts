import { ICompany, NewCompany } from './company.model';

export const sampleWithRequiredData: ICompany = {
  id: 'd84d2025-e1a6-44fa-a721-79494d9ce292',
};

export const sampleWithPartialData: ICompany = {
  id: '3cab1a2f-91ab-4bf8-9bd1-9831a3d2b232',
};

export const sampleWithFullData: ICompany = {
  id: 'c7a46908-7f4d-4b14-b1dc-99fdb57a4139',
  name: 'calmly whether',
};

export const sampleWithNewData: NewCompany = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
