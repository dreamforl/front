import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './index.module.less';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  maxSize?: number; // 单位: MB
  maxWidth?: number;
  maxHeight?: number;
  acceptedFormats?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  maxSize = 2, // 默认 2MB
  maxWidth = 1920,
  maxHeight = 1080,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const processFile = async (file: File) => {
    setError(null);
    setSuccess(null);
    
    // 校验文件类型
    if (!acceptedFormats.includes(file.type)) {
      setError(`不支持的文件格式。请上传 ${acceptedFormats.map(format => format.split('/')[1]).join(', ')} 格式的图片`);
      return;
    }
    
    // 校验文件大小
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`图片大小不能超过 ${maxSize}MB`);
      return;
    }
    
    // 校验图片尺寸
    const img = new Image();
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
    
    return new Promise<void>((resolve, reject) => {
      img.onload = async () => {
        // 尺寸校验
        if (img.width > maxWidth || img.height > maxHeight) {
          setError(`图片尺寸不能超过 ${maxWidth}x${maxHeight} 像素`);
          URL.revokeObjectURL(imgUrl);
          reject(new Error(`图片尺寸不能超过 ${maxWidth}x${maxHeight} 像素`));
          return;
        }
        
        try {
          // 这里应该调用API上传图片到服务器，这里为了演示直接返回URL
          // const response = await uploadToServer(file);
          // const imageUrl = response.url;
          
          // 模拟上传过程
          setIsUploading(true);
          
          // 模拟上传延迟
          setTimeout(() => {
            setIsUploading(false);
            
            // 模拟返回url (实际项目中通过API上传并返回真实URL)
            const imageUrl = imgUrl;
            console.log("图片上传成功:", {
              url: imageUrl,
              size: file.size,
              type: file.type,
              width: img.width,
              height: img.height
            });
            
            setSuccess('图片上传成功！');
            onImageUploaded(imageUrl);
            resolve();
          }, 1000);
        } catch (err) {
          setError('图片上传失败，请重试');
          URL.revokeObjectURL(imgUrl);
          reject(err);
        }
      };
      
      img.onerror = () => {
        setError('无法加载图片，文件可能已损坏');
        URL.revokeObjectURL(imgUrl);
        reject(new Error('无法加载图片'));
      };
      
      img.src = imgUrl;
    });
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await processFile(files[0]);
    }
  };
  
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };
  
  const clearUpload = () => {
    setPreview(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className={styles.imageUploader}>
      <div 
        className={`${styles.dropzone} ${isDragging ? styles.active : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className={styles.previewContainer}>
            <img src={preview} alt="预览" className={styles.preview} />
            <button 
              className={styles.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                clearUpload();
              }}
              title="移除图片"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <Upload size={24} />
            <p>点击或拖拽图片至此处上传</p>
            <small>支持 {acceptedFormats.map(format => format.split('/')[1]).join(', ')} 格式，最大 {maxSize}MB</small>
          </>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          className={styles.fileInput}
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
        />
      </div>
      
      {error && (
        <div className={styles.error}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className={styles.success}>
          <CheckCircle size={16} />
          <span>{success}</span>
        </div>
      )}
      
      {isUploading && (
        <div className={styles.uploading}>
          <div className={styles.spinner}></div>
          <span>上传中...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 