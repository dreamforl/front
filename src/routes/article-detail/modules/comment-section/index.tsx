import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Comment } from '../../../../types';
import { addComment } from '../../../../api';
import { formatDate } from '../../../../utils/date';
import styles from './index.module.less';

interface CommentSectionProps {
  articleId: number;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId, comments, setComments }) => {
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: number; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!commentText.trim() || submitting) return;
    
    try {
      setSubmitting(true);
      
      const newComment = await addComment(
        articleId,
        commentText,
        replyTo?.id,
        replyTo?.id ? replyTo.name : undefined
      );
      
      if (replyTo) {
        // 如果是回复评论，更新评论列表中的对应评论
        setComments(prevComments => 
          prevComments.map(comment => 
            comment.id === replyTo.id
              ? {
                  ...comment,
                  childComments: [...(comment.childComments || []), newComment]
                }
              : comment
          )
        );
      } else {
        // 如果是新评论，直接添加到评论列表
        setComments(prevComments => [...prevComments, newComment]);
      }
      
      setCommentText('');
      setReplyTo(null);
    } catch (error) {
      console.error('提交评论失败:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (comment: Comment) => {
    setReplyTo({ id: comment.id, name: comment.author.name });
    // 滚动到评论框
    document.getElementById('comment-input')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  return (
    <div className={styles.commentSection}>
      <h3 className={styles.sectionTitle}>
        <MessageSquare size={20} />
        <span>评论 ({comments.length})</span>
      </h3>
      
      <div className={styles.commentForm}>
        <div className={styles.formHeader}>
          {replyTo ? (
            <div className={styles.replyingTo}>
              <span>回复给 <strong>{replyTo.name}</strong></span>
              <button 
                onClick={cancelReply}
                className={styles.cancelReply}
              >
                取消回复
              </button>
            </div>
          ) : (
            <h4>发表评论</h4>
          )}
        </div>
        
        <div className={styles.formContent}>
          <textarea
            id="comment-input"
            className={styles.commentInput}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="写下你的想法..."
            rows={3}
          />
          
          <button 
            className={styles.submitButton}
            onClick={handleSubmitComment}
            disabled={submitting || !commentText.trim()}
          >
            <Send size={16} />
            <span>{submitting ? '发送中...' : '发送'}</span>
          </button>
        </div>
      </div>
      
      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <div className={styles.emptyComments}>
            <p>暂无评论，来发表第一条评论吧！</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className={styles.commentThread}>
              <div className={styles.commentItem}>
                <div className={styles.commentAuthor}>
                  <img src={comment.author.avatar} alt={comment.author.name} />
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{comment.author.name}</span>
                    <span className={styles.commentTime}>{formatDate(comment.createdTime)}</span>
                  </div>
                </div>
                
                <div className={styles.commentContent}>
                  <p>{comment.content}</p>
                </div>
                
                <div className={styles.commentActions}>
                  <button 
                    className={styles.replyButton}
                    onClick={() => handleReply(comment)}
                  >
                    回复
                  </button>
                </div>
              </div>
              
              {/* 渲染子评论 */}
              {comment.childComments && comment.childComments.length > 0 && (
                <div className={styles.childComments}>
                  {comment.childComments.map(childComment => (
                    <div key={childComment.id} className={styles.commentItem}>
                      <div className={styles.commentAuthor}>
                        <img src={childComment.author.avatar} alt={childComment.author.name} />
                        <div className={styles.authorInfo}>
                          <span className={styles.authorName}>{childComment.author.name}</span>
                          <span className={styles.commentTime}>{formatDate(childComment.createdTime)}</span>
                        </div>
                      </div>
                      
                      <div className={styles.commentContent}>
                        {childComment.replyTo && (
                          <span className={styles.replyTag}>
                            回复 <strong>{childComment.replyTo.name}</strong>:
                          </span>
                        )}
                        <p>{childComment.content}</p>
                      </div>
                      
                      <div className={styles.commentActions}>
                        <button 
                          className={styles.replyButton}
                          onClick={() => handleReply(comment)}
                        >
                          回复
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;