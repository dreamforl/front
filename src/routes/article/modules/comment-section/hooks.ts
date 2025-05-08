import { getCommentsByArticleId } from "@/api/comment";
import { Comment, listRes } from "@/types";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

// 模拟数据
const mockComments: Comment[] = [
  {
    id: 1,
    content: "这是一条主评论",
    author: {
      id: "1",
      name: "用户1",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1"
    },
    createdTime: "2024-03-20",
    articleId: 1,
    childrenCount: 2,
    childComments: [
      {
        id: 3,
        content: "这是第一条子评论",
        author: {
          id: "2",
          name: "用户2",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2"
        },
        createdTime: "2024-03-20",
        articleId: 1,
        parentId: 1
      },
      {
        id: 4,
        content: "这是第二条子评论",
        author: {
          id: "3",
          name: "用户3",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3"
        },
        createdTime: "2024-03-20",
        articleId: 1,
        parentId: 1
      }
    ]
  },
  {
    id: 2,
    content: "这是另一条主评论",
    author: {
      id: "4",
      name: "用户4",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4"
    },
    createdTime: "2024-03-20",
    articleId: 1,
    childrenCount: 1,
    childComments: [
      {
        id: 5,
        content: "这是一条回复",
        author: {
          id: "5",
          name: "用户5",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5"
        },
        createdTime: "2024-03-20",
        articleId: 1,
        parentId: 2
      }
    ]
  }
];

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
        // 使用模拟数据
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedComments = mockComments.slice(startIndex, endIndex);
        
        const mockResponse = {
          list: paginatedComments,
          total: mockComments.length
        };

        // 如果是替换模式或者是第一页，直接设置列表
        if (replace || page === 1) {
          setMainComment(mockResponse);
          // 清空当前已有的评论映射
          commentMap.current.clear();
          childCommentPagesRef.current.clear();
        } else {
          // 否则，追加到现有列表
          setMainComment((prev) => ({
            list: [...prev.list, ...mockResponse.list],
            total: mockResponse.total,
          }));
        }

        // 初始化子评论映射
        mockResponse.list.forEach((item) => {
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

        // 查找父评论的模拟子评论
        const parentComment = mockComments.find(comment => comment.id === parentId);
        const mockChildComments = parentComment?.childComments || [];
        
        // 分页处理子评论
        const startIndex = (page - 1) * childPageSize;
        const endIndex = startIndex + childPageSize;
        const paginatedChildComments = mockChildComments.slice(startIndex, endIndex);

        // 更新子评论列表
        if (replace || page === 1) {
          // 替换现有子评论
          commentMap.current.set(parentId, paginatedChildComments);
        } else {
          // 追加到现有子评论
          const existingChildComments = commentMap.current.get(parentId) || [];
          commentMap.current.set(parentId, [
            ...existingChildComments,
            ...paginatedChildComments,
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