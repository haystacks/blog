const eles = document.getElementsByTagName('input');
const res = document.getElementById('result');
const eleArr = Array.prototype.slice.call(eles);

function changeHandle() {
    const vals = eleArr.map(ele => ele.value); // Array.from(eles); // [...eles]
    this.postMessage(vals);
}

if (Worker) {
    const worker = new Worker('worker.js');
    eleArr.forEach((ele, index) => {
        ele.onchange = changeHandle.bind(worker);
    })
    worker.onmessage = e => {
        res.innerText = e.data;
    }
    // 初始化一次结果
    changeHandle.call(worker);
} else {
    console.warn('Your browser doesn\'t support web workers');
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers