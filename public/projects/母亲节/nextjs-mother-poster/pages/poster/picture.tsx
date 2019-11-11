import React, { Component } from 'react';
import Upload from './components/upload'; // 上传图片
import Compress from './components/compress'; // 压缩图片
import setShare from './utils/share';
const BASE = `${process.env.REACT_APP_WEB_DOMAIN}${process.env.PUBLIC_URL}`;
const styles = require('./picture.module.styl');
const head = require('./images/head.png');
const foot = require('./images/foot.png');
const camera = require('./images/camera.png');

interface Props {
    global: any
}

interface State {}

export default class Picture extends Component<Props, State> {

    state: State = {}
    
    onUploaded = (data: string, orientation: number) => {
        // 这里因为图片太大，需要压缩
        const compress: any = this.refs.compress;
        compress.compress(data, orientation).then((data: string) => {
            sessionStorage.setItem('originImg', data);
            const { forward } = this.props.global;
            setTimeout(() => {
                forward('/show/mother/poster-cropper');
            }, 0)
        })
    }

    componentWillMount() {
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
                <img src={ head } />
                <div className={ styles.container }>

                    <div className={ styles.uploader }>
                        <div className={ styles.icon }>
                            <img src={ camera } />
                        </div>
                        <div className={ styles.title }>上传照片</div>
                        <div className={ styles.desc }>晒出妈妈最美的照片</div>
                        <Upload onUploaded={ this.onUploaded }></Upload>
                    </div>
                </div>
                <div className={ styles.footer }>
                    {/* <div className={ styles.lifegoods }>
                        LifeGoods
                        <span>新健康.新生活</span>
                    </div>
                    <div className={ styles.copyright }>企鹅医生出品</div> */}
                    <img src={ foot } />
                </div>
                <Compress ref="compress"></Compress>
            </div>
        );
    }
}