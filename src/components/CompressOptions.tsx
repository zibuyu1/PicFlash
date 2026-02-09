import React from 'react'
import { View, Text, Button } from '@tarojs/components'
import '../styles/CompressOptions.css'

const qualityOptions = [
  { label: '低质量', value: 0.3, description: '30%' },
  { label: '中等质量', value: 0.5, description: '50%' },
  { label: '高质量', value: 0.7, description: '70%' },
  { label: '最佳质量', value: 0.9, description: '90%' }
]

export const CompressOptions = ({
  quality,
  onQualityChange,
  onCompress,
  className = ''
}) => {
  return (
    <View className={`compress-options ${className}`}>
      <View className="option">
        <View className="size-option">
          {qualityOptions.map((option, index) => (
            <Button
              key={index}
              className="size-option-btn"
              onClick={() => {
                onQualityChange(option.value)
                onCompress(option.value)
              }}
            >
              <Text className="quality-label">{option.label}</Text>
              <Text className="quality-desc">({option.description})</Text>
            </Button>
          ))}
        </View>
      </View>
    </View>
  )
}
