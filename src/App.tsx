import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/main-layout';
import HomePage from './routes/home';
import ArticleDetailPage from './routes/article-detail';
import CategoriesPage from './routes/categories';
import TagsPage from './routes/tags';
import AboutPage from './routes/about';
import ProfilePage from './routes/profile';
import SearchPage from './routes/search';
import NotFoundPage from './routes/not-found';
import BackToTop from './components/back-to-top';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:id" element={<ArticleDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <BackToTop />
    </>
  );
}

export default App;