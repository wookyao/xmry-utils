import { debounce, throttle } from '../dist/index.js';

function callback() {
  console.log('debounced', this);
  return this.a;
}

let count = 0;
function throttleFn() {
  count++;
  console.log('throttled', count);
}

const debounced = debounce(callback.bind({ a: 1 }), 100, true);

const result = debounced();
console.log('🚀 ~ window.addEventListener ~ result=>', result);

const throttled = throttle(throttleFn, 1000);

for (let i = 0; i < 10000; i++) {
  throttled();
}

// throttled();
// throttled();
// throttled();
