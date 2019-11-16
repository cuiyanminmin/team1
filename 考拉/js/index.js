let $div = $('.show_img'),
    $tipBox = $('.tip_box'),
    $lis = $('.show_img img'),
    $tips = $('.tip_box .tip'),
    // $main = $('main'),
    $leftBtn = $('.btn_box .left_btn'),
    $rightBtn = $('.btn_box .right_btn');
let n = 0,
    timer = null;

function getData() {
    $.ajax({
        url: './data.json',
        success: function (data) {
            render(data);
            init();
        }
    })
}
getData();

function render(ary) {
    let str = '';
    ary.forEach((item, index) => {
        str += `<img src="${item.img}" alt="">`
    })
    $div.html(str);

}
function init() {
    $lis = $('.show_img img'); // 更新$lis
    $tips = $('.tip_box .tip')
    $lis.eq(0).siblings().hide();
    autoMove();
}
function autoMove() {
    timer = setInterval(() => {
        move();
    }, 3000)
}
function move() {
    n++;
    if (n >= $lis.length) {
        n = 0;
    }
    autoFocus();
    // $lis.eq(n).show().siblings().hide();
    $lis.eq(n).show().css({opacity:0}).animate({
        opacity: 1
    }, 300, 'linear').siblings().animate({
        opacity: 0
    }, 300,'linear', function () {
        $lis.eq(n).siblings().hide();
    })
}

function autoFocus() {
    $tips.eq(n).addClass('current').siblings().removeClass('current');
}

// $main.on('mouseenter', function () {
//     clearInterval(timer);
// })
// $main.on('mouseleave', function () {
//     autoMove();
// })
$rightBtn.on('click',debounce(function () {
    // debounce(move);
   move();
}))
$leftBtn.on('click', debounce(function () {
    n--;
    if (n < 0) {
        n = $lis.length - 1;
    }
    n--;
    move();
}));
function debounce(fn,wait=300){
    var timer = null;
    return function(){
        console.log(timer ==null)
        if(timer ==null){
            fn.apply(this,arguments);
            timer = 0;
            return ;
        }
        clearTimeout(timer);
        timer = setTimeout(()=>{
             fn.apply(this,arguments)
        },wait)
    }
}