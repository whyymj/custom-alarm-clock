export function sameDayTime(h, m, s, ms) {
    let date = new Date(new Date().setHours(h, m, s, ms)); // // 当天0点
    return date
}
export function yMdhms(y = -1, M = -1, d = -1, h = -1, m = -1, s = -1, ms = -1) {
    y=parseInt(y);
    M=parseInt(M);
    d=parseInt(d);
    h=parseInt(h);
    m=parseInt(m);
    s=parseInt(s);
    ms=parseInt(ms);
    let now = new Date();
    y = y > -1 ? y : now.getFullYear();
    M = M > -1 ? M : now.getMonth() + 1;
    d = d > -1 ? d : now.getDate();
    h = h > -1 ? h : now.getHours();
    m = m > -1 ? m : now.getMinutes();
    s = s > -1 ? s : now.getSeconds();
    ms = ms > -1 ? ms : now.getMilliseconds();
    let date = new Date(`${y}/${M}/${d} ${h}:${m}:${s}:${ms}`);
    return date;
}