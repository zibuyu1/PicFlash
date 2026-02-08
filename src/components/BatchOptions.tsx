import React from 'react'
import '../styles/BatchOptions.css'

interface BatchOptionsProps {
  selectedFiles: File[]
  onFilesChange: (files: File[]) => void
  onBatchCompress: () => void
  onBatchConvert: () => void
  onBatchResize: () => void
  batchResults: {file: File, result: string}[]
  onDownloadAll: () => void
  loading?: boolean
  className?: string
}

export const BatchOptions: React.FC<BatchOptionsProps> = ({
  selectedFiles,
  onFilesChange,
  onBatchCompress,
  onBatchConvert,
  onBatchResize,
  batchResults,
  onDownloadAll,
  loading = false,
  className = ''
}) => {
  return (
    <div className={`batch-options ${className}`}>
      <div className="option">
        <label>选择多张图片:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            onFilesChange(files);
          }}
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h4>已选择 {selectedFiles.length} 张图片:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="option">
        <label>批量操作类型:</label>
        <div className="batch-operation-buttons">
          <button onClick={onBatchCompress} disabled={loading || selectedFiles.length === 0}>压缩</button>
          <button onClick={onBatchConvert} disabled={loading || selectedFiles.length === 0}>格式转换</button>
          <button onClick={onBatchResize} disabled={loading || selectedFiles.length === 0}>尺寸调整</button>
        </div>
      </div>

      {batchResults.length > 0 && (
        <div className="batch-results">
          <h4>处理结果:</h4>
          <div className="batch-results-list">
            {batchResults.map((item, index) => (
              <div key={index} className="batch-result-item">
                <span>{item.file.name}</span>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = item.result;
                    link.download = `processed-${item.file.name}`;
                    link.click();
                  }}
                >
                  下载
                </button>
              </div>
            ))}
          </div>
          <button onClick={onDownloadAll} className="download-all-btn">
            全部下载
          </button>
        </div>
      )}
    </div>
  )
}
