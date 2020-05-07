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
			{text: 'Web', link: '/web/'},
			{text: 'Vue', link: '/vue/'},
			{text: 'Mood', link: 'https://raindays.cn/'}, 
			{text: 'Github', link: 'https://github.com/wsydxiangwang'} 
		],
		sidebar: {
			'/web/': [
				{
					title: 'CSS',
					sidebarDepth: 2,
					children: ['/web/CSS/1','/web/CSS/2','/web/CSS/3','/web/CSS/4','/web/CSS/5','/web/CSS/6']
				},
				{
					title: 'ES6',
					children: ['/web/ES6/1','/web/ES6/2','/web/ES6/3']
				},
				{
					title: 'JS 基础',
					sidebarDepth: 2,
					children: ['/web/Core/1','/web/Core/2']
				},
				{
					title: 'JS 深入数组',
					children: ['/web/Array/1', '/web/Array/2', '/web/Array/3', '/web/Array/4', '/web/Array/5', '/web/Array/6', '/web/Array/7', '/web/Array/8']
				},
				{
					title: 'JS 对象',
					sidebarDepth: 2,
					children: ['/web/Object/1', '/web/Object/2', '/web/Object/3', '/web/Object/4', '/web/Object/5', '/web/Object/6']
				},
				{
					title: 'JS 字符串',
					children: ['/web/String/1', '/web/String/2', '/web/String/3']
				},
				{
					title: 'this 闭包 原型',
					children: ['/web/this/1', '/web/this/2', '/web/this/3', '/web/this/4', '/web/this/5']
				},
				{
					title: '异步方法',
					children: ['/web/Async/1', '/web/Async/2', '/web/Async/3', '/web/Async/4', '/web/Async/5']
				},
				{
					title: '性能优化',
					sidebarDepth: 2,
					children: ['/web/性能优化/1', '/web/性能优化/2', '/web/性能优化/3', '/web/性能优化/4', '/web/性能优化/5', '/web/性能优化/6']
				},
				{
					title: '设计模式',
					children: ['/web/设计模式/1', '/web/设计模式/2', '/web/设计模式/3', '/web/设计模式/4', '/web/设计模式/5']
				},
				{
					title: '算法学习',
					children: ['/web/算法/1', '/web/算法/2', '/web/算法/3']
				},
				{
					title: '稀奇古怪的题',
					children: ['/web/Other/1', '/web/Other/2', '/web/Other/3', '/web/Other/4']
				}
			],
			'/vue/': [
				{
					title: '组件通信',
					sidebarDepth: 2,
					children: ['/vue/Core/1', '/vue/Core/2', '/vue/Core/3']
				}
			]
		}
	}
};