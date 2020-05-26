module.exports = {
	title: '不吃茶的v李白',
	description: 'Live and Study.',
	head: [
		['link', { rel: 'icon', href: '/images/photo.png' }],
		['meta', { name: 'theme-color', content: '#0084ff' }],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
		['meta', { name: 'msapplication-TileImage', content: '/images/photo' }],
		['meta', { name: 'msapplication-TileColor', content: '#000000' }]
	],
	base: '/',
	markdown: {
		lineNumbers: false
	},
	themeConfig: {
		nav:[
			{text: 'Web', link: '/web/'},
			{text: 'Mood', link: 'https://raindays.cn/'}, 
			{text: 'Github', link: 'https://github.com/wsydxiangwang'} 
		],
		sidebar: {
			'/web/': [
				{
					title: 'Vue 原理',
					sidebarDepth: 2,
					children: ['/web/vue/1', '/web/vue/2', '/web/vue/3', '/web/vue/4', '/web/vue/5', '/web/vue/6', '/web/vue/7', '/web/vue/8', '/web/vue/9', '/web/vue/10', '/web/vue/20']
				},
				{
					title: 'Vue 方法',
					sidebarDepth: 2,
					children: ['/web/vue2/1', '/web/vue2/2', '/web/vue2/3', '/web/vue2/4', '/web/vue2/5', '/web/vue2/6', '/web/vue2/7', '/web/vue2/8', '/web/vue2/9', '/web/vue2/10', '/web/vue2/20']
				},
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
					title: 'http',
					sidebarDepth: 2,
					children: ['/web/http/1', '/web/http/2', '/web/http/3']
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
					title: '手写代码',
					children: ['/web/手写/1', '/web/手写/2', '/web/手写/3']
				},
				{
					title: '稀奇古怪的题',
					children: ['/web/Other/1', '/web/Other/2', '/web/Other/3', '/web/Other/4', '/web/Other/5', '/web/Other/6']
				}
			]
		}
	}
};