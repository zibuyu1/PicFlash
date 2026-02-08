import React from 'react'
import '../styles/ResizeOptions.css'

interface ResizeOptionsProps {
  width: number
  height: number
  onWidthChange: (width: number) => void
  onHeightChange: (height: number) => void
  className?: string
}

export const ResizeOptions: React.FC<ResizeOptionsProps> = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  className = ''
}) => {
  return (
    <div className={`resize-options ${className}`}>
      <div className="option">
        <label>宽度: {width}px</label>
        <input
          type="number"
          value={width}
          onChange={(e) => onWidthChange(parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="option">
        <label>高度: {height}px</label>
        <input
          type="number"
          value={height}
          onChange={(e) => onHeightChange(parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="presets">
        <button onClick={() => {
          onWidthChange(1080)
          onHeightChange(1080)
        }}>1:1</button>
        <button onClick={() => {
          onWidthChange(1080)
          onHeightChange(810)
        }}>4:3</button>
        <button onClick={() => {
          onWidthChange(1080)
          onHeightChange(608)
        }}>16:9</button>
      </div>
    </div>
  )
}
