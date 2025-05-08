import { create } from "zustand";
import { Article, Tag, User } from "@/types";
import { Categorie } from "@/api/categorie";
import { Dict } from "@/api/dict";

interface AppState {
  currentUser: User | null;
  isLoggedIn: boolean;
  setCurrentUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  recentArticles: Article[];
  setRecentArticles: (articles: Article[]) => void;

  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  categories: Categorie[];
  setCategories: (categories: Categorie[]) => void;
}

const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  isLoggedIn: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  recentArticles: [],
  setRecentArticles: (articles) => set({ recentArticles: articles }),

  tags: [],
  setTags: (tags) => set({ tags }),
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

export default useAppStore;
