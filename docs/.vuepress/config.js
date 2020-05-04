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
			{text: 'Web', link: '/JavaScript/'},
			{text: 'Vue', link: '/Vue/'},
			{text: 'Mood', link: 'https://raindays.cn/'}, 
			{text: 'Github', link: 'https://github.com/wsydxiangwang'} 
		],
		sidebar: {
			'/JavaScript/': [
				{
					title: 'JS 基础',
					children: ['/JavaScript/Core/1','/JavaScript/Core/2']
				},
				{
					title: 'JS 深入数组',
					children: ['/JavaScript/Array/1', '/JavaScript/Array/2', '/JavaScript/Array/3', '/JavaScript/Array/4', '/JavaScript/Array/5', '/JavaScript/Array/6', '/JavaScript/Array/7', '/JavaScript/Array/8']
				},
				{
					title: 'JS 对象',
					sidebarDepth: 2,
					children: ['/JavaScript/Object/1', '/JavaScript/Object/2', '/JavaScript/Object/3', '/JavaScript/Object/4', '/JavaScript/Object/5']
				},
				{
					title: 'JS 字符串',
					children: ['/JavaScript/String/1', '/JavaScript/String/2', '/JavaScript/String/3']
				},
				{
					title: 'this 闭包 原型',
					children: ['/JavaScript/this/1', '/JavaScript/this/2', '/JavaScript/this/3', '/JavaScript/this/4', '/JavaScript/this/5']
				},
				{
					title: '异步方法',
					children: ['/JavaScript/异步方法/1', '/JavaScript/异步方法/2', '/JavaScript/异步方法/3', '/JavaScript/异步方法/4', '/JavaScript/异步方法/5']
				},
				{
					title: '性能优化',
					sidebarDepth: 2,
					children: ['/JavaScript/性能优化/1', '/JavaScript/性能优化/2', '/JavaScript/性能优化/3', '/JavaScript/性能优化/4', '/JavaScript/性能优化/5']
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