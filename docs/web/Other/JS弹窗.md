# JS弹窗

```js
/**
 *  全局弹窗 
 * 
 *  error: 错误提示
 *  prompt: 确认或取消 （可回调）
 *  confirm: 确认提示 （可回调）
 *  loading: loading
 *  success: 成功（可回调）
 * 
 *  $popup.show({
        type: 'prompt',
        text: 'text'
    }).then(() => {
        // ....执行确认回调
    })
 */
class Popup{
    constructor() {
        /**
         * 创建外层标签
         */
        this.el = document.getElementById('Popup');
        if (!this.el) {
            this.el = document.createElement('div');
            this.el.id = 'Popup';
            document.body.appendChild(this.el);
        }

        this.typeList = {
            prompt: {
                content: `
                    <div class="btn">
                        <button class="confirm">Confirm</button>
                        <button class="confirm cancel">Cancel</button>
                    </div>`
            },
            confirm: {
                content: `
                    <div class="btn">
                        <button class="confirm">OK</button>
                    </div>`
            },
            loading: {
                content: `<div class="loading-box">
                        <span class="loading loading1"></span>
                        <span class="loading loading2"></span>
                        <span class="loading loading3"></span>
                        <span class="loading loading4"></span>
                        <span class="loading loading5"></span>
                        <span class="loading loading6"></span>
                        <span class="loading loading7"></span>
                        <span class="loading loading8"></span>
                        <span class="loading loading9"></span>
                        <span class="loading loading10"></span>
                        <span class="loading loading11"></span>
                        <span class="loading loading12"></span>
                    </div>`
            },
            success: {
                content: `
                    <div class="btn">
                        <button class="confirm">OK</button>
                    </div>`
            },
            error: {
                content: `
                    <div class="btn">
                        <button class="confirm cancel">OK</button>
                    </div>
                `
            }
        }

        this.fun = {}
    }

    show ({ 
        type, // => 弹窗类型
        text, // => 提示内容（支持html）
        misk  // => 是否显示遮罩（默认true）（参数Boolean）
    }) {
        if (type == 'loading') {
            const el = text ? `<div class="text">${text}</div>` : ''
            this.el.innerHTML = `<div class="loading-content">${this.typeList[type].content}${el}</div>`;
            this.el.className = text ? 'loading text' : 'loading';
        } else {

            let messageEl = document.createElement('div');
            messageEl.className = 'popup-content show';
            messageEl.innerHTML = `
                <img src="/Public/images/popup/${type}.png">
                <div class="text">${text}</div>
                ${this.typeList[type].content}
            `;
            messageEl.setAttribute('data-type', type)
    
            this.el.appendChild(messageEl)
            this.el.className = 'show'
    
            this.fun[type] = () => {
                console.log(2)
                this.close(messageEl)
            }

            // 注册关闭弹窗事件
            const btn_list = messageEl.querySelectorAll('.confirm')
            Array.from(btn_list).map(name => {
                name.addEventListener('click', this.fun[type])
            })
        }

        return this
    }
    close(el){
        // loading
        if(!el){
            this.el.className = ''
            const loading = this.el.querySelector('.loading-content');       

            console.log(loading)

            if (!loading) return;
            console.log(this.el)

            setTimeout(() => {
                this.el.removeChild(loading)    // 动画结束后，删除元素
            }, 300)
        }else{
            const type = el.getAttribute('data-type')
    
            const node = Array.from(this.el.children)
            node.map(item => {
                if(item.getAttribute('data-type') == type){
                    
                    item.className = 'popup-content exit'
    
                    if(node.length == 1){ // 关闭遮罩
                        this.el.className = ''
                    }

                    setTimeout(() => {
                        this.el.removeChild(item)
                    }, 300)
                }
            })

            
        }
    }
    then(fn){ 
        const dom = this.el.lastElementChild;
        const type = dom.getAttribute('data-type')

        // 非 error 触发回调
        if (type != 'error') {
            dom.querySelector('.confirm').removeEventListener('click', this.fun[type])

            dom.querySelector('.confirm').addEventListener('click', () => {
                fn()
                this.fun[type]()
            })
        }
    }
}
const $popup = new Popup();
```

