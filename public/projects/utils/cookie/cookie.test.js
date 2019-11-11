import cookie from './cookie';

// 因为 page.cookies != document.cookie，所以这里使用了 mocks client 来模拟 document。
// describe('Baidu', () => {
//     beforeAll(async () => {
//         await page.goto('https://www.baidu.com');
//     });

//     it('should be titled "百度一下，你就知道"', async () => {
//         await expect(page.title()).resolves.toMatch('百度一下，你就知道');
//     });
// });

test('cookie', () => {
    expect(cookie.get('a')).toBeUndefined();
    cookie.set('a', 123);
    expect(cookie.get('a')).toBe(123);
    expect(cookie.keys()).toContain('a');
    expect(cookie.has('a')).toBeTruthy();
    expect(cookie.has('b')).toBeFalsy();
    expect(cookie.delete('a')).toBeTruthy();
    expect(cookie.has('a')).toBeFalsy();
})