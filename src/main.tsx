import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.less';
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
