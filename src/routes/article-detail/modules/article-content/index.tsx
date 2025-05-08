import React from 'react';
import styles from './index.module.less';

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  // 简单的 Markdown 渲染函数
  const renderMarkdown = (markdown: string) => {
    // 处理标题
    let html = markdown.replace(/^(#{1,6})\s+(.+)$/gm, (match, p1, p2) => {
      const level = p1.length;
      const id = p2.toLowerCase().replace(/\s+/g, '-');
      return `<h${level} id="${id}">${p2}</h${level}>`;
    });
    
    // 处理粗体
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // 处理斜体
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // 处理代码块
    html = html.replace(/```(.+?)\n([\s\S]*?)```/g, (match, language, code) => {
      return `<pre><code class="language-${language}">${code}</code></pre>`;
    });
    
    // 处理行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 处理段落
    html = html.replace(/^(?!<h|<pre|<ul|<ol|<li|<blockquote)(.+)$/gm, '<p>$1</p>');
    
    // 处理换行符
    html = html.replace(/\n\n/g, '<br/>');
    
    return html;
  };
  
  return (
    <div 
      className={styles.articleContent} 
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} 
    />
  );
};

export default ArticleContent;