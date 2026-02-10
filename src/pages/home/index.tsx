import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomHeader from '../../components/CustomHeader'
import { icons } from '../../constants/icons'
import './index.css'

type FeatureItem = {
  id: string
  title: string
  icon: string
  className?: string
  status?: string
}

const Home = () => {
  const mainFeatures: FeatureItem[] = [
    {
      id: 'compress',
      title: '图片压缩',
      icon: icons.compress,
      className: 'main-feature-card primary-feature hover-lift'
    },
    {
      id: 'convert',
      title: '图片格式转换',
      icon: icons.convert,
      className: 'main-feature-card convert-feature hover-lift'
    },
  ]

  const moreFeatures: FeatureItem[] = [
    {
      id: 'compress',
      title: '图片压缩',
      icon: icons.compress,
    },
    {
      id: 'convert',
      title: '图片格式转换',
      icon: icons.convert,
    },
    {
      id: 'text',
      title: '图片加文字',
      icon: icons.text
    },
    {
      id: 'format',
      title: '图片格式',
      icon: icons.format
    },
    {
      id: 'collage',
      title: '九宫格拼图',
      icon: icons.collage
    },
    {
      id: 'qrcode',
      title: '二维码生成',
      icon: icons.qrcode
    },
    {
      id: 'gif',
      title: 'GIF 制作',
      icon: icons.gif
    },
    {
      id: 'avatar',
      title: '头像制作',
      icon: icons.avatar
    },
    {
      id: 'long-image',
      title: '长图拼接',
      icon: icons.longImage
    },
    {
      id: 'sticker',
      title: '表情包',
      icon: icons.sticker
    }
  ]

  const handleFeatureClick = (featureId: string) => {
    Taro.navigateTo({
      url: `/pages/tools/index?tool=${encodeURIComponent(featureId)}`
    })
  }

  return (
    <View className="home scanline-effect">
      <CustomHeader />
      <View className="home-content">
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
                  <Image className="main-feature-icon" src={feature.icon} mode="aspectFit" />
                </View>
                <Text className="main-feature-title">{feature.title}</Text>
                <Text className="main-feature-btn">立即体验</Text>
              </View>
            ))}
          </View>
        </View>

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
                  <Image className="more-feature-icon" src={feature.icon} mode="aspectFit" />
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
