import { zwFetch } from '@/lib/fetch';
import { Comment, listRes } from '@/types';

export const getCommentsByArticleId = async (
  articleId: number,
  parentId: number = -1,
  page: number = 1,
  pageSize: number = 10,
) =>
  zwFetch<listRes<Comment>>('/api/comment', {
    query: { articleId, parentId, page, pageSize },
  });

type AddComment = {
  articleId: number;
  parentId?: number;
  content: string;
  replyToId?: number;
};

/**
 * 新增评论
 *
 */
export const addComment = (data: AddComment) =>
  zwFetch(`/api/comment`, {
    data,
    method: 'post',
  });
