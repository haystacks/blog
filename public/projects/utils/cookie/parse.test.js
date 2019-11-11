import parse, { iquery, icookie } from './parse';

test('parse url query', () => {
    expect(parse('a=123&b=456', '&')).toMatchObject({a:"123", b:"456"});
})

test('parse url query', () => {
    expect(iquery('a%3D%E6%88%91%E7%9A%84%E5%A4%A9%E5%91%80%EF%BC%81%26b%3D%E6%98%AF%20%E5%90%97')).toMatchObject({a:"我的天呀！", b:"是 吗"});
})

test('parse cookie', () => {
    expect(parse('a=123; b=456', '; ')).toMatchObject({a:"123", b:"456"});
})

test('parse cookie', () => {
    expect(icookie('a=123; b=%E4%B8%AD%E6%96%87')).toMatchObject({a:"123", b:"中文"});
})