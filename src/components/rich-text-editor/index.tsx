import React, { useState, useRef, useEffect } from 'react';
import { Smile, Image, X } from 'lucide-react';
import ImageUploader from '../image-uploader';
import styles from './index.module.less';

// 表情包数据
const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩'
];

interface RichTextEditorProps {
  placeholder?: string;
  onSubmit: (content: string) => void;
  initialValue?: string;
  submitButtonText?: string;
  showUserAvatar?: boolean;
  userAvatar?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = '写下你的评论...',
  onSubmit,
  initialValue = '',
  submitButtonText = '发表评论',
  showUserAvatar = true,
  userAvatar = ''
}) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  
  // 初始化编辑器内容
  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  // 处理表情包选择
  const handleEmojiClick = (emoji: string) => {
    if (editorRef.current) {
      // 将表情插入到光标位置
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textNode = document.createTextNode(emoji);
        range.insertNode(textNode);
        // 将光标移到插入的表情后面
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // 如果没有选中任何内容，直接添加到内容末尾
        editorRef.current.innerHTML += emoji;
      }
    }
    setIsEmojiPickerOpen(false);
    editorRef.current?.focus();
  };

  // 处理图片上传
  const handleImageUpload = () => {
    setIsImageUploaderOpen(!isImageUploaderOpen);
    setIsEmojiPickerOpen(false);
  };

  const handleImageUploaded = (imageUrl: string) => {
    if (editorRef.current) {
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.className = styles.uploadedImage;
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(imgElement);
        // 移动光标到图片后面
        range.setStartAfter(imgElement);
        range.setEndAfter(imgElement);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        editorRef.current.appendChild(imgElement);
      }
      
      // 关闭上传器
      setIsImageUploaderOpen(false);
      editorRef.current.focus();
    }
  };

  // 提交评论
  const handleSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML.trim();
      if (content) {
        onSubmit(content);
        editorRef.current.innerHTML = '';
        setIsEmojiPickerOpen(false);
        setIsImageUploaderOpen(false);
      }
    }
  };

  return (
    <div className={styles.richTextEditor}>
      {showUserAvatar && userAvatar && (
        <div className={styles.editorAvatar}>
          <img src={userAvatar} alt="用户头像" />
        </div>
      )}
      
      <div className={styles.editorContainer}>
        <div
          ref={editorRef}
          className={styles.editor}
          contentEditable
          data-placeholder={placeholder}
          onFocus={() => {
            setIsEmojiPickerOpen(false);
            setIsImageUploaderOpen(false);
          }}
        />
        
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              type="button"
              className={styles.toolbarButton}
              onClick={() => {
                setIsEmojiPickerOpen(!isEmojiPickerOpen);
                setIsImageUploaderOpen(false);
              }}
              title="插入表情"
            >
              <Smile size={20} />
            </button>
            
            <button
              type="button"
              className={styles.toolbarButton}
              onClick={handleImageUpload}
              title="上传图片"
            >
              <Image size={20} />
            </button>
          </div>
          
          <button
            type="button"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            {submitButtonText}
          </button>
        </div>
        
        {isEmojiPickerOpen && (
          <div className={styles.emojiPicker}>
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className={styles.emojiButton}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        
        {isImageUploaderOpen && (
          <div className={styles.uploaderContainer}>
            <div className={styles.uploaderHeader}>
              <h4>上传图片</h4>
              <button
                className={styles.closeButton}
                onClick={() => setIsImageUploaderOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            <ImageUploader 
              onImageUploaded={handleImageUploaded} 
              maxSize={2}
              maxWidth={1920}
              maxHeight={1080}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor; 