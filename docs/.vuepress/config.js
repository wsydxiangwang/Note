module.exports = {
  title: '不如吃茶去v',
  description: '日积月累，请相信坚持的力量！',
  head: [
    ['link', { rel: 'icon', href: '/images/photo.jpg' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}]
  ],
  base: '/', // 部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块是否显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '前端基础', link: '/accumulate/' },
      {text: '算法题库', link: '/algorithm/'},
      {text: '诗和远方', link: '/others/'},
      {text: '微博', link: 'https://baidu.com'}      
    ],
    sidebar: [
      {
        title: 'javascript',
        children: [
          '/JavaScript/1.1.1'
        ]
      }
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 4
  }
};