import React from 'react'
import { View, Text, Button } from '@tarojs/components'

const formatOptions = [
  { name: 'PNG', value: 'png' },
  { name: 'JPEG', value: 'jpg' },
  { name: 'JPG', value: 'jpg' },
  { name: 'WebP', value: 'webp' },
  { name: 'TIFF', value: 'tiff' },
  { name: 'AVIF', value: 'avif' },
  { name: 'BMP', value: 'bmp' },
  { name: 'GIF', value: 'gif' },
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