~function(e) {
    "use strict";
    function t(e, t) {
        var n = (65535 & e) + (65535 & t)
          , i = (e >> 16) + (t >> 16) + (n >> 16);
        return i << 16 | 65535 & n;
    }
    function n(e, t) {
        return e << t | e >>> 32 - t;
    }
    function i(e, i, o, r, s, a) {
        return t(n(t(t(i, e), t(r, a)), s), o);
    }
    function o(e, t, n, o, r, s, a) {
        return i(t & n | ~t & o, e, t, r, s, a);
    }
    function r(e, t, n, o, r, s, a) {
        return i(t & o | n & ~o, e, t, r, s, a);
    }
    function s(e, t, n, o, r, s, a) {
        return i(t ^ n ^ o, e, t, r, s, a);
    }
    function a(e, t, n, o, r, s, a) {
        return i(n ^ (t | ~o), e, t, r, s, a);
    }
    function c(e, n) {
        e[n >> 5] |= 128 << n % 32,
        e[(n + 64 >>> 9 << 4) + 14] = n;
        var i, c, _, l, u, d = 1732584193, p = -271733879, g = -1732584194, f = 271733878;
        for (i = 0; i < e.length; i += 16)
            c = d,
            _ = p,
            l = g,
            u = f,
            d = o(d, p, g, f, e[i], 7, -680876936),
            f = o(f, d, p, g, e[i + 1], 12, -389564586),
            g = o(g, f, d, p, e[i + 2], 17, 606105819),
            p = o(p, g, f, d, e[i + 3], 22, -1044525330),
            d = o(d, p, g, f, e[i + 4], 7, -176418897),
            f = o(f, d, p, g, e[i + 5], 12, 1200080426),
            g = o(g, f, d, p, e[i + 6], 17, -1473231341),
            p = o(p, g, f, d, e[i + 7], 22, -45705983),
            d = o(d, p, g, f, e[i + 8], 7, 1770035416),
            f = o(f, d, p, g, e[i + 9], 12, -1958414417),
            g = o(g, f, d, p, e[i + 10], 17, -42063),
            p = o(p, g, f, d, e[i + 11], 22, -1990404162),
            d = o(d, p, g, f, e[i + 12], 7, 1804603682),
            f = o(f, d, p, g, e[i + 13], 12, -40341101),
            g = o(g, f, d, p, e[i + 14], 17, -1502002290),
            p = o(p, g, f, d, e[i + 15], 22, 1236535329),
            d = r(d, p, g, f, e[i + 1], 5, -165796510),
            f = r(f, d, p, g, e[i + 6], 9, -1069501632),
            g = r(g, f, d, p, e[i + 11], 14, 643717713),
            p = r(p, g, f, d, e[i], 20, -373897302),
            d = r(d, p, g, f, e[i + 5], 5, -701558691),
            f = r(f, d, p, g, e[i + 10], 9, 38016083),
            g = r(g, f, d, p, e[i + 15], 14, -660478335),
            p = r(p, g, f, d, e[i + 4], 20, -405537848),
            d = r(d, p, g, f, e[i + 9], 5, 568446438),
            f = r(f, d, p, g, e[i + 14], 9, -1019803690),
            g = r(g, f, d, p, e[i + 3], 14, -187363961),
            p = r(p, g, f, d, e[i + 8], 20, 1163531501),
            d = r(d, p, g, f, e[i + 13], 5, -1444681467),
            f = r(f, d, p, g, e[i + 2], 9, -51403784),
            g = r(g, f, d, p, e[i + 7], 14, 1735328473),
            p = r(p, g, f, d, e[i + 12], 20, -1926607734),
            d = s(d, p, g, f, e[i + 5], 4, -378558),
            f = s(f, d, p, g, e[i + 8], 11, -2022574463),
            g = s(g, f, d, p, e[i + 11], 16, 1839030562),
            p = s(p, g, f, d, e[i + 14], 23, -35309556),
            d = s(d, p, g, f, e[i + 1], 4, -1530992060),
            f = s(f, d, p, g, e[i + 4], 11, 1272893353),
            g = s(g, f, d, p, e[i + 7], 16, -155497632),
            p = s(p, g, f, d, e[i + 10], 23, -1094730640),
            d = s(d, p, g, f, e[i + 13], 4, 681279174),
            f = s(f, d, p, g, e[i], 11, -358537222),
            g = s(g, f, d, p, e[i + 3], 16, -722521979),
            p = s(p, g, f, d, e[i + 6], 23, 76029189),
            d = s(d, p, g, f, e[i + 9], 4, -640364487),
            f = s(f, d, p, g, e[i + 12], 11, -421815835),
            g = s(g, f, d, p, e[i + 15], 16, 530742520),
            p = s(p, g, f, d, e[i + 2], 23, -995338651),
            d = a(d, p, g, f, e[i], 6, -198630844),
            f = a(f, d, p, g, e[i + 7], 10, 1126891415),
            g = a(g, f, d, p, e[i + 14], 15, -1416354905),
            p = a(p, g, f, d, e[i + 5], 21, -57434055),
            d = a(d, p, g, f, e[i + 12], 6, 1700485571),
            f = a(f, d, p, g, e[i + 3], 10, -1894986606),
            g = a(g, f, d, p, e[i + 10], 15, -1051523),
            p = a(p, g, f, d, e[i + 1], 21, -2054922799),
            d = a(d, p, g, f, e[i + 8], 6, 1873313359),
            f = a(f, d, p, g, e[i + 15], 10, -30611744),
            g = a(g, f, d, p, e[i + 6], 15, -1560198380),
            p = a(p, g, f, d, e[i + 13], 21, 1309151649),
            d = a(d, p, g, f, e[i + 4], 6, -145523070),
            f = a(f, d, p, g, e[i + 11], 10, -1120210379),
            g = a(g, f, d, p, e[i + 2], 15, 718787259),
            p = a(p, g, f, d, e[i + 9], 21, -343485551),
            d = t(d, c),
            p = t(p, _),
            g = t(g, l),
            f = t(f, u);
        return [d, p, g, f];
    }
    function _(e) {
        var t, n = "";
        for (t = 0; t < 32 * e.length; t += 8)
            n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n;
    }
    function l(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0,
        t = 0; t < n.length; t += 1)
            n[t] = 0;
        for (t = 0; t < 8 * e.length; t += 8)
            n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n;
    }
    function u(e) {
        return _(c(l(e), 8 * e.length));
    }
    function d(e, t) {
        var n, i, o = l(e), r = [], s = [];
        for (r[15] = s[15] = void 0,
        o.length > 16 && (o = c(o, 8 * e.length)),
        n = 0; 16 > n; n += 1)
            r[n] = 909522486 ^ o[n],
            s[n] = 1549556828 ^ o[n];
        return i = c(r.concat(l(t)), 512 + 8 * t.length),
        _(c(s.concat(i), 640));
    }
    function p(e) {
        var t, n, i = "0123456789abcdef", o = "";
        for (n = 0; n < e.length; n += 1)
            t = e.charCodeAt(n),
            o += i.charAt(t >>> 4 & 15) + i.charAt(15 & t);
        return o;
    }
    function g(e) {
        return unescape(encodeURIComponent(e));
    }
    function f(e) {
        return u(g(e));
    }
    function m(e) {
        return p(f(e));
    }
    function k(e, t) {
        return d(g(e), g(t));
    }
    function h(e, t) {
        return p(k(e, t));
    }
    e.md5 = function(e, t, n) {
        return t ? n ? k(t, e) : h(t, e) : n ? f(e) : m(e);
    }
    ;
}("function" == typeof jQuery ? jQuery : this)