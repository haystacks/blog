module.exports = (api, options = {}) => {
    api.registerPlugin({
        id: 'cool:antd',
        apply: require('umi-plugin-react/lib/plugins/antd').default,
        opts: options.antd
    });

    api.registerPlugin({
        id: 'cool:dva',
        apply: require('umi-plugin-react/lib/plugins/dva').default,
        opts: options.dva
    });
};
