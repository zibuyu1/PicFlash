import React from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

const Home = () => {
  const features = [
    {
      id: 'compress',
      title: '图片压缩',
      description: '智能压缩图片大小，保持画质清晰',
      icon: '📸',
      className: 'feature-card compress-card'
    },
    {
      id: 'resize',
      title: '尺寸调整',
      description: '调整图片尺寸，支持多种证件照规格',
      icon: '📐',
      className: 'feature-card resize-card'
    },
    {
      id: 'convert',
      title: '格式转换',
      description: '转换图片格式，支持多种常用格式',
      icon: '🔄',
      className: 'feature-card convert-card'
    },
    {
      id: 'edit',
      title: '基础编辑',
      description: '旋转、翻转图片，简单编辑操作',
      icon: '✏️',
      className: 'feature-card edit-card'
    },
    {
      id: 'filter',
      title: '滤镜效果',
      description: '添加滤镜效果，调整图片风格',
      icon: '🎨',
      className: 'feature-card filter-card'
    }
  ]

  const handleFeatureClick = (featureId) => {
    Taro.navigateTo({
      url: `/pages/editor/index?type=${featureId}`
    })
  }

  return (
    <View className="home">
      <View className="home-header">
        <Text className="home-title">图片处理工具</Text>
        <Text className="home-subtitle">简单、高效的图片处理解决方案</Text>
      </View>

      <View className="home-content">
        <View className="features-grid">
          {features.map((feature) => (
            <View
              key={feature.id}
              className={feature.className}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <Text className="feature-icon">{feature.icon}</Text>
              <Text className="feature-title">{feature.title}</Text>
              <Text className="feature-desc">{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="footer">
        <Text>© 2026 图片处理工具</Text>
      </View>
    </View>
  )
}

export default Home