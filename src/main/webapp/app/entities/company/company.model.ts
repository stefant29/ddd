import { IUser1 } from 'app/entities/user-1/user-1.model';

export interface ICompany {
  id: string;
  name?: string | null;
  user1?: IUser1 | null;
}

export type NewCompany = Omit<ICompany, 'id'> & { id: null };
