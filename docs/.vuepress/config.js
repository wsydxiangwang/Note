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
					children: []
				},
				{
					title: 'JS 深入数组',
					children: ['/JavaScript/Array/1', '/JavaScript/Array/2', '/JavaScript/Array/3', '/JavaScript/Array/4', '/JavaScript/Array/5', '/JavaScript/Array/6', '/JavaScript/Array/7']
				},
				{
					title: 'this 全面解析',
					children: ['/JavaScript/this/1', '/JavaScript/this/2', '/JavaScript/this/3']
				},
				{
					title: '原型 Prototype',
					children: ['',
					'/JavaScript/DOM/哦豁']
				},
				{
					title: '节流防抖',
					children: ['/JavaScript/节流防抖/one', '/JavaScript/节流防抖/two']
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