import React from 'react'
import { View, Text, Button } from '@tarojs/components'

interface EditFeatureProps {
  onRotate: (degrees: number) => void
  onFlip: (direction: string) => void
}

const EditFeature: React.FC<EditFeatureProps> = ({ onRotate, onFlip }) => {
  return (
    <View className="options-section">
      <Text className="options-title">编辑选项</Text>
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '10px', display: 'block' }}>旋转</Text>
        <View className="edit-buttons">
          <Button
            className="action-btn"
            onClick={() => onRotate(-90)}
          >
            左转90°
          </Button>
          <Button
            className="action-btn"
            onClick={() => onRotate(90)}
          >
            右转90°
          </Button>
          <Button
            className="action-btn"
            onClick={() => onRotate(180)}
          >
            180°
          </Button>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '10px', display: 'block' }}>翻转</Text>
        <View className="edit-buttons">
          <Button
            className="action-btn"
            onClick={() => onFlip('horizontal')}
          >
            水平翻转
          </Button>
          <Button
            className="action-btn"
            onClick={() => onFlip('vertical')}
          >
            垂直翻转
          </Button>
        </View>
      </View>
    </View>
  )
}

export default EditFeature