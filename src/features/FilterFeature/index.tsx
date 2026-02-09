import React from 'react'
import { View, Text, Button } from '@tarojs/components'

interface FilterFeatureProps {
  onFilter: (filterType: string, value: number) => void
}

const FilterFeature: React.FC<FilterFeatureProps> = ({ onFilter }) => {
  return (
    <View className="options-section">
      <Text className="options-title">滤镜效果</Text>
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '10px', display: 'block' }}>黑白</Text>
        <View className="filter-buttons">
          <Button
            className="action-btn"
            onClick={() => onFilter('grayscale', 50)}
          >
            50%
          </Button>
          <Button
            className="action-btn"
            onClick={() => onFilter('grayscale', 100)}
          >
            100%
          </Button>
        </View>
      </View>
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '10px', display: 'block' }}>复古</Text>
        <View className="filter-buttons">
          <Button
            className="action-btn"
            onClick={() => onFilter('sepia', 50)}
          >
            50%
          </Button>
          <Button
            className="action-btn"
            onClick={() => onFilter('sepia', 100)}
          >
            100%
          </Button>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '10px', display: 'block' }}>亮度</Text>
        <View className="filter-buttons">
          <Button
            className="action-btn"
            onClick={() => onFilter('brightness', 120)}
          >
            增亮
          </Button>
          <Button
            className="action-btn"
            onClick={() => onFilter('brightness', 80)}
          >
            变暗
          </Button>
        </View>
      </View>
    </View>
  )
}

export default FilterFeature