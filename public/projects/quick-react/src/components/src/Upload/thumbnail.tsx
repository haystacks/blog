import React, { Component } from "react";
import styles from "./thumbnail.module.styl";

export default class Thumbnail extends Component {
  /**
   * 压缩原图
   * @param img 原图地址
   * @param maxWidth 最大宽度
   * @param maxHeight 最大高度
   */
  compress(img: string, maxWidth: number, maxHeight: number) {
    maxWidth = maxWidth || 750;
    maxHeight = maxHeight || 1334;
    const canvas: any = this.refs.canvas;
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = img;
      image.onload = () => {
        this.resize(image, canvas, maxWidth, maxHeight);
        resolve(canvas.toDataURL("image/jpeg")); // GET 可以两个参数 控制压缩比
      };
      image.onerror = () => {
        reject("[image onerror] compress error!");
      };
    });
  }

  /**
   * 原图实际大小按照最大宽高进行缩放得到压缩后的尺寸
   * @param image 图片元素
   * @param canvas 画布元素
   * @param maxWidth 最大宽度
   * @param maxHeight 最大高度
   */
  resize(image, canvas, maxWidth, maxHeight) {
    const originWidth = image.width,
      originHeight = image.height;

    let targetWidth = originWidth,
      targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
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
    this.rotate(canvas, targetWidth, targetHeight);
  }

  /**
   * 旋转原图绘制到画布上
   * @param canvas 画布
   * @param targetWidth 图片压缩后宽度
   * @param targetHeight 图片压缩后高度
   */
  rotate(image, canvas, targetWidth, targetHeight) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, targetWidth, targetHeight);
    const orientation = this.getImageOrientation();
    if (orientation && orientation != 1) {
      switch (orientation) {
        case 6: // 旋转90度
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          ctx.rotate(Math.PI / 2);
          // (0,-targetHeight) 从旋转原理图那里获得的起始点
          ctx.drawImage(image, 0, -targetHeight, targetWidth, targetHeight);
          break;
        case 3: // 旋转180度
          ctx.rotate(Math.PI);
          ctx.drawImage(
            image,
            -targetWidth,
            -targetHeight,
            targetWidth,
            targetHeight
          );
          break;
        case 8: // 旋转-90度
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          ctx.rotate((3 * Math.PI) / 2);
          ctx.drawImage(image, -targetWidth, 0, targetWidth, targetHeight);
          break;
      }
    } else {
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    }
  }

  /**
   * 获取图片预设方向
   * @param file 文件对象
   * @return promise 回调预设方向
   */
  getImageOrientation(file: File) {
    const reader = new FileReader();
    const p = {
      resolve: "",
      reject: "",
      promise: ""
    };
    p.promise = new Promise((resolve, reject) => {
      p.resolve = resolve;
      p.reject = reject;
    });
    reader.onload = e => {
      const view = new DataView(e.target.result);
      if (view.getUint16(0, false) !== 0xffd8) {
        // not jpeg
        p.resolve(-2);
      }
      const length = view.byteLength;
      let offset = 2;
      while (offset < length) {
        // not defined
        if (view.getUint16(offset + 2, false) <= 8) p.resolve(-1);
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xffe1) {
          if (view.getUint32((offset += 2), false) !== 0x45786966) {
            // not defined
            p.resolve(-1);
          }

          const little = view.getUint16((offset += 6), false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) === 0x0112) {
              // orientation
              p.resolve(view.getUint16(offset + i * 12 + 8, little));
            }
          }
        } else if ((marker & 0xff00) !== 0xff00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      // not defined
      p.resolve(-1);
    };
    reader.readAsArrayBuffer(file);
    return p.promise;
  }

  render() {
    return (
      <>
        <canvas className={styles.canvas} ref="canvas" />
      </>
    );
  }
}
