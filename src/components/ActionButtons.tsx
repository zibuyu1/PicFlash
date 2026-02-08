import React from 'react'
import '../styles/ActionButtons.css'

interface ActionButtonsProps {
  onProcess: () => void
  onDownload?: () => void
  loading?: boolean
  disabled?: boolean
  showDownload?: boolean
  processText?: string
  downloadText?: string
  className?: string
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onProcess,
  onDownload,
  loading = false,
  disabled = false,
  showDownload = false,
  processText = '处理图片',
  downloadText = '下载图片',
  className = ''
}) => {
  return (
    <div className={`action-buttons ${className}`}>
      <button 
        onClick={onProcess} 
        className="primary-btn" 
        disabled={disabled || loading}
      >
        {loading ? '处理中...' : processText}
      </button>
      {showDownload && onDownload && (
        <button 
          onClick={onDownload} 
          className="secondary-btn"
          disabled={loading}
        >
          {downloadText}
        </button>
      )}
    </div>
  )
}
