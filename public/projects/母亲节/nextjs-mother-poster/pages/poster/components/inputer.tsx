import React, { Component } from 'react';
const styles = require('./inputer.module.styl');
const left = require('./images/left.png');

interface Props {
    onConfirm: Function
    onCancel?: Function
    placeholder?: string
}

interface State {
    bg: string
    value: string
    lock: boolean
    maxLength: number
}

export default class Inputer extends Component<Props, State> {

    state: State = {
        bg: styles.inputerBg,
        value: '',
        lock: false,
        maxLength: -1
    }

    show = (value = '', maxLength = -1) => {
        // reset value
        const inputEle: any = this.refs.input;
        inputEle.value = value || '';
        inputEle.focus();

        this.setState({
            value: value || '',
            maxLength,
            bg: [styles.inputerBg, styles.show].join(' ')
        })
    }

    hide = () => {
        this.setState({
            bg: styles.inputerBg
        })
        document.body.removeAttribute('style');
        this.props.onCancel && this.props.onCancel();
    }

    confirm = () => {
        const { value } = this.state;
        this.props.onConfirm(value);
    }

    onClick = (e: any) => {
        switch(e.target.tagName.toLocaleUpperCase()) {
            case 'BUTTON':
                this.confirm();
            case 'DIV':
            case 'IMG':
                this.hide();
        }
    }

    onInput = (e: any) => {
        let value = e.target.value;
        setTimeout(() => {
            const { lock, maxLength } = this.state;
            if (maxLength > 0 && value.length > maxLength && !lock) {
                value = value.slice(0, maxLength);
                const inputEle: any = this.refs.input;
                inputEle.value = value;
            }
            if (!lock) {
                this.setState({
                    value
                })
                // 实时更新
                // this.props.onConfirm(value);
            }
        }, 0)
    }

    onCompositionEnd = (e: any) => {
        this.setState({
            lock: false
        })
    }

    onCompositionStart = (e: any) => {
        this.setState({
            lock: true
        })
    }

    onFocus = () => {
        setTimeout(() => {
            // GET fixed 输入法相关 iOS
            const inputEle: any= this.refs.input;
            window.scrollTo(0, 0);
            inputEle.parentElement.parentElement.style = `height: ${window.innerHeight}px;`;
            // document.body.setAttribute('style', `position: fixed; width: 100%; overflow: hidden; height: ${window.innerHeight}px;`);
        }, 500)
    }

    onBlur = () => {
        setTimeout(() => {
            const inputEle: any= this.refs.input;
            window.scrollTo(0, 0);
            inputEle.parentElement.parentElement.style = '';
        }, 100)
    }

    componentDidMount() {
        function stopScrolling( touchEvent: any ) {
            touchEvent.preventDefault(); 
        }
        const abc: any = this.refs.abc;
        abc.addEventListener('touchmove' , stopScrolling);
    }

    render() {
        const { bg } = this.state;
        const { placeholder = '15个字之内' } = this.props;
        return (
            <div ref="abc" className={ bg } onClick={ this.onClick }>
                <div className={ styles.editor }>
                    <img src={ left } alt=""/>
                    <input
                        ref="input"
                        type="text"
                        onInput={ this.onInput }
                        onCompositionStart={ this.onCompositionStart }
                        onCompositionEnd={ this.onCompositionEnd }
                        onBlur={ this.onBlur }
                        onFocus={ this.onFocus }
                        placeholder={ placeholder }
                    />
                    <button>确认</button>
                </div>
            </div>
        )
    }
}