import { IUser1 } from 'app/entities/user-1/user-1.model';

export interface IUserType {
  id: string;
  type?: string | null;
  users?: IUser1[] | null;
}

export type NewUserType = Omit<IUserType, 'id'> & { id: null };
