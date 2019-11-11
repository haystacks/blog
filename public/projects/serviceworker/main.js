if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
            console.log('Service Worker 注册成功');
        })
} else {
    console.log('Your browser doesn\'t support service worker!');
}