function cutZero(old: string) {
  if (typeof old !== 'string') {
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

class FormatUtils {
  /**
   * 转化成number
   */
  public digits(val: any): string {
    if (!val || val.length === 0) {
      return val;
    }
    let result = val + '';
    result = result.replace(/[^0-9]/gi, '');
    return result;
  }
  public money2digits(val: any): string {
    if (!val || val.length === 0) {
      return val;
    }
    let result = val + '';
    // result = result.replace(/,/gi, '');
    result = result.replace(/[^0-9\.]/gi, '');
    return result;
  }
  /**
   * 金额格式化显示
   * @param value
   */
  public money(val: any): string {
    if (!val) {
      return val;
    }
    let value = val;
    if (typeof val === 'string') {
      value = parseFloat(val);
    }
    const str = `${value.toFixed(2)}`;
    const intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, '.'); // 取到整数部分
    let dot = str.substring(str.length, str.indexOf('.')); // 取到小数部分搜索
    if (dot.match('^[\\.0]+$')) {
      return intSum;
    }
    dot = cutZero(dot);
    return intSum + dot;
  }

  /**
   * 日期格式化
   * @param  fmt yyyy-MM-dd hh:mm:ss 和java一样， 默认dd/MM/yyyy
   * @param date
   */
  public date(date: any, fmt = 'yyyy-MM-dd'): string {
    if (!date) {
      return '';
    }
    if (typeof date === 'number') {
      date = new Date(date);
    }
    let ret;
    const opt = {
      'y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'h+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    } as any;
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        );
      }
    }
    return fmt;
  }

  public percent(value: number, decimal = 0) {
    return (value * 100).toFixed(decimal) + '%';
  }

  //还款码取款码格式化
  public code(val: string, prex = 5) {
    if (!val) {
      return val;
    }

    const start = val.slice(0, prex);
    const other = val
      .slice(prex)
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ');

    return start + ' ' + other;
  }

  //账号每2个空一格格式化
  public account(val: string, prex = 2) {
    if (!val) {
      return val;
    }

    const start = val.slice(0, prex);
    const other = val
      .slice(prex)
      .replace(/\s/g, '')
      .replace(/(.{2})/g, '$1 ');

    return start + ' ' + other;
  }

  public formateArrToJson(Arr: any[], key: string) {
    const newData: { [key in string]: any } = {};
    Arr?.forEach((item) => {
      newData[item[key]] = item;
    });

    return newData;
  }

  public getDate(originDate: Date): string {
    const year = originDate.getFullYear();
    const month = originDate.getMonth() + 1;
    const day = originDate.getDate();

    return `${year}-${month}-${day}`;
  }
}

const formatUtils: FormatUtils = new FormatUtils();
export default formatUtils;
