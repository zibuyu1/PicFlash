import React from 'react'
import { View, Text, Button } from '@tarojs/components'

const formatOptions = [
  { name: 'PNG', value: 'png' },
  { name: 'JPG', value: 'jpg' },
  { name: 'JPEG', value: 'jpg' },
]

interface ConvertFeatureProps {
  onConvert: (format: string) => void
}

const ConvertFeature: React.FC<ConvertFeatureProps> = ({ onConvert }) => {
  return (
    <View className="options-section">
      <Text className="options-title">格式转换</Text>
      <View className="size-option">
        {formatOptions.map((format, index) => (
          <Button
            key={index}
            className="size-option-btn"
            onClick={() => onConvert(format.value)}
          >
            {format.name}
          </Button>
        ))}
      </View>
    </View>
  )
}

export default ConvertFeature