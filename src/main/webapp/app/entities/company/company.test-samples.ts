import { ICompany, NewCompany } from './company.model';

export const sampleWithRequiredData: ICompany = {
  id: '93cc98fe-f2e0-46ec-8b97-8fca6547a32a',
};

export const sampleWithPartialData: ICompany = {
  id: 'fda04e0d-c7bd-4c71-8cfe-72a071289310',
  name: 'awkwardly',
};

export const sampleWithFullData: ICompany = {
  id: 'd837c82e-5475-41db-a00e-8bad0319a5df',
  name: 'truant qua meh',
};

export const sampleWithNewData: NewCompany = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
