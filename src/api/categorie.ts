import { zwFetch } from '@/lib/fetch';

export type Categorie = {
  id: number;
  name: string;
  icon: string;
  color: string;
  desc: string;
  count: number;
};

export const getCategories = () => zwFetch<Categorie[]>('/api/categorie');
export const getCategorie = (id: number) => zwFetch<Categorie>(`/api/categorie/${id}`);
