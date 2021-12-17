export function getTime() {
  let date = new Date();
  let now_time =
    date.getFullYear() +
    "-" +
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return now_time;
}
export const tipsStrArr:any = {
  12: "干饭人，干饭魂，干饭的都是人上人！病从口入，记得少食荤腥，多食蔬果别挑食。",
  18: "别写了，该下班了！抵制996，从你我做起！"
};
