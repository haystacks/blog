/*\
|*|
|*|  :: cookies.js ::
|*|
\*/

import { icookie } from './parse';
import { cookiei } from './stringify';

const cookie = (function(cookie) {
    const target = icookie(cookie);
    const handle = {
        get(target, prop) {
            const methods = ['get', 'set', 'has', 'delete', 'keys'];
            if (methods.includes(prop)) {
                let doFunc;
                switch(prop) {
                    case 'get':
                        doFunc = Reflect.get;
                        break;
                    case 'set':
                        doFunc = function() {
                            const bool = Reflect.set(...arguments),
                                  key = arguments[1],
                                  value = arguments[2];
                            
                            if (bool) {
                                let obj = {};
                                obj[key] = value;
                                document.cookie = cookiei(obj);
                            }
                            return bool;
                        };
                        break;
                    case 'has':
                        doFunc = Reflect.has;
                        break;
                    case 'delete':
                        doFunc = function(target, key) {
                            const bool = Reflect.deleteProperty(target, key);
                            if (bool) {
                                let obj = {};
                                obj[key] = '';
                                const str = `${cookiei(obj)}; ${cookiei({
                                    domain: '',
                                    expires: new Date().toGMTString(),
                                    path: '',
                                    secure: ''
                                })}`;
                                document.cookie = str;
                            }
                            return bool;
                        };
                        break;
                    case 'keys':
                        doFunc = Reflect.ownKeys;
                        break;
                }
                return function() {
                    return doFunc(target, ...arguments);
                };
            } else {
                console.warn(`
                    cookie.get(key)
                    cookie.get(key, value)
                    cookie.has(key)
                    cookie.delete(key)
                    cookie.keys()
                `);
            }
        }
    }
    return new Proxy(target, handle);
})(document.cookie)

export default cookie;