$(function() {

    //初始化页面数据
    shipin();//显示视频栏
    $('#zx').css('display','none');//咨询栏隐藏

    //头部导航条选中效果
    $('#navTop span').eq(0).css('color','black');

    //点击导航条渲染内容
    $('#navTop span').click( function(){
        //导航栏选中效果
        $(this).addClass('line').siblings().removeClass('line');
        $(this).css('color','black').siblings().css('color','#999');
        //$('div').css('display','none').eq($(this).index()).css('display','block');显示某一个div

        //传入点击的标签下标，渲染某个内容
        if($(this).index()==0) {//获取点击标签的下标，判断渲染哪个内容
            $('#zx').css('display','none');//咨询栏隐藏
            $('#message').css('display','block');//视频栏显示
            shipin();//渲染视频信息
        }else {
            $('#message').css('display','none');//视频栏隐藏
            $('#zx').css('display','block');//咨询栏显示
            zx();//渲染咨询信息
        }
    });


//获取视频数据
    function shipin() {
        var url = 'http://81.71.65.4:3008/video/list';
        axios.get(url)
            .then(res => {
                var info = res.data.data;
                var li = '';
                $(info).each(function (index, item) { 
                    li += `
                        <a href="${item.videoUrl}">
                        <div class="pr">
                        <img src="${item.imgUrl}" alt="">
                        <span class="textmessage">${item.title}</span>
                        <span class="iconfont">&#xea6e;</span>
                        </div>
                        <div class="dflex">
                        <div class="left">
                            <img src="${item.avatarurl}" alt="">
                            <span class="ml10 c9">${item.nickName}</span>
                        </div>
                        <div class="right">
                            <div>
                                <span class="iconfont">&#xec7f;</span><span class="ml5">${item.upCount}</span>
                            </div>
                            <div>
                                <span class="iconfont">&#xe763;</span><span class="ml5">${item.commentCount}</span>
                            </div>
                            <div>
                                <span class="iconfont">&#xe63d;</span>
                            </div>
                        </div>
                        </div>
                        </a>
                    ` 
                });
                $('#message').html(li);
            })
            .catch(err => {
            console.error(err); 
        });
    }


//获取资讯数据
    function zx() {
        var url = 'http://81.71.65.4:3008/info/list';
        axios.get(url)
        .then(res => {
        var info = res.data.data;
        var li = '';
        $(info).each(function (index, item) { 
            li += `
                <li>
                    <div class="txt">
                        <h3>${item.title}</h3>
                        <h4>${item.desc}</h4>
                    </div>
                    <div class="zxImg"><img src="${item.imgUrl}" alt=""></div>
                </li>
            ` 
        });
        $('#zx').html(li);
    })
    .catch(err => {
        console.error(err); 
    });






}


















})