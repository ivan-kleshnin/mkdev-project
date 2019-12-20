const TICK_TIME = 200;

export const createTick = () => {
  let callbacks = [];
  let tickCount = 0;
  let timer;

  const startInterval = () => {
    timer = setInterval(() => {
      callbacks.forEach(cb => cb(tickCount++));
    }, TICK_TIME);
  };

  const stopInterval = () => {
    clearInterval(timer);
  };

  return {
    subscribe: fn => {
      callbacks.push(fn);
      if (callbacks.length === 1) {
        startInterval();
      }
    },
    unsubscribe: cb => {
      callbacks = callbacks.filter(fn => fn !== cb);
      if (!callbacks.length) {
        stopInterval();
      }
    },
  };
};
