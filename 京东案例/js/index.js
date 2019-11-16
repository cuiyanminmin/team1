// 轮播图
var $swip = $('.swipper'),
    $imgBox = $('.swipper .img_box'),
    $tipBox = $('.tipBox'),
    $lis = $('.img_box li'),
    $tips = $('.tip'),
    $leftBtn = $('.left_btn'),
    $rightBtn = $('.right_btn');

let n = 0,
    timer11 = null;

function getData() {
    $.ajax({
        url: './data.json',
        success: function (data) {
            render(data);
            init();
            tipClick();
        }
    })
}
getData();

function render(ary) {
    let str = '';
    let tipStr = '';
    ary.forEach((item, index) => {
        str += `<li><img src="${item.img}" alt=""></li>`
        tipStr += (index == 0 ? `<span class="tip current"></span>` : `<span class="tip"></span>`)
    })
    $imgBox.html(str);
    $tipBox.html(tipStr);
}

function init() {
    $lis = $('.img_box li');
    $tips = $('.tip');
    $lis.eq(0).siblings().hide();
    autoMove();
}

function autoMove() {
    timer11 = setInterval(() => {
        move();
    }, 2000)
}

function move() {
    n++;
    if (n >= $lis.length) {
        n = 0;
    };
    autoFocus();
    $lis.eq(n).css({
        opacity: 0
    }).show().animate({
        opacity: 1
    }, 300).siblings().animate({
        opacity: 0
    }, 300, function () {
        $lis.eq(n).siblings().hide();
    })
}

function autoFocus() {
    $tips.eq(n).addClass('current').siblings().removeClass('current');
}


$swip.on('mouseenter', function () {
    clearInterval(timer11);
})
$swip.on('mouseleave', function () {
    autoMove();
})
$rightBtn.on('click', _.throttle(function () {
    move();
}, 500))
$leftBtn.on('click', _.throttle(function () {
    n--;
    if (n < 0) {
        n = $lis.length - 1;
    }
    n--;
    move();
}, 500))

function tipClick() {
    $tips.on('click', function () {
        let index = $(this).index();
        n = index;
        n--;
        move();
    })
}


// 跑马灯
var box = document.querySelector('.paomadeng'),
    ul = box.getElementsByTagName('ul')[0];
ul.innerHTML += ul.innerHTML;
ul.style.width = '1980px';
let timer1 = null;

function move1() {
    timer1 = setInterval(() => {
        if (box.scrollLeft >= 990) {
            box.scrollLeft = 0;
        }
        box.scrollLeft += 1;
    }, 10)
};
move1();
box.onmouseenter = function () {
    clearInterval(timer1);
}
box.onmouseleave = function () {
    move1();
}

// 回到顶部
var Rnav = document.querySelector('.Rnav');
var top1 = Rnav.querySelector('.top');
var winH = document.documentElement.clientHeight;
window.onscroll = function () {
    var scrH = document.documentElement.scrollTop;
    if (scrH > winH) {
        Rnav.style.display = 'block';
    } else {
        Rnav.style.display = 'none';
    }
}
var timer2 = null;
top1.onclick = function () {
    timer2 = window.setInterval(() => {
        if (document.documentElement.scrollTop == 0) {
            clearInterval(timer2);
            return;
        }
        document.documentElement.scrollTop -= 10
    }, 5)
}




// 倒计时抢购
// new Date()  获取客户端benediction当前时间(不能拿它作重要依据，因为用户可以随意修改)
/* 
    倒计时抢购需要从服务器获取当前时间  AJAX
    问题：  时间差(从服务器把时间给客户端，到客户端 获取这个到这个信息，中间经历的时间是时间差，为时间差是不可避免的，我们尽可能减少这个误差)
    从响应头获取时间(AJAX异步)
    基于HEAD请求(只获取响应头信息)
*/
let deathtime = document.querySelector('.death_time .time');
let target = new Date('2019/11/11 00:00:00'),
    now = null,
    timer5 = null;
// 从服务器获取时间  获取到时间后再做其他的事情
function func(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('HEAD', './data.json', true);
    xhr.onreadystatechange = function () {
        if (!/^(2|3)\d{2}$/.test(xhr.status)) return;
        if (xhr.readyState === 2) {
            now = new Date(xhr.getResponseHeader('Date'));
            callback && callback();
        }
    }
    xhr.send(null);
}
// 开启倒计时模式
function computed() {
    let spanTime = target - now;
    if (spanTime <= 0) {
        // 到抢购时间，结束定时器
        clearInterval(timer);
        timer5 = null;
        deathtime.innerHTML = '开抢~~';
        return;
    }
    let hours = Math.floor(spanTime / (60 * 60 * 1000));
    spanTime -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(spanTime / (60 * 1000));
    spanTime -= minutes * 60 * 1000;
    let seconds = Math.floor(spanTime / 1000);
    deathtime.innerHTML =
        `${hours<10?'0'+hours:hours} : ${minutes<10?'0'+minutes:minutes} : ${seconds<10?'0'+seconds:seconds}`;
    // 每一次计算完 我们需要让 now 在原来的基础上加上一秒(第一次从服务器获取到时间，后期直接基于这个时间自己减即可，不要每隔一秒重新从服务器拿)
    now = new Date(now.getTime() + 1000);
}
func(() => {
    // 已经从服务器获取时间了
    computed();
    timer5 = setInterval(computed, 1000);
})

// 顶部图片
var ding = document.querySelector('.ding'),
    btn1 = ding.querySelector('.guan');
btn1.onclick = function () {
    ding.style.display = 'none';
}


// 找相似
function si() {
    $oLis = $('.main li'),
        $mas = $('.main li a .mask'),
        $cha = $('.main li a .mask .cha');
    console.log($oLis);
    $oLis.on('mouseenter', function () {
        let n = $(this).index();
        $mas.eq(n).addClass('mas').siblings().removeClass('mas');
        $cha.on('click', function () {
            $mas.eq(n).removeClass('mas')
        })
    })
    $oLis.on('mouseleave', function () {
        let n = $(this).index();
        $mas.eq(n).removeClass('mas').siblings().addClass('mas');
    })
}
si();


// 选项卡