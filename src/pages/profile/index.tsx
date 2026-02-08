import { useState } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    avatar: '',
    nickname: '用户',
    userId: '10001'
  })

  const handleLogin = () => {
    Taro.showToast({
      title: '登录功能开发中',
      icon: 'none'
    })
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          setUserInfo({
            avatar: '',
            nickname: '用户',
            userId: '10001'
          })
          Taro.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  }

  const menuItems = [
    { icon: '📝', title: '我的记录', path: '/pages/profile/records' },
    { icon: '⚙️', title: '设置', path: '/pages/profile/settings' },
    { icon: '❓', title: '帮助与反馈', path: '/pages/profile/help' },
    { icon: 'ℹ️', title: '关于我们', path: '/pages/profile/about' }
  ]

  const handleMenuClick = (item) => {
    Taro.showToast({
      title: `${item.title}功能开发中`,
      icon: 'none'
    })
  }

  return (
    <View className="profile">
      <View className="profile-header">
        <View className="user-info">
          <View className="avatar">
            {userInfo.avatar ? (
              <Image src={userInfo.avatar} className="avatar-img" />
            ) : (
              <Text className="avatar-placeholder">👤</Text>
            )}
          </View>
          <View className="user-details">
            <Text className="nickname">{userInfo.nickname}</Text>
            <Text className="user-id">ID: {userInfo.userId}</Text>
          </View>
        </View>
        <Button className="login-btn" onClick={handleLogin}>
          {userInfo.avatar ? '编辑资料' : '登录'}
        </Button>
      </View>

      <View className="stats-section">
        <View className="stat-item">
          <Text className="stat-value">0</Text>
          <Text className="stat-label">处理次数</Text>
        </View>
        <View className="stat-divider"></View>
        <View className="stat-item">
          <Text className="stat-value">0</Text>
          <Text className="stat-label">收藏图片</Text>
        </View>
        <View className="stat-divider"></View>
        <View className="stat-item">
          <Text className="stat-value">0</Text>
          <Text className="stat-label">节省空间</Text>
        </View>
      </View>

      <View className="menu-section">
        {menuItems.map((item, index) => (
          <View key={index} className="menu-item" onClick={() => handleMenuClick(item)}>
            <View className="menu-left">
              <Text className="menu-icon">{item.icon}</Text>
              <Text className="menu-title">{item.title}</Text>
            </View>
            <Text className="menu-arrow">›</Text>
          </View>
        ))}
      </View>

      <View className="version-section">
        <Text className="version-text">版本 1.0.0</Text>
      </View>
    </View>
  )
}
