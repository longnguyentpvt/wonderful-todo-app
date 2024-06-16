export const sleep = async (ms: number): Promise<void> => new Promise(
  (resolve: ((value: void | PromiseLike<void>) => void)) => {
    setTimeout(resolve, ms);
  }
);
