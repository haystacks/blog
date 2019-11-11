import React, { Component } from 'react';
import Toast from '@doctorwork/react-easy/components/Toast';
import { getData, getTag } from '../utils/small-exif';
const styles = require('./upload.module.styl');

interface Props {
    onUploaded: Function
}

interface State {}

export default class CropperImage extends Component<Props, State> {
    state: State = {}

    onChange = (event: any) => {
        const hasFile = !event.target.files.length;
        if (hasFile) {
            return;
        }

        if (/\.ico|gif/.test(event.target.files[0].name)) {
            Toast('文件格式不被支持');
            return;
        }

        if (FileReader) {
            const file = event.target.files[0];
            const fr = new FileReader();
            fr.onload = (event: any) => {
                const self = this;
                getData(file, function() {  
                    const orientation = getTag(this, 'Orientation');
                    self.props.onUploaded(event.target.result, orientation);
                });
            }
            fr.readAsDataURL(file);
        } else {
            Toast('TODO: // ');
        }
    }

    render() {
        return (
            <input type="file" className={ styles.input } accept="image/*" onChange={ this.onChange } />
        );
    }
}