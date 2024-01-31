export interface IUserType {
  id: string;
  type?: string | null;
}

export type NewUserType = Omit<IUserType, 'id'> & { id: null };
