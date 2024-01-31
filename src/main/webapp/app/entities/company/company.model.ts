import { IUser1 } from 'app/entities/user-1/user-1.model';
import { IClient } from 'app/entities/client/client.model';

export interface ICompany {
  id: string;
  name?: string | null;
  users?: IUser1[] | null;
  clients?: IClient[] | null;
}

export type NewCompany = Omit<ICompany, 'id'> & { id: null };
