import React from 'react'
import { View, Text, Button } from '@tarojs/components'

const sizeOptions = [
  { name: '一寸', width: 295, height: 413 },
  { name: '小二寸', width: 413, height: 531 },
  { name: '二寸', width: 413, height: 626 },
  { name: '社保/身份证', width: 358, height: 441 },
  { name: '四六级/计算机', width: 144, height: 192 },
  { name: '卫生机构', width: 160, height: 210 },
  { name: '毕业证', width: 480, height: 640 }
]

const scaleOptions = [
  { name: '填满画面（裁边）', value: 'cover' },
  { name: '完整显示（留空白）', value: 'contain' },
  { name: '拉伸填满（变形）', value: 'stretch' },
  { name: '保留完整（可能小）', value: 'keep' },
  { name: '至少覆盖（可能超出）', value: 'cover_min' }
]

interface ResizeFeatureProps {
  scaleMode: string
  onScaleModeChange: (mode: string) => void
  onResize: (width: number, height: number, scaleMode: string) => void
}

const ResizeFeature: React.FC<ResizeFeatureProps> = ({
  scaleMode,
  onScaleModeChange,
  onResize
}) => {
  return (
    <View className="options-section">
      <View>
        <Text className="options-title">尺寸选项</Text>
        <View className="size-option">
          {sizeOptions.map((option, index) => (
            <Button
              className="size-option-btn"
              key={index}
              onClick={() => {
                onResize(option.width, option.height, scaleMode)
              }}
            >
              {option.name} ({option.width}x{option.height})
            </Button>
          ))}
        </View>
      </View>
      <View>
        <Text className="options-title">缩放方式</Text>
        <View className="size-option">
          {scaleOptions.map((option, index) => (
            <View
              key={index}
              className="size-option-btn"
              onClick={() => onScaleModeChange(option.value)}
            >
              {option.name}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default ResizeFeature