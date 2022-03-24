module.exports = {
	title: '不吃茶的李白v',
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
			{text: '进阶', link: '/other/'},
			{text: '专业', link: '/after/'},
			{text: '心情小镇', link: 'https://raindays.cn/'}, 
			{text: '全栈项目', link: 'https://github.com/wsydxiangwang/Mood'}, 
			{text: 'Github', link: 'https://github.com/wsydxiangwang/Note'} 
		],
		sidebar: {
			'/web/': [
				{
					title: 'Vue 原理',
					sidebarDepth: 2,
					children: [
						'/web/vue/9', 
						'/web/vue/1', 
						'/web/vue/2', 
						'/web/vue/3', 
						'/web/vue/4', 
						'/web/vue/5', 
						'/web/vue/6', 
						'/web/vue/7', 
						'/web/vue/8',  
						'/web/vue/10', 
						'/web/vue/20'
					]
				},
				{
					title: 'Vue 方法',
					sidebarDepth: 2,
					children: [
						'/web/vue2/1', 
						'/web/vue2/2', 
						'/web/vue2/3', 
						'/web/vue2/4', 
						'/web/vue2/5', 
						'/web/vue2/6', 
						'/web/vue2/7', 
						'/web/vue2/8', 
						'/web/vue2/9', 
						'/web/vue2/10', 
						'/web/vue2/20'
					]
				},
				{
					title: 'CSS',
					sidebarDepth: 2,
					children: [
						'/web/CSS/1',
						'/web/CSS/7',
						'/web/CSS/2',
						'/web/CSS/3',
						'/web/CSS/4',
						'/web/CSS/5',
						'/web/CSS/6',
					]
				},
				{
					title: 'ES6',
					children: [
						'/web/ES6/1',
						'/web/ES6/2',
						'/web/ES6/4',
						'/web/ES6/3',
						'/web/ES6/5'
					]
				},
				{
					title: 'Base',
					children: [
						'/web/Base/1', 
						'/web/Base/2', 
						'/web/Base/3', 
						'/web/Base/4', 
						'/web/Base/5'
					]
				},
				{
					title: 'DOM、BOM',
					sidebarDepth: 2,
					children: [
						'/web/Core/1',
						'/web/Core/2',
						'/web/Core/3'
					]
				},
				{
					title: 'Array',
					children: [
						'/web/Array/1', 
						'/web/Array/2', 
						'/web/Array/3', 
						'/web/Array/4', 
						'/web/Array/5', 
						'/web/Array/6', 
						'/web/Array/7'
					]
				},
				{
					title: 'Object',
					children: [
						'/web/Object/1', 
						'/web/Object/2', 
						'/web/Object/3', 
						'/web/Object/4', 
						'/web/Object/5', 
						'/web/Object/6'
					]
				},
				{
					title: 'Function',
					children: [
						'/web/Function/1'
					]
				},
				{
					title: 'String',
					children: [
						'/web/String/1', 
						'/web/String/2', 
						'/web/String/3',
						'/web/String/4'
					]
				},
				{
					title: 'Async',
					children: [
						'/web/Async/1', 
						'/web/Async/2', 
						'/web/Async/3', 
						'/web/Async/4', 
						'/web/Async/5',
						'/web/Async/6',
						'/web/Async/7'
					]
				},
				{
					title: 'Browser',
					children: [
						'/web/browser/1', 
						'/web/browser/2', 
						'/web/browser/3',
						'/web/browser/4',
						'/web/browser/5'
					]
				},
				{
					title: '性能优化',
					sidebarDepth: 2,
					children: [
						'/web/性能优化/1', 
						'/web/性能优化/2', 
						'/web/性能优化/3', 
						'/web/性能优化/4', 
						'/web/性能优化/5', 
						'/web/性能优化/6', 
						'/web/性能优化/7',
						'/web/性能优化/8',
						'/web/性能优化/9'
					]
				},
				{
					title: '正则',
					children: [
						'/web/正则/1', 
						'/web/正则/2'
					]
				},
				{
					title: 'HTTP',
					sidebarDepth: 2,
					children: [
						'/web/http/1', 
						'/web/http/2', 
						'/web/http/3', 
						'/web/http/4', 
						'/web/http/5', 
						'/web/http/6', 
						'/web/http/7', 
						'/web/http/8', 
						'/web/http/9', 
						'/web/http/10',
					]
				},
				{
					title: 'webpack',
					sidebarDepth: 2,
					children: [
						'/web/webpack/1'
					]
				},
			],
			'/after/': [
				{
					title: 'Mac',
					sidebarDepth: 2,
					children: [
						'/after/mac/1',
					]
				},
				{
					title: 'Git',
					sidebarDepth: 2,
					children: [
						'/after/git/1',
					]
				},
				{
					title: 'NodeJS',
					sidebarDepth: 2,
					children: [
						'/after/mongo/1',
						'/after/mongo/2'
					]
				},
				{
					title: 'Docker',
					sidebarDepth: 2,
					children: [
						'/after/mongo/1',
						'/after/mongo/2'
					]
				},
			],
			'/other/': [
				// {
				// 	title: '高阶函数',
				// 	sidebarDepth: 2,
				// 	children: [
				// 		'/other/高阶函数/1',
				// 	]
				// },
				{
					title: '手写 API',
					children: [
						'/other/手写/1', 
						'/other/手写/2', 
						'/other/手写/3', 
						'/other/手写/4',
						'/other/手写/5',
						'/other/手写/6',
						'/other/手写/7',
						'/other/手写/8',
						'/other/手写/9',
						'/other/手写/10',
						'/other/手写/11',
						'/other/手写/12',
						'/other/手写/13',
						'/other/手写/14'
					]
				},
				{
					title: '设计模式',
					sidebarDepth: 2,
					children: [
						'/other/设计模式/1',
						'/other/设计模式/2',
						'/other/设计模式/3',
						'/other/设计模式/4',
						'/other/设计模式/5',
						'/other/设计模式/6',
					]
				},
				{
					title: '数据结构',
					sidebarDepth: 2,
					children: [
						'/other/数据结构/1',
						'/other/数据结构/2',
						'/other/数据结构/3',
						'/other/数据结构/4',
						'/other/数据结构/5',
						'/other/数据结构/6',
						'/other/数据结构/7',
						'/other/数据结构/8',
						'/other/数据结构/9',
					]
				},
				{
					title: '算法学习',
					sidebarDepth: 2,
					children: [
						'/other/算法/1',
						'/other/算法/2',
						'/other/算法/3',
						'/other/算法/4',
					]
				},
				{
					title: '一些面试题',
					children: [
						'/other/Other/1', 
						'/other/Other/2', 
						'/other/Other/3', 
						'/other/Other/4', 
						'/other/Other/5', 
						'/other/Other/6',
						'/other/Other/7',
						'/other/Other/8',
						'/other/Other/9',
						'/other/Other/10',
						'/other/Other/11'
					]
				},
			]
		}
	}
};
