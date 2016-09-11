/**
 * 格式化年月日
 * @param 年份year 闰年366 | 平年365
 * @param [1, 3, 5, 7, 8, 10, 12] 31天 | [4, 6, 9, 11] 30天 | 闰二月 29天 | 平二月 28天
 */

//
// 公历闰年判断(0 < year < 3200 )
//
function isLeapYear(year) {
    return year % 400 === 0 || ( year % 100 !== 0 && year % 4 === 0 );
}

//
// 闰月
//
function isLeapMonth(year) {
    return isLeapYear(year);
}

//
// 二月天数 February
//
function getFebDays(year) {
    return isLeapMonth(year) ? 29 : 28;
}

//
// 天数
//
function getDays(year) {
    return [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}