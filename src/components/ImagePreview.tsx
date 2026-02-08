import React from 'react'
import '../styles/ImagePreview.css'

interface ImagePreviewProps {
  originalUrl?: string
  processedUrl?: string
  originalLabel?: string
  processedLabel?: string
  className?: string
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalUrl,
  processedUrl,
  originalLabel = '原始图片',
  processedLabel = '处理后',
  className = ''
}) => {
  return (
    <div className={`image-preview ${className}`}>
      {originalUrl && (
        <div className="preview-container">
          <h3>{originalLabel}</h3>
          <img src={originalUrl} alt={originalLabel} className="preview-image" />
        </div>
      )}
      {processedUrl && (
        <div className="preview-container">
          <h3>{processedLabel}</h3>
          <img src={processedUrl} alt={processedLabel} className="preview-image" />
        </div>
      )}
    </div>
  )
}
