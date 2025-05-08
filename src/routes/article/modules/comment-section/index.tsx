import React, { useState, useEffect } from "react";
import { MessageSquare, Reply, ChevronDown, ThumbsUp } from "lucide-react";
import { Article, Comment } from "../../../../types";
import { formatDate } from "@/utils/date";
import styles from "./index.module.less";
import useBaseState from "./hooks";
import { useNotificationStore } from "@/store/notification";
import CommentForm from "../comment-form";

interface CommentSectionProps {
  article: Article;
}

const CommentSection: React.FC<CommentSectionProps> = (props) => {
  const baseState = useBaseState();
  const { article } = props;
  const { addNotification } = useNotificationStore();
  const { commentCount } = article;
  const { 
    list, 
    total, 
    commentMap, 
    updateComments, 
    loading,
    childLoading,
    loadMoreMainComments,
    loadMoreChildComments,
    hasMoreMainComments,
    getChildCommentsCount,
    getLoadedChildCommentsCount
  } = baseState;
  
  const [replyTo, setReplyTo] = useState<{ id: number; name: string } | null>(null);
  const [replyingToParentId, setReplyingToParentId] = useState<number | undefined>(undefined);

  // 处理回复
  const handleReply = (comment: Comment, parentId?: number) => {
    setReplyTo({
      id: comment.id,
      name: comment.author.name
    });
    setReplyingToParentId(parentId);
  };

  // 取消回复
  const cancelReply = () => {
    setReplyTo(null);
    setReplyingToParentId(undefined);
  };

  // 评论成功后刷新评论列表
  const handleCommentAdded = () => {
    updateComments();
    addNotification({
      type: 'comment',
      title: '评论成功',
      message: '您的评论已发布，感谢参与讨论！',
    });
  };

  return (
    <div className={styles.commentSection}>
      <h3 className={styles.sectionTitle}>
        <MessageSquare size={20} />
        <span>评论 ({commentCount})</span>
      </h3>

      <CommentForm 
        onCommentAdded={handleCommentAdded}
      />

      <div className={styles.commentList}>
        {total === 0 ? (
          <div className={styles.emptyComments}>
            <p>暂无评论，来发表第一条评论吧！</p>
          </div>
        ) : (
          <>
            {list.map((comment) => {
              const childList = commentMap.current.get(comment.id) || [];
              const childTotal = getChildCommentsCount(comment.id);
              const loadedChildCount = getLoadedChildCommentsCount(comment.id);
              const hasMoreChildComments = childTotal > loadedChildCount;
              
              return (
                <div key={comment.id} className={styles.commentThread}>
                  <div className={styles.commentItem}>
                    <div className={styles.commentAuthor}>
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                      />
                      <div className={styles.authorInfo}>
                        <span className={styles.authorName}>
                          {comment.author.name}
                        </span>
                        <span className={styles.commentTime}>
                          {formatDate(comment.createdTime)}
                        </span>
                      </div>
                    </div>

                    <div 
                      className={styles.commentContent}
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />

                    <div className={styles.commentActions}>
                      <button
                        className={styles.replyButton}
                        onClick={() => handleReply(comment)}
                      >
                        <Reply size={14} />
                        回复
                      </button>
                      <button
                        className={styles.replyButton}
                        title="点赞"
                      >
                        <ThumbsUp size={14} />
                        {comment.likes || 0}
                      </button>
                    </div>
                  </div>

                  {/* 回复给当前评论的表单 */}
                  {replyTo && replyTo.id === comment.id && replyingToParentId === undefined && (
                    <div className={styles.replyForm}>
                      <CommentForm
                        parentId={comment.id}
                        replyTo={replyTo}
                        onCommentAdded={handleCommentAdded}
                        onCancelReply={cancelReply}
                      />
                    </div>
                  )}

                  {/* 渲染子评论 */}
                  {childList.length > 0 && (
                    <div className={styles.childComments}>
                      {childList.map((childComment) => (
                        <div key={childComment.id} className={styles.commentItem}>
                          <div className={styles.commentAuthor}>
                            <img
                              src={childComment.author.avatar}
                              alt={childComment.author.name}
                            />
                            <div className={styles.authorInfo}>
                              <span className={styles.authorName}>
                                {childComment.author.name}
                              </span>
                              <span className={styles.commentTime}>
                                {formatDate(childComment.createdTime)}
                              </span>
                            </div>
                          </div>

                          <div className={styles.commentContent}>
                            {childComment.replyTo && (
                              <span className={styles.replyTag}>
                                回复 <strong>{childComment.replyTo.name}</strong>
                              </span>
                            )}
                            <div dangerouslySetInnerHTML={{ __html: childComment.content }} />
                          </div>

                          <div className={styles.commentActions}>
                            <button
                              className={styles.replyButton}
                              onClick={() => handleReply(childComment, comment.id)}
                            >
                              <Reply size={14} />
                              回复
                            </button>
                            <button
                              className={styles.replyButton}
                              title="点赞"
                            >
                              <ThumbsUp size={14} />
                              {childComment.likes || 0}
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* 加载更多子评论按钮 */}
                      {hasMoreChildComments && (
                        <button 
                          className={styles.loadMoreButton} 
                          onClick={() => loadMoreChildComments(comment.id)}
                          disabled={childLoading[comment.id]}
                        >
                          {childLoading[comment.id] ? (
                            <>
                              <span className={styles.loadingDots}></span>
                              加载中...
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} />
                              加载更多回复 ({childTotal - loadedChildCount})
                            </>
                          )}
                        </button>
                      )}

                      {/* 回复给子评论的表单 */}
                      {replyTo && replyingToParentId === comment.id && (
                        <div className={styles.replyForm}>
                          <CommentForm
                            parentId={comment.id}
                            replyTo={replyTo}
                            onCommentAdded={handleCommentAdded}
                            onCancelReply={cancelReply}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* 加载更多主评论按钮 */}
            {hasMoreMainComments && (
              <button 
                className={styles.loadMoreButton}
                onClick={loadMoreMainComments}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.loadingDots}></span>
                    加载中...
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    加载更多评论 ({total - list.length})
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
