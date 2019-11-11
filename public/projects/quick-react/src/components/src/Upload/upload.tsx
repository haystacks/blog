import React, { Component } from "react";
import Thumbnail from "./thumbnail";
import styles from "./upload.module.styl";

export default class Upload extends Component<UploadProps, UploadState> {
  /**
   * 提交上传文件或者本地预览文件
   */
  post = file => {
    const { onChange, action } = this.props;
    if (action) {
      // upload then return remote origin url
    } else {
      // return local origin url
    }
    const url = ""; // local url or remote url
    this.refs.thumb.getImageOrientation(file).then(orientation => {
      console.log(orientation);
    });
    onChange && onChange(file, url);
  };

  /**
   *上传文件前预检文件
   */
  upload = file => {
    const { beforeUpload } = this.props;
    if (!beforeUpload) {
      this.post(file);
    }
    const needUpload = beforeUpload(file);
    if (needUpload) {
      this.post(file);
    }
    this.post(file);
  };

  /**
   * 遍历文件对象依次上传文件
   */
  uploadFiles = files => {
    files = Array.prototype.slice.call(files);
    files.forEach(file => {
      this.upload(file);
    });
  };

  /**
   * 选择文件
   */
  onChange = e => {
    const files = e.target.files;
    this.uploadFiles(files);
  };

  render() {
    const { accept, multiple } = this.props;
    return (
      <>
        <input
          type="file"
          className={styles.input}
          accept={accept}
          multiple={multiple}
          onChange={this.onChange}
        />
        <Thumbnail ref="thumb" />
      </>
    );
  }
}
