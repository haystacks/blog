import React, { Component } from 'react';
require('./moregifts.styl');

interface Props {
    recommendProduct: Array<any>
    onClick: Function
}
interface State {}

export default class MoreGifts extends Component<Props, State> {
    state: State = {}

    otherProductClick(skuCode: any) {
        this.props.onClick(skuCode);
    }

    render() {
        const { recommendProduct } = this.props;
        return (
            <div className="moregiftsmodule">
                <div className="moreGifts">更多节日好礼</div>
                <div className="moreGiftsDescribe">
                    Lifegoods企鹅健康商店甄选多款健康好物，让你轻松为妈妈选购节日礼物。
                </div>
                <div className="moreGoods">
                    {recommendProduct.map((item, index) => {
                        return (
                            <div
                                className="item"
                                key={index}
                                onClick={e => {
                                    this.otherProductClick(item.skuCode);
                                }}
                            >
                                <img
                                    className="image"
                                    src={item.logoImage}
                                />
                                <div
                                    className="title"
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}
                                >
                                    {item.productName}
                                </div>
                                <div
                                    className="subtitle"
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical'
                                    }}
                                >
                                    {item.productDesc}
                                </div>
                                <div className="priceContainer">
                                    <div className="price">
                                        ¥&nbsp;{item.presentPrice}
                                    </div>
                                    <div className="discount">
                                        {item.discount}折
                                    </div>
                                </div>
                                <div className="button">立即抢购</div>
                            </div>
                        );
                    })}
                </div>
                <div className="bottomInfo">
                    {/* <div className="first">LifeGoods</div>
                    <div className="second">LifeGoods</div> */}
                    <img
                        src={ require('./images/bottomLogo.png') }
                        className="bottomLogo"
                    />
                    <div className="third">
                        <p>企鹅医生全新健康生活方式品牌</p>
                        <p>LifeGoods健康心选商城</p>
                        <p>为你甄选高品质健康好物和健康服务</p>
                    </div>
                </div>
            </div>
        )
    }
}