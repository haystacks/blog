import React, { Component } from 'react';
import DrawPoster from './components/draw'; // 画海报
import Inputer from './components/inputer'; // 输入
import Preview from './components/preview'; // 预览
import Upload from './components/upload'; // 上传图片
import Compress from './components/compress'; // 压缩图片
import QRCodeAlert from '../MotherIndex/components/qrcodeAlert';
import setShare from './utils/share';
const BASE = `${process.env.REACT_APP_WEB_DOMAIN}${process.env.PUBLIC_URL}`;

import colors from './images/edit/colors';
import tags from './images/edit/tags';
const styles = require('./edit.module.styl');
const commonStyles = require('./common.module.styl');

const outputImg = sessionStorage.getItem('outputImg');
const poster = localStorage.getItem('poster');

interface DrawData {
    bg: any
    image: any
    tag: any
    content: any
    user: any
}

interface Props {
    global: any
}

interface State {
    img: string
    inputName: string
    tagIndex: number
    bgIndex: number
    placeholder: string
    drawData: DrawData
    userData: UserData
    btnPosition: any
    skuCode: string
}

interface UserData {
    content: string
    user: string
    tagIndex: number
    bgIndex: number
}

export default class Edit extends Component<Props, State> {

    state: State = {
        img: '',
        inputName: '',
        tagIndex: 0,
        bgIndex: 0,
        placeholder: '',
        drawData: {
            bg: {
                ratio: 1,
                type: 'image',
                img: colors[0].value,
                imgCropRegion: {
                    x: 0,
                    y: 0,
                    width: 375,
                    height: 667
                }
            },
            image: {
                type: 'image',
                img: outputImg,
                ratio: 1,
                imgCropRegion: {
                    x: 37.5,
                    y: 132.5,
                    width: 300,
                    height: 337
                }
            },
            tag: {
                ratio: 1,
                type: 'image',
                img: tags[0],
                imgCropRegion: {
                    x: 0,
                    y: 49,
                    width: 375,
                    height: 110
                }
            },
            content: {
                ratio: 1,
                type: 'text',
                option: {
                    x: 26,
                    y: 372,
                    text: '妈妈，我爱你',
                    textAlign: 'left',
                    font: '18px Arial',
                    style: '#fff'
                }
            },
            user: {
                ratio: 1,
                type: 'text',
                option: {
                    x: 348,
                    y: 425,
                    text: '—— 你的小宝贝',
                    textAlign: 'right',
                    font: '13px Arial',
                    style: '#fff'
                }
            }
        },
        userData: {
            content: '',
            user: '',
            tagIndex: 0,
            bgIndex: 0
        },
        btnPosition: {},
        skuCode: ''
    }

    onOutput = (img: string) => {
        this.setState({ img });
    }

    reset = () => {
        const { forward } = this.props.global;
        // TODO: 清除 sessionStorage outputImg originImg
        localStorage.removeItem('poster');
        forward('/show/mother/poster', {}, 'replace');
    }

    onConfirm = (data: string) => {
        const { inputName, drawData, userData } = this.state;
        let ref: any;
        let text: string;
        switch(inputName) {
            case 'content':
                ref = this.refs.content;
                text = data || '妈妈，我爱你';
                userData.content = data;
                drawData['content'] = {
                    ratio: 1,
                    type: 'text',
                    option: {
                        x: 27,
                        y: 372,
                        text,
                        textAlign: 'left',
                        font: '18px Arial',
                        style: '#fff'
                    }
                };
                break;
            case 'user':
                ref = this.refs.user;
                text = data || '你的小宝贝';
                userData.user = data;
                drawData['user'] = {
                    ratio: 1,
                    type: 'text',
                    option: {
                        x: 348,
                        y: 425,
                        text: `—— ${text}`,
                        textAlign: 'right',
                        font: '13px Arial',
                        style: '#fff'
                    }
                };
                break;
        }
        ref.value = data;
        this.draw();
    }

