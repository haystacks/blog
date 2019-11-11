import React, { Component } from 'react';
import CropperImg from './components/cropper'; // 裁剪图片
import setShare from './utils/share';
const BASE = `${process.env.REACT_APP_WEB_DOMAIN}${process.env.PUBLIC_URL}`;
const styles = require('./cropper.module.styl');
const commonStyles = require('./common.module.styl');
const cancel = require('./images/cancel.png');
const confirm = require('./images/confirm.png');

const img = sessionStorage.getItem('originImg');

interface Props {
    global: any
}

interface State {
    cropper: any
}

export default class Cropper extends Component<Props, State> {

    state: State = {
        cropper: null
    }
    
    onCrop = (cropper: any) => {
        this.setState({
            cropper
        })
    }

    cancel = () => {
        const { forward } = this.props.global;
        forward('/show/mother/poster', {}, 'replace');
    }

    confirm = () => {
        const { forward } = this.props.global;
        const { cropper } = this.state;
        if (cropper && sessionStorage.hasOwnProperty('originImg')) {
            const outputImg = cropper.getCroppedCanvas().toDataURL('image/png');
            sessionStorage.setItem('outputImg', outputImg);
            setTimeout(() => {
                forward('/show/mother/poster-edit');
            }, 0);
        } else {
            this.cancel();
        }
    }
    
    componentWillMount() {
        !img && this.cancel();
    }

    componentDidMount() {
        setShare(`${BASE}/show/mother/poster`);
        document.title = '';
    }

    render() {
        return (
            <div className={ styles.page }>
                <div className={ styles.wrapper }>
                    <CropperImg img={ img } onCrop={ this.onCrop }></CropperImg>
                </div>
                <div className={ styles.footer }>
                    <div className={ [styles.tool, commonStyles.x].join(' ') }>
                        <img onClick={ this.cancel } className={ styles.cancel } src={ cancel } />
                        <span className={ styles.title }>裁剪</span>
                        <img onClick={ this.confirm } className={ styles.confirm } src={ confirm } />
                    </div>
                </div>
            </div>
        );
    }
}