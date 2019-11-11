import React, { Component } from 'react';
const styles = require('./compress.module.styl');

export default class Compress extends Component {

    compress(img: string, orientation: number) {
        const canvas: any = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = img;
            image.onload = () => {
                const originWidth =  image.width,
                    originHeight = image.height,
                    maxWidth = 750,
                    maxHeight = 1334;

                let targetWidth = originWidth,
                    targetHeight = originHeight;
                if(originWidth > maxWidth || originHeight > maxHeight) {
                    if(originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                ctx.clearRect(0, 0, targetWidth, targetHeight);
                if(orientation && orientation != 1){
                    switch(orientation){
                        case 6:     // 旋转90度
                            canvas.width = targetHeight;    
                            canvas.height = targetWidth;    
                            ctx.rotate(Math.PI / 2);
                            // (0,-targetHeight) 从旋转原理图那里获得的起始点
                            ctx.drawImage(image, 0, -targetHeight, targetWidth, targetHeight);
                            break;
                        case 3:     // 旋转180度
                            ctx.rotate(Math.PI);    
                            ctx.drawImage(image, -targetWidth, -targetHeight, targetWidth, targetHeight);
                            break;
                        case 8:     // 旋转-90度
                            canvas.width = targetHeight;    
                            canvas.height = targetWidth;    
                            ctx.rotate(3 * Math.PI / 2);    
                            ctx.drawImage(image, -targetWidth, 0, targetWidth, targetHeight);
                            break;
                    }
                } else {
                    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
                }
                resolve(canvas.toDataURL('image/jpeg')); // GET 可以两个参数 控制压缩比
            }
            image.onerror = () => {
                reject();
            }
        })
    }

    render() {
        return (
            <>
                <canvas className={ styles.canvas } ref='canvas'></canvas>
            </>
        )
    }
}