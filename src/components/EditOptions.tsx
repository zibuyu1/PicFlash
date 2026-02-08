import React from 'react'
import '../styles/EditOptions.css'

interface EditOptionsProps {
  onRotate: (angle: number) => void
  onFlip: (direction: 'horizontal' | 'vertical') => void
  loading?: boolean
  className?: string
}

export const EditOptions: React.FC<EditOptionsProps> = ({
  onRotate,
  onFlip,
  loading = false,
  className = ''
}) => {
  return (
    <div className={`edit-options ${className}`}>
      <div className="rotate-buttons">
        <button onClick={() => onRotate(90)} disabled={loading}>旋转 90°</button>
        <button onClick={() => onRotate(180)} disabled={loading}>旋转 180°</button>
        <button onClick={() => onRotate(270)} disabled={loading}>旋转 270°</button>
      </div>
      <div className="flip-buttons">
        <button onClick={() => onFlip('horizontal')} disabled={loading}>水平翻转</button>
        <button onClick={() => onFlip('vertical')} disabled={loading}>垂直翻转</button>
      </div>
    </div>
  )
}
