module.exports = {
	title: '不吃茶的李白v',
	description: 'Live and Study.',
	head: [
		['link', { rel: 'icon', href: '/images/photo.jpg' }],
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
					children: []
				},
				{
					title: 'this 全面解析',
					children: ['',
					'/JavaScript/Core/one',
					'/JavaScript/Core/two']
				},
				{
					title: '原型 Prototype',
					children: ['',
					'/JavaScript/DOM/哦豁']
				},
				{
					title: '节流防抖',
					children: []
				},
				{
					title: '作用域闭包',
					children: []
				},
				{
					title: 'JS 深入数组',
					children: []
				},
				{
					title: 'this 全面解析',
					children: ['',
					'/JavaScript/Core/one',
					'/JavaScript/Core/two']
				},
				{
					title: '原型 Prototype',
					children: ['',
					'/JavaScript/DOM/哦豁']
				},
				{
					title: '节流防抖',
					children: []
				},
				{
					title: '作用域闭包',
					children: []
				},
				{
					title: 'JS 深入数组',
					children: []
				},
				{
					title: 'this 全面解析',
					children: ['',
					'/JavaScript/Core/one',
					'/JavaScript/Core/two']
				},
				{
					title: '原型 Prototype',
					children: ['',
					'/JavaScript/DOM/哦豁']
				},
				{
					title: '节流防抖',
					children: []
				},
				{
					title: '作用域闭包',
					children: []
				},
				{
					title: 'JS 深入数组',
					children: []
				},
				{
					title: 'this 全面解析',
					children: ['',
					'/JavaScript/Core/one',
					'/JavaScript/Core/two']
				},
				{
					title: '原型 Prototype',
					children: ['',
					'/JavaScript/DOM/哦豁']
				},
				{
					title: '节流防抖',
					children: []
				},
				{
					title: '作用域闭包',
					children: []
				},
				{
					title: 'JS 深入数组',
					children: []
				}
			],
			'/Vue/': [
				{
					title: 'cl1111ass',
					children: []
				}
			]
		}
	}
};