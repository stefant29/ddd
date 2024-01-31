import { IUserType } from 'app/entities/user-type/user-type.model';
import { ICompany } from 'app/entities/company/company.model';

export interface IUser1 {
  id: string;
  nume?: string | null;
  prenume?: string | null;
  cnp?: string | null;
  types?: IUserType[] | null;
  companies?: ICompany[] | null;
}

export type NewUser1 = Omit<IUser1, 'id'> & { id: null };
