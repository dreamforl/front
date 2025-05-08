import { getCommentsByArticleId } from "@/api/comment";
import { Comment, listRes } from "@/types";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function useBaseState() {
  const { id } = useParams<{ id: string }>();
  const [{ list, total }, setMainComment] = useState<listRes<Comment>>({
    list: [],
    total: 0,
  });
  const commentMap = useRef<Map<number, Comment[]>>(new Map());
  const [loading, setLoading] = useState(false);
  const [childLoading, setChildLoading] = useState<Record<number, boolean>>({});
  const pageSize = 10; // 每页10条评论
  const childPageSize = 2; // 默认显示2条子评论

  // 主评论加载参数
  const [mainCommentPage, setMainCommentPage] = useState(1);
  // 子评论加载参数 - 记录每个主评论已加载的子评论页数
  const childCommentPagesRef = useRef<Map<number, number>>(new Map());

  // 获取主评论的函数
  const fetchMainComments = useCallback(
    async (page: number = 1, replace: boolean = false) => {
      if (!id) return;

      try {
        setLoading(true);
        // 获取指定页数的主评论
        const res = await getCommentsByArticleId(
          Number(id),
          -1,
          page,
          pageSize
        );
        const { list: newList } = res;

        // 如果是替换模式或者是第一页，直接设置列表
        if (replace || page === 1) {
          setMainComment(res);
          // 清空当前已有的评论映射
          commentMap.current.clear();
          childCommentPagesRef.current.clear();
        } else {
          // 否则，追加到现有列表
          setMainComment((prev) => ({
            list: [...prev.list, ...newList],
            total: res.total,
          }));
        }

        // 初始化子评论映射
        newList.forEach((item) => {
          console.log("item:", item);
          const { childComments = [] } = item;
          // 为新的主评论创建子评论映射
          commentMap.current.set(item.id, childComments || []);
          // 初始化子评论页数记录
          if (!childCommentPagesRef.current.has(item.id)) {
            childCommentPagesRef.current.set(item.id, 1);
          }
        });

        setMainCommentPage(page);
      } catch (error) {
        console.error("获取主评论失败:", error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  // 加载更多主评论
  const loadMoreMainComments = useCallback(() => {
    fetchMainComments(mainCommentPage + 1, false);
  }, [fetchMainComments, mainCommentPage]);

  // 获取子评论的函数
  const fetchChildComments = useCallback(
    async (parentId: number, page: number = 1, replace: boolean = false) => {
      if (!id) return;

      try {
        setChildLoading((prev) => ({ ...prev, [parentId]: true }));

        // 获取特定主评论下的子评论
        const res = await getCommentsByArticleId(
          Number(id),
          parentId,
          page,
          childPageSize
        );
        const { list: newChildList } = res;

        // 更新子评论列表
        if (replace || page === 1) {
          // 替换现有子评论
          commentMap.current.set(parentId, newChildList);
        } else {
          // 追加到现有子评论
          const existingChildComments = commentMap.current.get(parentId) || [];
          commentMap.current.set(parentId, [
            ...existingChildComments,
            ...newChildList,
          ]);
        }

        // 更新子评论页数记录
        childCommentPagesRef.current.set(parentId, page);

        // 触发更新
        setMainComment((prev) => ({ ...prev }));
      } catch (error) {
        console.error(`获取评论ID ${parentId} 的子评论失败:`, error);
      } finally {
        setChildLoading((prev) => ({ ...prev, [parentId]: false }));
      }
    },
    [id]
  );

  // 加载特定主评论的更多子评论
  const loadMoreChildComments = useCallback(
    (parentId: number) => {
      const currentPage = childCommentPagesRef.current.get(parentId) || 1;
      fetchChildComments(parentId, currentPage + 1, false);
    },
    [fetchChildComments]
  );

  // 更新评论的方法 - 重新加载当前页
  const updateComments = useCallback(() => {
    fetchMainComments(1, true);
  }, [fetchMainComments]);

  // 首次加载时获取评论
  useEffect(() => {
    fetchMainComments(1, true);
  }, [fetchMainComments]);
  return {
    list,
    total,
    commentMap,
    updateComments,
    loading,
    childLoading,
    loadMoreMainComments,
    loadMoreChildComments,
    hasMoreMainComments: list.length < total,
    getChildCommentsCount: (parentId: number) => {
      const comment = list.find((item) => item.id === parentId);
      return comment?.childrenCount || 0;
    },
    getLoadedChildCommentsCount: (parentId: number) => {
      return commentMap.current.get(parentId)?.length || 0;
    },
  };
}
