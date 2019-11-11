```javascript
function decodeUriCode(code) {
    let jsLines, htmlLines;
    const parts = decodeURIComponent(code).split('!!!');
    // javascript [0]
    try {
        jsLines = atob(parts[0]).split('\n');
    } catch(e) {
        jsLines = [];
    }

    // html [1]
    try {
        htmlLines = atob(parts[1]).split('\n');
    } catch(e) {
        htmlLines = [];
    }
    return {
        js: jsLines,
        html: htmlLines
    };
}
```