import React, { Component } from 'react';
const styles = require('./draw.module.styl');

interface Props {
    onOutput: Function
    options: Array<any>
    className?: string
}

interface State {
    canvas: any
    ctx: any
}

export default class DrawPoster extends Component<Props, State> {
    state: State = {
        canvas: null,
        ctx: null
    };

    // 绘图
    drawImage = (option: any, ctx: any) => {
        const img = option.img;
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = img;
            image.onload = () => {
                resolve({ image, option: option.imgCropRegion });
            }
            image.onerror = () => {
                // reject();
            }
        })
        .then(({ image, option: { x, y, width, height } }) => {
            ctx.drawImage(image, 0, 0, image.width, image.height, x * devicePixelRatio, y * devicePixelRatio, width * devicePixelRatio, height * devicePixelRatio);
        })
    }

    // 绘文本
    drawText = (option: any, ctx: any) => {
        function drawTextBG(ctx: any, txt: any, font: any, style: any, x: any, y: any, textAlign: any) {
            /// lets save current state as we make a lot of changes        
            ctx.save();
            /// set font
            ctx.font = font;
            /// draw text from top - makes life easier at the moment
            ctx.textBaseline = 'top';
            /// color for background
            ctx.fillStyle = '#000';
            /// get width of text
            var width = ctx.measureText(txt).width;
            /// draw background rect assuming height of font
            if (textAlign === 'left') {
                ctx.fillRect(x, y, width + 20, parseInt(font, 10) + 20);
            } else if(textAlign === 'right') {
                ctx.fillRect(x - width - 20, y, width + 20, parseInt(font, 10) + 20);
            }
            /// text color
            ctx.fillStyle = style;
            /// draw text on top
            if (textAlign === 'left') {
                ctx.fillText(txt, x + 10, y + 6);
            } else {
                ctx.fillText(txt, x - 10, y + 6);
            }
            /// restore original state
            ctx.restore();
        }
        const { x, y, font, text, style, textAlign } = option.option;
        ctx.textAlign = textAlign;
        ctx.fillStyle = style;
        ctx.font = font.replace(/^\d+/, (v: number) => v * devicePixelRatio);
        // ctx.fillText(text, x * devicePixelRatio, y * devicePixelRatio);
        drawTextBG(ctx, text, ctx.font, style, x * devicePixelRatio, y * devicePixelRatio, textAlign);
    }

    drawFill = (option: any, ctx: any) => {
        const { x, y, width, height, style } = option.option;
        ctx.rect(x * devicePixelRatio, y * devicePixelRatio, width * devicePixelRatio, height * devicePixelRatio);
        ctx.fillStyle = style;
        ctx.fill();
    }

    initCanvas() {
        const canvas : any = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.setState({
            canvas,
            ctx
        })
        return {
            canvas,
            ctx
        }
    }

    async draw(options: Array<any>) {
        const { canvas, ctx } = this.initCanvas();
        canvas.width = 750 / 2 * devicePixelRatio;
        canvas.height = (1124 + 210) / 2 * devicePixelRatio;

        if (options.length) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(let i = 0, len = options.length; i < len; i++) {
                const option = options[i];
                switch(option.type) {
                    case 'image':
                        await this.drawImage(option, ctx)
                        break;
                    case 'text':
                        this.drawText(option, ctx);
                        break;
                    case 'fill':
                        this.drawFill(option, ctx);
                        break;
                }
            }
        }
    }

    toDataURL() {
        const { canvas } = this.state;
        const img = canvas.toDataURL('image/jpeg', 0.92);
        this.props.onOutput(img);
        return img;
    }

    componentDidMount() {
        this.draw(this.props.options);
    }

    render() {
        let classNames = this.props.className ? this.props.className.split(' ') : [];
        classNames.push(styles.canvas);
        const className = classNames.join(' ');
        return (
            <canvas ref="canvas" className={ className }></canvas>
        )
    }
}