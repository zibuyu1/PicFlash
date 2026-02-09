export default {
  pages: [
    'pages/home/index',
    'pages/editor/index',
    'pages/index/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#0F0F1A',
    navigationBarTitleText: 'PicFlash AI',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#A5B4FC',
    selectedColor: '#6366F1',
    backgroundColor: '#1A1A2E',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/images/profile.png',
        selectedIconPath: 'assets/images/profile-active.png'
      }
    ]
  }
}