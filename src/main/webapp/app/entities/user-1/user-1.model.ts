export interface IUser1 {
  id: string;
  nume?: string | null;
  prenume?: string | null;
  cnp?: string | null;
}

export type NewUser1 = Omit<IUser1, 'id'> & { id: null };
