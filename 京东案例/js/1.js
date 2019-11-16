let target = new Date('2019/11/11 00:00:00'),
    now = null,
    time = null;

function func(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('head', './data.json', true);
    xhr.onreadystatechange = function () {
        if (!/^(2|3)\d{2}$/.test(xhr.status)) return;
        if (xhr.readyStatus === 2) {
            now = new Date(xhr.getResponseHeader('Date'));
            callback && callback();
        }
    }
    xhr.send();
}

function computed() {
    let spanTime = target - now;
    if (spanTime <= 0) {
        clearInterval(timer);
        timer = null;
        box.innerHTML = '开枪了~~';
        return;
    }
    let hours = Math.floor(spanTime / (60 * 60 * 1000));
    spanTime -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(spanTime / (60 * 1000));
    spanTime -= minutes * 60 * 1000;
    let seconds = Math.floor(spanTime / 1000);
    box.innerHTML = `${hours<10?'0'+hours:hours} : ${minutes<10?'0'+minutes:minutes} : ${seconds<10?'0'+seconds:seconds}`;
    now = new Date(now.getTime() + 1000);
}
func(() => {
    computed();
    time = setInterval(computed, 1000)
})