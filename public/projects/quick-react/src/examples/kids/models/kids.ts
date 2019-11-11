export default {
    namespace: 'Kid',
    state: {
        info: {}
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        }
    },
    effects: {
        *fetchSearch({ payload = {} }, { put, select }) {
            const kids = fetch(
                'http://kids.lqjydsj.cn/bm/api/gateway/bm/ISignupQuotaApi_query',
                {
                    referrer:
                        'http://kids.lqjydsj.cn/bm/index/bm_form?signupNoticeId=05af476d-c327-4e22-b2ad-9b1f91277fad',
                    body:
                        '{"body":{"day":"","month":"06","signupNoticeId":"05af476d-c327-4e22-b2ad-9b1f91277fad","schoolId":"25","streetCode":"","year":"2019"}}',
                    method: 'POST',
                    mode: 'cors'
                }
            );
            kids.then(num => num.json())
                .then(num => num.data.reduce((i, item) => i + item.hasNum, 0))
                .then(num => console.log(num));
        }
    }
};
