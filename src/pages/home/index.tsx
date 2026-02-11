import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
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
  const banners = [
    {
      id: 'compress',
      title: '图片压缩',
      subtitle: '智能压缩，节省空间',
      icon: icons.compress,
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      className: 'banner-compress'
    },
    {
      id: 'convert',
      title: '图片格式转换',
      subtitle: '支持多种格式互转',
      icon: icons.convert,
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      className: 'banner-convert'
    }
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
    // {
    //   id: 'format',
    //   title: '图片格式',
    //   icon: icons.format
    // },
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
        <View className="banner-section">
          <Swiper
            className="banner-swiper"
            autoplay
            interval={4000}
            circular
            indicatorDots
            indicatorColor="rgba(255, 255, 255, 0.4)"
            indicatorActiveColor="#ffffff"
          >
            {banners.map((banner) => (
              <SwiperItem key={banner.id}>
                <View
                  className={`banner-item ${banner.className}`}
                  style={{ background: banner.bgGradient }}
                  onClick={() => handleFeatureClick(banner.id)}
                >
                  <View className="banner-content">
                    <View className="banner-icon-wrap">
                      <Image className="banner-icon" src={banner.icon} mode="aspectFit" />
                    </View>
                    <View className="banner-text">
                      <Text className="banner-title">{banner.title}</Text>
                      <Text className="banner-subtitle">{banner.subtitle}</Text>
                    </View>
                  </View>
                  <View className="banner-decoration" />
                </View>
              </SwiperItem>
            ))}
          </Swiper>
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
