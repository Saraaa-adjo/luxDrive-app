const subscribers = new Set();

export const subscribe = (callback) => subscribers.add(callback);
export const unsubscribe = (callback) => subscribers.delete(callback);
export const notify = (event, data) => subscribers.forEach(cb => cb(event, data));