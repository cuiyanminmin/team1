let $ul = $('.focus_left #binner_box .img_box'),
$lis = $('.focus_left #binner_box .img_box li'),
$tipBox = $('.focus_left .tip_box'),
$tips = $('.focus_left .tip_box .tip'),
$box = $('.focus_left'),
$leftBtn = $('.focus_left .btn_box .left_btn'),
$rightBtn = $('.focus_left .btn_box .right_btn');
let n = 0, timer = null;
function getData(){
   $.ajax({
       url:'./data/data1.json',
       success:function(data){
            render(data);
            init();
            event();
            
       }
   }) 
}
getData();
function render(ary){
    let str='';
    let tipStr='';
    ary.forEach((item,index)=>{
        str+=` <li>
                <img src="${item.img}" alt="">
                 </li>`
    tipStr += (index==0)? `<span class="tip current"></span> `:`<span class="tip"></span> `
        $ul.html(str);
        $tipBox.html(tipStr);
    })
    
}
function init(){
    $lis = $('.focus_left #binner_box .img_box li');
    $tips = $('.focus_left .tip_box .tip');
    $lis.eq(0).siblings().hide();
    autoMove()
}
function autoMove(){
    timer = setInterval(()=>{
        move();
    },2000)
}
function move(){
    n++;
    if(n>=$lis.length){
        n=0;
    }
    autoFocus()
    $lis.eq(n).css({opacity:0}).show().animate({opacity:1},300).siblings().animate({opacity:0},300,function(){
        $lis.eq(n).siblings().hide();
    });
}
function autoFocus(){
    $tips.eq(n).addClass('current').siblings().removeClass('current')
}
$leftBtn.on('click',_.throttle(function(){
    n--;
    if(n<0){
        n = $lis.length-1;
    }
    n--;
    move();
},1000))
$rightBtn.on('click',_.throttle(function(){
    move()
},1000))
$box.on('mouseenter',function(){
    clearInterval(timer)
})
$box.on('mouseleave',function(){
    autoMove();
})
function event(){
    $tips.on('mouseenter',function(){
        let index = $(this).index();
        n = index;
        n--;
        move()
    })
}