    onCancel = () => {
        // TODO: create poster button fixed
        this.setState({
            btnPosition: {
                position: 'fixed'
            }
        })
    }

    onClick = (e: any) => {
        const tagName = e.target.tagName,
              name = e.target.name;
        
        if (tagName === 'INPUT') {
            // 获取当前内容
            const inputEle: any = this.refs[name]
            const value = inputEle.value;
            const inputer: any = this.refs.inputer;
            let maxLength;
            if (name === 'content') {
                maxLength = 15;
            } else if (name === 'user') {
                maxLength = 10;
            }
            this.setState({
                inputName: name,
                placeholder: `${maxLength}个字以内`
            });
            inputer.show(value, maxLength);
            // TODO: create poster button relative
            this.setState({
                btnPosition: {
                    position: 'relative'
                }
            })


        } else if (tagName === 'DIV' || tagName === 'IMG') {
            const dataset = e.target.dataset;
            
            let { drawData, userData } = this.state;
            switch(dataset.type) {
                case 'color':
                    const bg = colors[dataset.index].value;
                    drawData['bg'] = {
                        ratio: 1,
                        type: 'image',
                        img: bg,
                        imgCropRegion: {
                            x: 0,
                            y: 0,
                            width: 375,
                            height: 667
                        }
                    };
                    userData.bgIndex = dataset.index;
                    this.setState({
                        drawData,
                        bgIndex: dataset.index,
                        userData
                    });
                    break;
                case 'tag':
                    const tag = tags[dataset.index];
                    drawData['tag'] = {
                        ratio: 1,
                        type: 'image',
                        img: tag,
                        imgCropRegion: {
                            x: 0,
                            y: 49,
                            width: 375,
                            height: 110
                        }
                    };
                    userData.tagIndex = dataset.index;
                    this.setState({
                        drawData,
                        tagIndex: dataset.index,
                        userData
                    });
                    break;
            }
            
            this.draw();
        }
    }

    createPoster = () => {
        const poster: any = this.refs.poster;
        const img = poster.toDataURL();
        const preview: any = this.refs.preview;
        // 清除 originImg outputImg
        sessionStorage.removeItem('originImg');
        sessionStorage.removeItem('outputImg');
        // 新增
        localStorage.setItem('poster', img);
        preview.show(img);
        MtaH5.clickStat('create_poster');
    }

    getOptions() {
        const { drawData } = this.state;
        const options: Array<any> = [];
        ['image', 'bg', 'tag', 'content', 'user'].forEach(key => {
            options.push(drawData[key]);
        })
        return options;
    }

    draw = () => {
        // make options
        const options = this.getOptions();
        const poster: any = this.refs.poster;
        poster.draw(options);
    }
    
    onUploaded = (data: string, orientation: number) => {
        if (!data) {
            return;
        }
        // 这里因为图片太大，需要压缩
        const compress: any = this.refs.compress;
        compress.compress(data, orientation).then((data: string) => {
            sessionStorage.setItem('originImg', data);
            // 缓存用户选择的数据
            sessionStorage.setItem('userData', JSON.stringify(this.state.userData));
            const { forward } = this.props.global;
            forward('/show/mother/poster-cropper');
        })
    }

