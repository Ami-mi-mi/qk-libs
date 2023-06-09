/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 15:02:01
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-24 15:46:46
 */
import './global.less';
import { canUseDom } from '../utils/can-use-dom';

if (canUseDom) {
  // Make sure the `:active` CSS selector of `button` and `a` take effect
  // See: https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
  document.addEventListener('touchstart', () => {}, true);
}

// Only for debugging. Must COMMENT this line before commit:
// import './css-vars-patch.less'
