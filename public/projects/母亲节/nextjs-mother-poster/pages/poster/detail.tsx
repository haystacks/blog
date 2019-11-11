import React, { Component } from 'react';
import setShare from './utils/share';
const BASE = `${process.env.REACT_APP_WEB_DOMAIN}${process.env.PUBLIC_URL}`;
import img from './images/detail';
const commonStyles = require('./common.module.styl');
const styles = require('./detail.module.styl');

interface Props {
    global: any
}

interface State {}

export default class Detail extends Component<Props, State> {
    
    componentDidMount() {
        setShare(`${BASE}/show/mother/poster`);
        document.title = '晒妈妈芳华，赢取家庭医⽣';
    }

    onClick = () => {
        const { forward } = this.props.global;
        forward('/show/mother/poster-upload');
    }

    render() {
        return (
            <div className={ styles.page }>
                <img className={ styles.img } src={ img.img1 } />
                <img className={ styles.img } src={ img.img2 } />
                <img className={ styles.img } src={ img.img3 } />
                {/* <div className={ styles.rule }>
                    <div className={ styles.title }>
                        使用规则
                    </div>
                    <div className={ styles.content}>
                        <div>
                            1. 收集10颗笑心即可在企鹅医生lifegoods商城1元换礼品
                        </div>
                        <div>
                            2. 礼品兑换后，3个月内可预约到店使用
                        </div>
                        <div>
                            3. 可以前往所列范围任意一家门店进行服务
                        </div>
                    </div>
                </div> */}
                <div className={ styles.placeholder }></div>
                <button onClick={ this.onClick } className={ [styles.btn, commonStyles.x].join(' ') }>选择奖品，制作海报</button>
            </div>
        )
    }
}