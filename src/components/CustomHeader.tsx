import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import '../styles/CustomHeader.css'

interface CustomHeaderProps {
  title?: string
  showMenu?: boolean
  showSettings?: boolean
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = '图片处理工具',
  showMenu = true,
  showSettings = true
}) => {
  const [statusBarHeight, setStatusBarHeight] = useState('0px')

  useEffect(() => {
    // 获取系统信息，计算状态栏高度
    Taro.getSystemInfo({
      success: (res) => {
        setStatusBarHeight(`${res.statusBarHeight || 0}px`)
      }
    })
  }, [])

  const handleMenuClick = () => {
    Taro.showActionSheet({
      itemList: ['关于我们', '使用帮助', '意见反馈'],
      success: function (res) {
        console.log('点击了', res.tapIndex)
      }
    })
  }

  const handleSettingsClick = () => {
    Taro.navigateTo({
      url: '/pages/profile/index'
    })
  }

  return (
    <View className="custom-header">
      {/* 状态栏占位 */}
      <View className="status-bar" style={{ height: statusBarHeight }} />
      {/* 导航栏内容 */}
      <View className="custom-header-content" style={{height: '44px'}}>
        <Text className="custom-header-title" style={{fontSize: '16px'}}>{title}</Text>
      </View>
    </View>
  )
}

export default CustomHeader
