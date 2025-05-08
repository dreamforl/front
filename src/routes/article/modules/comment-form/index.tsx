import React from 'react';
import { useParams } from 'react-router-dom';
import { addComment } from '@/api/comment';
import RichTextEditor from '@/components/rich-text-editor';
import useAppStore from '@/store';
import styles from './index.module.less';

interface CommentFormProps {
  parentId?: number;
  replyTo?: { id: number; name: string } | null;
  onCommentAdded?: () => void;
  onCancelReply?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  replyTo,
  onCommentAdded,
  onCancelReply
}) => {
  const { currentUser } = useAppStore();
  const articleId = Number(useParams().id);

  const handleSubmit = (content: string) => {
    addComment({
      parentId,
      articleId,
      content,
    }).then(() => {
      if (onCommentAdded) {
        onCommentAdded();
      }
      if (replyTo && onCancelReply) {
        onCancelReply();
      }
    });
  };

  return (
    <div className={styles.formWrapper}>
      {replyTo && (
        <div className={styles.replyingTo}>
          <span>
            回复给 <strong>{replyTo.name}</strong>
          </span>
          <button 
            className={styles.cancelReply} 
            onClick={onCancelReply}
          >
            取消回复
          </button>
        </div>
      )}
      
      <RichTextEditor
        onSubmit={handleSubmit}
        placeholder={replyTo ? `回复 ${replyTo.name}...` : '写下你的评论...'}
        submitButtonText={replyTo ? '回复' : '发表评论'}
        showUserAvatar={true}
        userAvatar={currentUser?.avatar}
      />
    </div>
  );
};

export default CommentForm;
