import React, { Component } from 'react';
import setShare from './utils/share';
import { doAuth } from '@doctorwork/write-easy/lib/wechat';
const BASE = `${process.env.REACT_APP_WEB_DOMAIN}${process.env.PUBLIC_URL}`;
const styles = require('./index.module.styl');
const commonStyles = require('./common.module.styl');
const index = require('./images/index.jpg');
const link = require('./images/link.png');

interface Props {
    global: any
}

interface State {}

export default class Index extends Component<Props, State> {

    onClick = (e: any) => {
        const url = e.target.dataset.url;
        const { forward } = this.props.global;
        forward(url);
    }

    componentWillMount() {
        const openId = localStorage.getItem('openId');
        if (!openId) {
            var url = location.href;
            doAuth(url);
        }
        const poster = localStorage.getItem('poster');
        const { forward } = this.props.global;
        if (poster) {
            forward('/show/mother/poster-edit', {}, 'replace');
        }
    }

    componentDidMount() {
        setShare(`${BASE}/show/mother/poster`);
        document.title = '晒妈妈芳华，赢取家庭医⽣';
    }

    render() {
        return (
            <div className={ styles.page }>
                <img className={ styles.index } src={ index } />
                <div className={ styles.content }>
                    <div className={ styles.title }>
                        晒出妈妈当年美照，为她领取线上家庭医生
                    </div>
                    <div className={ styles.desc }>
                        制作表白海报，分享朋友圈并截图发送“企鹅医生”公众号，即可领取家庭医生服务<span>一年</span>哦！
                    </div>
                    <div onClick={ this.onClick } data-url="/show/mother/poster-detail" className={ styles.other }>福利详情<img src={ link } /></div>
                </div>
                <div className={ styles.placeholder }></div>
                <button onClick={ this.onClick } data-url="/show/mother/poster-upload" className={ [styles.btn, commonStyles.x].join(' ') }>立即制作妈妈芳华海报</button>
            </div>
        );
    }
}