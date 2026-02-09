import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomHeader from '../../components/CustomHeader'
import './index.css'

const Home = () => {
  const mainFeatures = [
    {
      id: 'compress',
      title: '图片压缩',
      icon: '📸',
      className: 'main-feature-card secondary-feature primary-feature hover-lift'
    },
    {
      id: 'dpi',
      title: '图片修改DPI',
      icon: '📊',
      className: 'main-feature-card secondary-feature dpi-feature hover-lift'
    },
    {
      id: 'convert',
      title: '图片改格式',
      icon: '🔄',
      className: 'main-feature-card secondary-feature convert-feature hover-lift'
    }
  ]

  const moreFeatures = [
    {
      id: 'text',
      title: '图片加文字',
      icon: '📝',
      status: ''
    },
    {
      id: 'extract',
      title: '抠图',
      icon: '🖼️',
      status: ''
    },
    {
      id: 'format',
      title: '图片格式',
      icon: '🔄',
      status: ''
    },
    {
      id: 'video-hd',
      title: '视频变清晰',
      icon: '📹',
      status: '开发中'
    },
    {
      id: 'photo-hd',
      title: '照片变清晰',
      icon: '✨',
      status: ''
    },
    {
      id: 'colorize',
      title: '照片上色',
      icon: '🎨',
      status: ''
    },
    {
      id: 'beautify',
      title: '人像美颜',
      icon: '💄',
      status: ''
    },
    {
      id: 'collage',
      title: '九宫格拼图',
      icon: '🔲',
      status: ''
    },
    {
      id: 'qrcode',
      title: '二维码生成',
      icon: '📱',
      status: ''
    },
    {
      id: 'gif',
      title: 'GIF图制作',
      icon: '🎞️',
      status: '开发中'
    },
    {
      id: 'avatar',
      title: '头像制作',
      icon: '👤',
      status: '开发中'
    },
    {
      id: 'video-compress',
      title: '视频压缩',
      icon: '📦',
      status: '开发中'
    },
    {
      id: 'long-image',
      title: '长图拼接',
      icon: '📜',
      status: '开发中'
    },
    {
      id: 'video-convert',
      title: '视频转换格式',
      icon: '🔄',
      status: '开发中'
    },
    {
      id: 'sticker',
      title: '表情包',
      icon: '😄',
      status: '开发中'
    },
    {
      id: 'image-compress',
      title: '图片压缩',
      icon: '📸',
      status: '开发中'
    }
  ]

  const handleFeatureClick = (featureId: string) => {
    // 处理已实现的功能
    const implementedFeatures = ['compress', 'convert']
    if (implementedFeatures.includes(featureId)) {
      Taro.navigateTo({
        url: `/pages/editor/index?type=${featureId}`
      })
    } else {
      // 未实现的功能显示提示
      Taro.showToast({
        title: '该功能正在开发中',
        icon: 'none'
      })
    }
  }

  return (
    <View className="home scanline-effect">
      <CustomHeader />
      <View className="home-content">
        {/* 主要功能区 */}
        <View className="main-features-section">
          <View className="main-features-grid">
            {mainFeatures.map((feature, index) => (
              <View
                key={feature.id}
                className={feature.className}
                onClick={() => handleFeatureClick(feature.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <View className="main-feature-icon-wrap">
                  <Text className="main-feature-icon">{feature.icon}</Text>
                </View>
                <Text className="main-feature-title">{feature.title}</Text>
                <Text className="main-feature-btn">立即体验</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 更多功能区 */}
        <View className="more-features-section">
          <Text className="more-features-title">更多功能</Text>
          <View className="more-features-grid">
            {moreFeatures.map((feature, index) => (
              <View
                key={feature.id}
                className="more-feature-card hover-lift"
                onClick={() => handleFeatureClick(feature.id)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <View className="more-feature-icon-wrap">
                  <Text className="more-feature-icon">{feature.icon}</Text>
                </View>
                <Text className="more-feature-title">{feature.title}</Text>
                {feature.status && (
                  <View className="feature-status">
                    <Text className="status-text">{feature.status}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Home