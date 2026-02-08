import React from 'react'
import '../styles/ConvertOptions.css'

interface ConvertOptionsProps {
  format: 'jpeg' | 'png'
  onFormatChange: (format: 'jpeg' | 'png') => void
  className?: string
}

export const ConvertOptions: React.FC<ConvertOptionsProps> = ({
  format,
  onFormatChange,
  className = ''
}) => {
  return (
    <div className={`convert-options ${className}`}>
      <div className="option">
        <label>目标格式:</label>
        <div className="format-buttons">
          <button 
            className={format === 'jpeg' ? 'active' : ''}
            onClick={() => onFormatChange('jpeg')}
          >
            JPEG
          </button>
          <button 
            className={format === 'png' ? 'active' : ''}
            onClick={() => onFormatChange('png')}
          >
            PNG
          </button>
        </div>
      </div>
    </div>
  )
}
