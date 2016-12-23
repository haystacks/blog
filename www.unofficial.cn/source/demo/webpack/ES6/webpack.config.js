module.exports = {
    "entry": "./example1.1.js",
    "output": {
        "filename": "bundle1.2.js"
    },
    "module": {
        "loaders": [{
            "test": "/\.js&/",
            "loader": "babel-loader"
        }]
    }
}