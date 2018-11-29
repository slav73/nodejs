function myPromise(t) {
  return new Promise(r => {
    setTimeout(() => {
      r(t);
    }, t);
  });
}

const arr = [2000, 500, 400].map(i => myPromise(i));

(async () => {
  for await (const v of arr) {
    console.log(v);
  }
})();
