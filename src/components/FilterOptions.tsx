import React from 'react'
import '../styles/FilterOptions.css'

interface FilterOptionsProps {
  filter: 'blackwhite' | 'vintage' | 'brightness'
  onFilterChange: (filter: 'blackwhite' | 'vintage' | 'brightness') => void
  brightnessValue?: number
  onBrightnessChange?: (value: number) => void
  className?: string
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  filter,
  onFilterChange,
  brightnessValue = 50,
  onBrightnessChange,
  className = ''
}) => {
  return (
    <div className={`filter-options ${className}`}>
      <div className="option">
        <label>滤镜类型:</label>
        <div className="filter-buttons">
          <button 
            className={filter === 'blackwhite' ? 'active' : ''}
            onClick={() => onFilterChange('blackwhite')}
          >
            黑白
          </button>
          <button 
            className={filter === 'vintage' ? 'active' : ''}
            onClick={() => onFilterChange('vintage')}
          >
            复古
          </button>
          <button 
            className={filter === 'brightness' ? 'active' : ''}
            onClick={() => onFilterChange('brightness')}
          >
            亮度
          </button>
        </div>
      </div>
      {filter === 'brightness' && onBrightnessChange && (
        <div className="option">
          <label>亮度值: {brightnessValue}</label>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={brightnessValue}
            onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  )
}
