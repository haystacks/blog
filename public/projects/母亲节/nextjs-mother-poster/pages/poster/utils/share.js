import {
    setUpShare,
    setUpShareTimeLine
} from '../../../../../lib/app-utils/wechat';
const setShare = (url, callback) => {
    const title = '我妈年轻时候比我好看多了，我想让你们都看到！';
    const desc = '晒出妈妈芳华美照，为妈妈领取一年期「随身版家庭医生」';
    const link = url;
    const imgUrl = 'https://urine-qiniu-test.doctorwork.com/FtwC8g-iFbCXplngjzaFF6KmXuXG';
    // 发送给朋友
    setTimeout(() => {
        setUpShare({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: () => {
                callback && callback();
                this.gotoHandle();
            }
        });
    }, 2000);
    setTimeout(() => {
        // 分享到朋友圈
        setUpShareTimeLine({
            title, // 分享标题
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success: () => {
                callback && callback();
                this.gotoHandle();
            }
        });
    }, 2000);
};

export default setShare;