    refreshData = () => {
        // 如果session存在还原数据
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            if (userData) {
                const { drawData } = this.state;
                // 更新绘图数据
                drawData['content'].option.text = userData.content || '妈妈，我爱你';
                drawData['user'].option.text = `—— ${userData.user || '你的小宝贝'}`;
                drawData['bg'].img = colors[userData.bgIndex].value;
                drawData['tag'].img = tags[userData.tagIndex];
                // 更新输入框展示数据
                const content: any = this.refs.content
                content.value = userData.content;
                const user: any = this.refs.user
                user.value = userData.user;
                // 更新数据
                this.setState({
                    tagIndex: userData.tagIndex,
                    bgIndex: userData.bgIndex,
                    drawData,
                    userData
                })
                // 清除数据
                sessionStorage.removeItem('userData');
                this.draw();
            }
        } catch(e) {}
    }

    componentWillMount() {
        poster || !outputImg && this.reset();
    }

    componentDidMount() {
        setShare(`${BASE}/show/mother/poster`);
        document.title = '晒妈妈芳华，赢取家庭医⽣';
        if (poster) {
            const preview: any = this.refs.preview;
            preview.show(poster);
        } else {
            this.refreshData();
        }
        //
        // function stopScrolling( touchEvent: any ) {
        //     touchEvent.preventDefault(); 
        // }
        // document.body.addEventListener('touchmove' , stopScrolling);
    }

    goodsClick = (skuCode: string) => {
        this.setState({
            skuCode
        })
    }

    render() {
        const options = this.getOptions();
        /**
         * 
         * - 背景颜色 - 封面（可能和颜色联动）合并
         * - 裁剪的图片
         * - 标签
         * - 对她说的话
         * - 称谓
         * 
         */
        const { tagIndex, bgIndex, placeholder, btnPosition, skuCode } = this.state,
            tagClass = styles.scrollerItem,
            tagActiveClass = [styles.scrollerItem, styles.scrollerItemActive].join(' '),
            bgClass = [styles.scrollerItem, styles.scrollerItemColor].join(' '),
            bgActiveClass = [styles.scrollerItem, styles.scrollerItemColor, styles.scrollerItemColorActive].join(' ');
        return (
            <div className={ styles.page }>
                <div className={ styles.preview }>
                    <div className={ styles.reset }>
                        <div className={ styles.up }>
                            重新上传
                        </div>
                        <Upload onUploaded={ this.onUploaded }></Upload>
                    </div>
                    <div className={ styles.previewWrapper }>
                        <DrawPoster ref="poster" className={ styles.draw } options={ options } onOutput={ this.onOutput }></DrawPoster>
                    </div>
                </div>
                <div className={ styles.editor } onClick={ this.onClick }>
                    <div className={ styles.title }>
                        选择妈妈的标签：
                    </div>
                    <div className={ styles.scroller }>
                        {
                            tags.map((tag, index) => (
                                <div key={ `tag_${index}` } data-type="tag" data-index={ index } className={ index == tagIndex ? tagActiveClass : tagClass }>
                                    <img data-type="tag" data-index={ index } src={ tag } />
                                </div>
                            ))
                        }
                    </div>
                    <div className={ styles.title }>
                        背景颜色：
                    </div>
                    <div className={ [styles.scroller, styles.scrollerColor].join(' ') }>
                        {
                            colors.map((color, index) => (
                                <div key={ `color_${index}` } data-type="color" data-index={ index } className={ index == bgIndex ? bgActiveClass : bgClass } style={ { backgroundColor: color.key } }></div>
                            ))
                        }
                    </div>
                    <div className={ styles.inputer }>
                        <div className={ styles.title }>我想对她说：</div><input ref="content" name="content" type="text" placeholder="妈妈，我爱你" readOnly />
                    </div>
                    <div className={ styles.inputer }>
                        <div className={ styles.title }>落款儿：</div><input ref="user" name="user" type="text" placeholder="你的小宝贝" readOnly />
                    </div>
                </div>
                <div className={ styles.placeholder }></div>
                <div ref="createPoster" style={ btnPosition } onClick={ this.createPoster } className={ [styles.btn, commonStyles.x].join(' ') }>生成海报</div>
                <Inputer ref="inputer" placeholder={ placeholder } onConfirm={ this.onConfirm } onCancel={ this.onCancel }></Inputer>
                <Preview ref="preview" onReset={ this.reset } goodsClick={ this.goodsClick } { ...this.props }></Preview>
                <Compress ref="compress"></Compress>
                <QRCodeAlert skuCode={ skuCode } />
            </div>
        );
    }
}