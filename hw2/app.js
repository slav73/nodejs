const express = require("express");
const app = express();
const interval = parseInt(process.env.INTERVAL) || 1000;
const stop = parseInt(process.env.STOP) || 3000;

const curTime = () => {
  return new Date().toUTCString();
};

function setTimer(interval, stop) {
  return new Promise((resolve, reject) => {
    let i = 0;
    let timerId = setInterval(() => {
      if (i >= stop) {
        console.log("Timer stopped at " + curTime());
        clearInterval(timerId);
        return;
      }
      console.log(curTime());
      i += interval;
    }, interval);

    resolve("curTime start!");
    return;
  });
}

app.get("/", (req, res) => {
  setTimer(interval, stop).then(result => {
    console.log("Timer started!");
    res.send(result);
  });
});

app.listen(3000, () => console.log("Listening on port 3000..."));
