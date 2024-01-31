export interface IClient {
  id: string;
  name?: string | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
