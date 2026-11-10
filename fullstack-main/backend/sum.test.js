const sum = require('./sum');

test('összeadja a 2 + 2-t, hogy 4-et kapjunk', () => {
    expect(sum(2, 2)).toBe(4);
});