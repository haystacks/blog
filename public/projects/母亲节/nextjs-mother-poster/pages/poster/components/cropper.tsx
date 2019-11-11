import React, { Component } from 'react';
import Cropper from 'cropperjs';
require('cropperjs/dist/cropper.min.css');
require('./cropper.reset.css');

interface Props {
    img: string
    onCrop: Function
}
interface State {
    img: string
    imgCropRegion: {
        width: number
        height: number
        x: number
        y: number
    }
    outputImg: string
}

export default class CropperImage extends Component<Props, State> {
    state: State = {
        img: '',
        imgCropRegion: {
            width: 0, 
            height: 0,
            x: 0,
            y: 0
        },
        outputImg: ''
    }

    imgOnLoad = (e: any) => {
        const cropper: any = this.refs.cropper;
        const _cropper = new Cropper(cropper, {
            cropBoxResizable: false,
            viewMode: 3,
            dragMode: 'move' as Cropper.DragMode,
            ready: () => {
                const { width, height } = _cropper.getContainerData();
                _cropper.setCropBoxData({ left: 0, top: (height - 337) / 2, width, height: 337 * (width / 300) }); // 599 * 673
                this.props.onCrop(_cropper);
            },
            cropend: ({ detail }) => {
                // const outputImg = _cropper.getCroppedCanvas().toDataURL('image/png');
                // this.setState({ 'imgCropRegion': detail, outputImg });
                // const { img, imgCropRegion } = this.state;
                // this.props.onCrop({ img, imgCropRegion, outputImg });
            }
        });
    }

    render() {
        let { img } = this.props;
        return (
            <>
                <img ref="cropper" src={ img } onLoad={ this.imgOnLoad } />
            </>
        );
    }
}