import React from 'react'
import '../styles/CompressOptions.css'

interface CompressOptionsProps {
  quality: number
  onQualityChange: (quality: number) => void
  className?: string
}

export const CompressOptions: React.FC<CompressOptionsProps> = ({
  quality,
  onQualityChange,
  className = ''
}) => {
  return (
    <div className={`compress-options ${className}`}>
      <div className="option">
        <label>压缩质量: {Math.round(quality * 100)}%</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={quality}
          onChange={(e) => onQualityChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  )
}
