module.exports = {
	title: '不吃茶的v李白',
	description: 'Live and Study.',
	head: [
		['link', { rel: 'icon', href: '/images/photo.png' }],
		['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
		['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
		['meta', { 'http-quiv': 'expires', cotent: '0'}]
	],
	base: '/',
	markdown: {
		lineNumbers: false
	},
	themeConfig: {
		nav:[
			{text: 'Web', link: '/WEB/'},
			{text: 'Vue', link: '/Vue/'},
			{text: 'Mood', link: 'https://raindays.cn/'}, 
			{text: 'Github', link: 'https://github.com/wsydxiangwang'} 
		],
		sidebar: {
			'/WEB/': [
				{
					title: 'CSS',
					sidebarDepth: 2,
					children: ['/WEB/CSS/1','/WEB/CSS/2','/WEB/CSS/3','/WEB/CSS/4','/WEB/CSS/5','/WEB/CSS/6']
				},
				{
					title: 'ES6',
					children: ['/WEB/ES6/1','/WEB/ES6/2','/WEB/ES6/3']
				},
				{
					title: 'JS 基础',
					sidebarDepth: 2,
					children: ['/WEB/Core/1','/WEB/Core/2']
				},
				{
					title: 'JS 深入数组',
					children: ['/WEB/Array/1', '/WEB/Array/2', '/WEB/Array/3', '/WEB/Array/4', '/WEB/Array/5', '/WEB/Array/6', '/WEB/Array/7', '/WEB/Array/8']
				},
				{
					title: 'JS 对象',
					sidebarDepth: 2,
					children: ['/WEB/Object/1', '/WEB/Object/2', '/WEB/Object/3', '/WEB/Object/4', '/WEB/Object/5', '/WEB/Object/6']
				},
				{
					title: 'JS 字符串',
					children: ['/WEB/String/1', '/WEB/String/2', '/WEB/String/3']
				},
				{
					title: 'this 闭包 原型',
					children: ['/WEB/this/1', '/WEB/this/2', '/WEB/this/3', '/WEB/this/4', '/WEB/this/5']
				},
				{
					title: '异步方法',
					children: ['/WEB/Async/1', '/WEB/Async/2', '/WEB/Async/3', '/WEB/Async/4', '/WEB/Async/5']
				},
				{
					title: '性能优化',
					sidebarDepth: 2,
					children: ['/WEB/性能优化/1', '/WEB/性能优化/2', '/WEB/性能优化/3', '/WEB/性能优化/4', '/WEB/性能优化/5', '/WEB/性能优化/6']
				},
				{
					title: '算法学习',
					children: ['/WEB/算法/1', '/WEB/算法/2', '/WEB/算法/3']
				},
				{
					title: '稀奇古怪的题',
					children: ['/WEB/Other/1', '/WEB/Other/2', '/WEB/Other/3']
				}
			],
			'/Vue/': [
				{
					title: '组件通信',
					sidebarDepth: 2,
					children: ['/Vue/Core/one']
				}
			]
		}
	}
};