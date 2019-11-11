// https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
importScripts(); // 同步引入js脚本
onmessage = e => {
    const v = e.data.reduce((total, v) => total + Number(v), 0);
    postMessage(v);
}

// sub worker
const subworker = new Worker('subworker.js');
subworker.postMessage('sub worker');
// subworker.terminate();