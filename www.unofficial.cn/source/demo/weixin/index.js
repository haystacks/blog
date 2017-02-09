/**
 * host => https://mp.weixin.qq.com
 * 
 * n => username
 * o => password
 * a => imgcode
 */

function login(n, o, a) {
    var host = 'https://mp.weixin.qq.com';
    $.post(host + "/cgi-bin/bizlogin?action=startlogin", {
        username: n,
        pwd: $.md5(o.substr(0, 16)),
        imgcode: a,
        f: "json"
    }, function(c) {
        if (0 == c.grey)
            i(n, o, a);
        else {
            switch (c.base_resp.ret + "") {
            case "0":
                if ($.cookie("noticeLoginFlag", 1, {
                    expires: 30
                }),
                r.check.prop("checked") ? $.cookie("remember_acct", n, {
                    expires: 30
                }) : $.removeCookie("remember_acct"),
                /\/cgi-bin\/home\?/.test(c.redirect_url)) {
                    if (window.location.href.indexOf("toUrl=ad") > -1) {
                        var _ = c.redirect_url.match(/token=(\d*)/);
                        _ && _[1] && (c.redirect_url = "/promotion/advertiser_index?lang=zh_CN&token=" + _[1] + "&aSource=" + (window.aSource || ""));
                    }
                } else
                    /\/cgi-bin\/readtemplate\?t=user\/validate_wx_tmpl/.test(c.redirect_url) && window.location.href.indexOf("toUrl=ad") > -1 && (c.redirect_url += "&toUrl=ad&aSource=" + (window.aSource || ""));
                location.href = c.redirect_url;
                break;

            case "-1":
                e("系统错误，请稍候再试。");
                break;

            case "200002":
                e("帐号或密码错误。");
                break;

            case "200007":
                e("您目前处于访问受限状态。");
                break;

            case "200008":
                s = !0,
                $("#verifyDiv").show(),
                r.verify.val("").focus(),
                e("请输入图中的验证码");
                break;

            case "200021":
                e("不存在该帐户。");
                break;

            case "200023":
                r.pwd.focus(),
                e("您输入的帐号或者密码不正确，请重新输入。");
                break;

            case "200025":
                e('海外帐号请在公众平台海外版登录,<a href="http://admin.wechat.com/">点击登录</a>');
                break;

            case "200026":
                e("该公众会议号已经过期，无法再登录使用。");
                break;

            case "200027":
                r.verify.val("").focus(),
                e("您输入的验证码不正确，请重新输入");
                break;

            case "200121":
                e('该帐号属于微信开放平台，请点击<a href="https://open.weixin.qq.com/">此处登录</a>');
                break;

            default:
                e("未知的返回。");
                var l = new Image;
                l.src = "/mp/unknow_ret_report?uin=0&id=64462&key=0&url=" + encodeURIComponent("/cgi-bin/login") + "&location=" + encodeURIComponent(window.location.href) + "&ret=" + c.base_resp.ret + "&method=get&action=report";
            }
            0 != c.base_resp.ret && t();
        }
    });
}

login('******', '******');