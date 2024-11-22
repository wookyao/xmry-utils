import { debounce, throttle } from '..';

function callback4Bind() {
  // @ts-ignore
  return this.a;
}

jest.useFakeTimers();

describe('debounce', () => {
  it('should call the function after the specified wait time', () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 100);

    debounced();
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the function again if invoked repeatedly within the wait time', () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 100);

    debounced();
    jest.advanceTimersByTime(50);
    debounced();
    jest.advanceTimersByTime(50);
    debounced();
    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should support immediate mode and call the function immediately', () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 100, true);

    debounced();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1); // No additional calls
  });

  it('should bind the correct context', () => {
    const debounced = debounce(callback4Bind.bind({ a: 42 }), 100, true);
    const result = debounced();
    expect(result).toBe(42);
  });
});

describe('throttle', () => {
  it('should call the function immediately in immediate mode', () => {
    const callback = jest.fn();
    const throttled = throttle(callback, 100, true);

    throttled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(50);
    throttled();
    expect(callback).toHaveBeenCalledTimes(1); // No additional calls
  });

  it('should call the function at most once in the specified wait time', () => {
    const callback = jest.fn();
    const throttled = throttle(callback, 100);

    for (let i = 0; i < 100000; i++) {
      throttled();
    }

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
