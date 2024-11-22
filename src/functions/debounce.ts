import { Callback } from './types';

/** debounce
 * 函数防抖
 * 防抖函数用于限制函数的执行频率，当频繁触发某个函数时，希望它在一段时间内只执行一次
 * 如果在等待时间内再次被调用，之前的时间将被重置
 *
 * @param callback 原始函数，需要进行防抖处理的回调函数
 * @param wait 等待时间，防抖函数执行的间隔时间，单位为毫秒
 * @param immediate 是否立即执行，如果设置为true，那么在等待时间结束后，变化量会立即调用callback函数
 * @returns 返回一个新的防抖函数
 */
export function debounce(
  callback: Callback,
  wait: number,
  immediate = false,
): Callback {
  // 定义一个定时器变量，用于存储防抖函数的定时器ID
  let timer: NodeJS.Timeout | null = null;

  // 返回一个新的函数，该函数将根据防抖逻辑调用原始函数
  return function (...args: any[]) {
    // 定义一个函数，用于在等待时间结束后执行原始函数或清除定时器
    const later = () => {
      timer = null;
      if (!immediate) {
        return callback.apply(null, args);
      }
    };

    // 判断是否需要立即调用原始函数
    const callNow = immediate && !timer;

    // 如果已经存在一个定时器，那么清除它，因为我们需要重新计算等待时间
    if (timer) {
      clearTimeout(timer);
    }

    // 设置一个新的定时器，用于在等待时间结束后调用later函数
    timer = setTimeout(later, wait);

    // 如果需要立即调用原始函数，则执行
    if (callNow) {
      return callback.apply(null, args);
    }
  };
}
