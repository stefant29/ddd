import { ICompany } from 'app/entities/company/company.model';

export interface IClient {
  id: string;
  name?: string | null;
  company?: ICompany | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
