function cutZero(old: string) {
  if (!old || typeof old !== 'string') {
    return old;
  }
  let newstr = old;
  const leng = old.length - old.indexOf('.') - 1;
  if (old.indexOf('.') > -1) {
    for (let i = leng; i > 0; i--) {
      if (
        newstr.lastIndexOf('0') > -1 &&
        newstr.substring(newstr.length - 1, newstr.length) == '0'
      ) {
        const k = newstr.lastIndexOf('0');
        if (newstr.charAt(k - 1) == '.') {
          return newstr.substring(0, k - 1);
        } else {
          newstr = newstr.substring(0, k);
        }
      } else {
        return newstr;
      }
    }
  }
  return old;
}

/**
 * 在输入框中的金额，主要作用是保留小数点的输入
 */
export function moneyInputFormat(val: any): string {
  if (!val) {
    return val;
  }
  let value = val;
  if (typeof val === 'string') {
    value = parseFloat(val);
  }
  if (isNaN(value)) {
    return '';
  }
  const str = `${value.toFixed(2)}`;
  const intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ','); // 取到整数部分
  let dot = str.substring(str.length, str.indexOf('.')); // 取到小数部分搜索
  // if (dot.match('^[\\.0]+$')) {
  //   return intSum;
  // }
  if (!dot.length) {
    return intSum;
  }
  dot = cutZero(dot);
  if (typeof val === 'string' && val.endsWith('.') && val != '.') {
    dot = '.';
  }
  return intSum + dot;
}
