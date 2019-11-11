{
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    test('Array.copyWithin', () => {
        expect(arr.copyWithin(2)).toBe(arr);
    })
}