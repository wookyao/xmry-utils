import { Callback } from './types';

/** throttle
 * 创建一个节流函数，用于限制函数的执行频率。
 * 节流函数确保在指定的时间间隔内最多只执行一次给定的回调函数。
 * 这在处理高频触发的事件（如窗口调整大小、滚动或鼠标移动）时非常有用。
 *
 * @param callback 回调函数，当节流时间间隔结束时将被调用。
 * @param wait 指定的时间间隔，单位为毫秒，在此期间内回调函数最多只执行一次。
 * @param immediate 如果设置为true，回调函数将在第一次调用时立即执行，而不是等待时间间隔结束。
 * @returns 返回一个新的节流函数，它将在指定的时间间隔内最多调用一次`callback`。
 */
export function throttle(
  callback: Callback,
  wait: number,
  immediate = false,
): Callback {
  let timer: NodeJS.Timeout | null = null;
  let lastCall = 0;

  return function (...args: any[]) {
    const now = Date.now();

    if (immediate && !lastCall) {
      callback.apply(null, args);
      lastCall = now;
    }

    if (!timer) {
      const remaining = wait - (now - lastCall);

      if (remaining <= 0 || remaining > wait) {
        if (!immediate) {
          callback.apply(null, args);
        }
        lastCall = now;
        timer = null;
      } else {
        timer = setTimeout(() => {
          timer = null;
          lastCall = Date.now();
          if (!immediate) {
            callback.apply(null, args);
          }
        }, remaining);
      }
    }
  };
}
