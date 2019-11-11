import React, { Component } from 'react';
import Abc from './abc';
import Def from './def';
import { get } from '../../../../../lib/app-utils/api';
const styles = require('./preview.module.styl');

interface Props {
    onReset: Function
    goodsClick: Function
    global: any
}

interface State {
    bg: string
    img: string
    footerStyle: any
    activityProduct: Array<any>
    activityMomInfo: any
    recommendProduct: Array<any>
}

export default class Preview extends Component<Props, State> {

    state: State = {
        bg: styles.preview,
        img: '',
        footerStyle: null,
        activityProduct: [],
        activityMomInfo: {},
        recommendProduct: []
    }

    show = (img: string) => {

        this.setState({
            img: img,
            bg: [styles.preview, styles.show].join(' ')
        })
        document.body.setAttribute('style', 'position:fixed; width:100%;');
    }

    hide = () => {
        this.setState({
            bg: styles.preview
        })
        document.body.removeAttribute('style');
    }

    onLoad = () => {
        const img: any = this.refs.img;
        const { left } = img.getBoundingClientRect();
        this.setState({
            footerStyle: {
                margin: `.3rem ${left}px 0`,
                opacity: 1
            }
        })
    }

    onClick = (e: any) => {
        if (e.target.tagName === 'BUTTON') {
            switch(e.target.type) {
                case 'reset':
                    this.hide();
                    this.props.onReset();
                    break;
            }
        }

        // if (e.target.dataset.type === 'poster') {
        //     MtaH5.clickStat('share_poster');
        // }
    }

    onTouchStart = (e: any) => {
        if (e.target.dataset.type === 'poster') {
            MtaH5.clickStat('share_poster');
        }
    }

    async fetchProducts() {
        let activityMomInfo = {},
            activitySkus = [],
            recommendSkus = [];

        //活动商品
        const list = await get('/activity/mom/get_sku_list');
        const activitySkuCodeList = list.activitySkuCodeList || [];
        for (let index in activitySkuCodeList) {
            let skuCode = list.activitySkuCodeList[index]['skuCode'];
            activityMomInfo[skuCode] = list.activitySkuCodeList[index];
            activitySkus.push(skuCode);
        }

        //请求活动商品
        const activityResult = await get('/v2/product/search/appname', {
            appName: 'health-weapp',
            skuCodes: activitySkus.join(','),
            pageNum: 1,
            pageSize: activitySkuCodeList.length
        });
        const activityProduct = activityResult.list;

        
        //推荐商品
        const recommendSkuCodeList = list.recommendSkuCodeList || [];
        for (let index in recommendSkuCodeList) {
            recommendSkus.push(recommendSkuCodeList[index]);
        }

        //请求推荐商品
        const recommendResult = await get('/v2/product/search/appname', {
            appName: 'health-weapp',
            skuCodes: recommendSkus.join(','),
            pageNum: 1,
            pageSize: recommendSkuCodeList.length
        });
        const recommendProduct = recommendResult.list;

        this.setState({ activityProduct, activityMomInfo, recommendProduct });
    }

    componentWillMount() {
        this.fetchProducts();
    }

    render() {
        const { bg, img, footerStyle, activityProduct, activityMomInfo, recommendProduct } = this.state;
        const { goodsClick } = this.props;
        return (
            <div onClick={ this.onClick } onTouchStart={ this.onTouchStart } className={ bg }>
                <div className={ styles.poster }>
                    {
                        img ? <img ref="img" data-type="poster" className={ styles.img } onLoad={ this.onLoad } src={ img } /> : ''
                    }
                    <div className={ styles.footer } style={ footerStyle }>
                        <button type="reset">重新制作</button>
                        <button type="button">
                            长按保存去分享
                            {
                                img ? <img data-type="poster" className={ styles.download } onLoad={ this.onLoad } src={ img } /> : ''
                            }
                        </button>
                    </div>
                </div>
                <div className={ styles.rule }>
                    <div className={ styles.title }>
                        如何为妈妈领取<span>「家庭医生」</span>服务？
                    </div>
                    <div className={ styles.desc }>
                        <div className={ styles.line }>1. 分享表白妈妈海报至朋友圈</div>
                        <div className={ styles.line }>2. 在「企鹅医生」服务号通过输入框向后台小编发送朋友圈截图，我们的工作人员会联系您</div>
                    </div>
                </div>
                <div className={ styles.goods }>
                    <Abc activityProduct={ activityProduct } activityMomInfo={ activityMomInfo } { ...this.props }  />
                    <Def recommendProduct={ recommendProduct } onClick={ goodsClick } />
                </div>
            </div>
        )
    }
}