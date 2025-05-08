import { useNavigate } from 'react-router-dom';

/**
 * 错误页面
 *
 */
export default function PageError() {
  const navigate = useNavigate();
  return (
    <div>
      <span>出了问题</span>
      <button onClick={() => navigate('/')}>返回首页</button>
    </div>
  );
}
