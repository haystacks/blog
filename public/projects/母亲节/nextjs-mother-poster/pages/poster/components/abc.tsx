import React, { Component } from 'react';
require('./moregoods.styl');

interface Props {
    activityProduct: Array<any>
    activityMomInfo: any
    global: any
}
interface State {}

export default class abc extends Component<Props, State> {

    activityProductClick(a: any, b: any, c: any) {
        const { forward } = this.props.global;
        forward('/Mother/index');
    }

    activeMomInfoClick(a: any, b: any) {
        const { forward } = this.props.global;
        forward('/Mother/index');
    }

    render() {
        const { activityProduct, activityMomInfo } = this.props;
        return (
            <div className="moregoods">
                <div className="otherGoodsTitle">
                    <div className="otherGoodsTitleBg" />
                    <div className="otherGoodsTitleName">其它1元领健康礼品</div>
                </div>
                <div className="otherGoods">
                    {activityProduct.map((item, index) => {
                        const momInfo = activityMomInfo[item.skuCode];
                        return (
                            <div className="goodItem" key={index}>
                                <div className="itemTitle">
                                    <div className="itemFirst">
                                        {momInfo.momDesc1}
                                    </div>
                                    <div className="itemSecond">
                                        {momInfo.momDesc2}
                                    </div>
                                </div>
                                <div className="itemDescribe">
                                    “{momInfo.momDesc3}”
                                </div>
                                <div
                                    className="itemDetails"
                                    onClick={e => {
                                        this.activityProductClick(
                                            momInfo.detailUrl,
                                            item.skuCode,
                                            momInfo.tktNum
                                        );
                                    }}
                                >
                                    <img
                                        className="goodsImage"
                                        src={item.logoImage}
                                    />
                                    <div className="goodsInfo">
                                        <div className="goodsTitle">
                                            {item.productName}
                                        </div>
                                        <div className="goodsPrice">
                                            市场价 :￥{item.originalPrice}
                                        </div>
                                        <div className="goodsSubtitle">
                                            <div>
                                                适用地区:
                                                {momInfo.applyZone}
                                            </div>
                                        </div>
                                        <div className="goodsCount">
                                            剩余数量: {momInfo.tktNum}件
                                        </div>
                                        <div className="goodsButtonBg">
                                            <div
                                                className="goodsButton"
                                                style={
                                                    momInfo.tktNum == 0
                                                        ? {
                                                              background:
                                                                  '#B7B7BB'
                                                          }
                                                        : {
                                                              background:
                                                                  '#ee1a22'
                                                          }
                                                }
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    if (momInfo.tktNum != 0) {
                                                        this.activeMomInfoClick(
                                                            item.skuCode,
                                                            momInfo.tktNum
                                                        );
                                                    }
                                                }}
                                            >
                                                <div>
                                                    {momInfo.tktNum == 0
                                                        ? '已抢光'
                                                        : '集爱心 1元领'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}