export interface ICompany {
  id: string;
  name?: string | null;
}

export type NewCompany = Omit<ICompany, 'id'> & { id: null };