```css
#Popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all .3s;
    .loading-box{
        width: 80px;
        height: 80px;
        z-index: 999;
        transform: translateY(-20px);
        border-radius: 12px;
    }
    .loading{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .loading::before{
        content: '';
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        background-color: var(--color-active);
        border-radius: 100%;
        -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
        animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    }
    .loading2{ transform: rotate(30deg); }
    .loading3{ transform: rotate(60deg); }
    .loading4{ transform: rotate(90deg); }
    .loading5{ transform: rotate(120deg); }
    .loading6{ transform: rotate(150deg); }
    .loading7{ transform: rotate(180deg); }
    .loading8{ transform: rotate(210deg); }
    .loading9{ transform: rotate(240deg); }
    .loading10{ transform: rotate(270deg); }
    .loading11{ transform: rotate(300deg); }
    .loading12{ transform: rotate(330deg); }
    .loading2::before{ animation-delay: -1.1s; }
    .loading3::before{ animation-delay: -1s; }
    .loading4::before{ animation-delay: -0.9s; }
    .loading5::before{ animation-delay: -0.8s; }
    .loading6::before{ animation-delay: -0.7s; }
    .loading7::before{ animation-delay: -0.6s; }
    .loading8::before{ animation-delay: -0.5s; }
    .loading9::before{ animation-delay: -0.4s; }
    .loading10::before{ animation-delay: -0.3s; }
    .loading11::before{ animation-delay: -0.2s; }
    .loading12::before{ animation-delay: -0.1s; }
    &.loading{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        opacity: 1;
        visibility: visible;
        &.text{
            background: rgba(255,255,255,0.95);
            .text{
                color: #303030;
                text-align: center;
            }
        }
    }
    &::before{
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        visibility: hidden;
        transition: all .3s;
    }
    .popup-content{
        width: 420px;
        min-height: 240px;
        padding: 44px 40px 22px;
        border-radius: 10px;
        background: #fff;
        z-index: 999;
        text-align: center;
        position: relative;
        box-shadow: 0 1px 8px #bdbdbd;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        transition: all .3s;
        position: absolute;
        top: 50%;
        transform: translateY(calc(-50% - 30px));
        .text{
            padding: 20px 0;
            color: var(--color-light);
        }
        .layui-icon-close{
            position: absolute;
            right: 12px;
            top: 12px;
            color: #c0c0c0;
            cursor: pointer;
            &:hover{
                color: #333;
            }
        }
        .btn{
            width: 100%;
            margin-top: 12px;
            display: flex;
            justify-content: center;
            button{
                background: var(--color-active);
                color: #fff;
                border-radius: 50px;
                height: 36px;
                display: inline-block;
                line-height: 32px;
                font-size: 14px;
                text-transform: uppercase;
                cursor: pointer;
                width: 120px;
                text-align: center;
                margin: 0 10px;
                transition: all .3s;
                border: none;
                &:hover{
                    background: var(--color-active-hover);
                }
                &.cancel, &.error{
                    background: #e93939;
                    &:hover{
                        background: #f53030;
                    }
                }
            }
        }
        &.show{
            opacity: 1;
            animation: popup-show 0.3s;
        }
        &.exit{
            opacity: 0;
            animation: popup-hide 0.3s;
        }
    }
    &.show{
        opacity: 1;
        visibility: visible;
        &::before{
            opacity: 1;
            visibility: visible;
        }
    }
    // &.exit .popup-content{
    //     animation: popup-hide 0.3s;
    // }
    // &.exit-opacity .popup-content{
    //     animation: opacity-hide 0.3s;
    // }
}

@keyframes opacity-show {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes opacity-hide {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@keyframes popup-show {
    0% {
        opacity: 0;
        transform: translateY(calc(-50% + 30px));
    }
    100% {
        opacity: 1;
        transform: translateY(calc(-50% - 30px));
    }
}
@keyframes popup-hide {
    0% {
        opacity: 1;
        transform: translateY(calc(-50% - 30px));
    }
    100% {
        opacity: 0;
        transform: translateY(calc(-50% + 30px));
    }
}
@-webkit-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
        -webkit-transform:scale(0);
        transform:scale(0)
    }
    40% {
        -webkit-transform:scale(1);
        transform:scale(1)
    }
}
@keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
        -webkit-transform:scale(0);
        transform:scale(0)
    }
    40% {
        -webkit-transform:scale(1);
        transform:scale(1)
    }
}
```