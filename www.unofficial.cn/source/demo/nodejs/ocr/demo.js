const Tesseract = require('tesseract.js');
Tesseract.recognize('./api.png').then((result) => {
    console.log(result);
})