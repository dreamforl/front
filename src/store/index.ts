import { create } from 'zustand';
import { Article, User } from '../types';

interface AppState {
  currentUser: User | null;
  isLoggedIn: boolean;
  setCurrentUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  
  recentArticles: Article[];
  setRecentArticles: (articles: Article[]) => void;
  
  hotTags: { id: number; name: string; color: string }[];
  setHotTags: (tags: { id: number; name: string; color: string }[]) => void;
}

const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  isLoggedIn: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  
  recentArticles: [],
  setRecentArticles: (articles) => set({ recentArticles: articles }),
  
  hotTags: [],
  setHotTags: (tags) => set({ hotTags: tags }),
}));

export default useAppStore;