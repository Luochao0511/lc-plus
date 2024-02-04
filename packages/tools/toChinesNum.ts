
/**
 * 数字转成汉字
 * @param num - 要转换的数字
 * @returns 汉字
 */
export function toChineseNum(num: number): string {
  const changeNum: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit: string[] = ['', '十', '百', '千', '万'];

  const getWan = (temp: number): string => {
    const strArr: string[] = temp.toString().split('').reverse();
    let newNum: string = '';
    const newArr: string[] = [];
    strArr.forEach((item, index) => {
      newArr.unshift(item === '0' ? changeNum[parseInt(item)] : changeNum[parseInt(item)] + unit[index]);
    });
    const numArr: number[] = [];
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n);
    });
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m;
          }
        } else {
          newNum += m;
        }
      });
    } else {
      newNum = newArr[0];
    }
    return newNum;
  };

  const overWan: number = Math.floor(num / 10000);
  let noWan: string | number = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan;
  }

  return overWan ? getWan(overWan) + '万' + getWan(noWan as number) : getWan(num);
}
