export default {
  pages: [
    'pages/home/index',
    'pages/editor/index',
    'pages/index/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '图片处理工具',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#A8A29E',
    selectedColor: '#9333EA',
    backgroundColor: '#FAFAF9',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-active.png'
      },
      {
        pagePath: 'pages/editor/index',
        text: '编辑',
        iconPath: 'assets/images/editor.png',
        selectedIconPath: 'assets/images/editor-active.png'
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