import React from 'react'
import { View, Text, Button } from '@tarojs/components'
import { CompressOptions } from '../../components/CompressOptions'

interface CompressFeatureProps {
  quality: number
  onQualityChange: (quality: number) => void
  onCompress: (quality: number) => void
}

const CompressFeature: React.FC<CompressFeatureProps> = ({
  quality,
  onQualityChange,
  onCompress
}) => {
  return (
    <View className="options-section">
      <Text className="options-title">压缩选项</Text>
      <CompressOptions 
        quality={quality} 
        onQualityChange={onQualityChange}
        onCompress={onCompress}
      />
    </View>
  )
}

export default CompressFeature