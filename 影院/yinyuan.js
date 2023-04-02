$(function(){
 
  //获取某处地址的影院
    function loadYinyuan(className) {
        var url = 'http://81.71.65.4:3008/cinema/list';
        axios.get(url,{params: {'cityName':className}}).then(res => {
           var info = res.data.data;
           var li = '';
           $(info).each(function (index, yinyuan) { 
               var distances = yinyuan.distance;
               distances = distances.toFixed(2);
               li += `
                   <li>
                       <div class="box">
                           <span class="font16">${yinyuan.name}</span>
                           <div class="nrc"><span class="font14 ">¥${yinyuan.lowPrice}&nbsp;</span><span>元起</span></div>
                       </div>
                       <div class="box">
                           <span class="font14">${yinyuan.address}</span>
                           <span class="lc">${distances}km</span>
                       </div>
                       <div class="box1">
                           <div class="bc">退</div>
                           <div class="bc">改签</div>
                           <div class="rc">小吃</div>
                           <div class="rc">折扣卡</div>
                       </div>
                       <div class="box1">
                           <img src="images/car.png" alt=""><span class="fc">开卡特惠，首单1张最高立减4元</span>
                       </div>
                   </li>
                `
           });
           $('#list>ul').html(li);
       }).catch(err => {
           console.error(err); 
       }); 
    }


    //获取地址列表
    $('.ptitle').click(function(e) {
        //链接数据接口
        var url = 'http://81.71.65.4:3008/city/list';
        //get方法加参数方式,{params: {currPage:1}}
        axios.get(url).then(res => {//res返回的是数据和所有请求信息
            var info = res.data.data;//拿到数据那一个对象,在拿到数据信息里的数据data
            //遍历信息插入html
            $('#address>ul').html('');
            $(info).each(function(index, yinyuan) { 
                $('#address>ul').append(`<li class="${yinyuan.name}">${yinyuan.name}</li>`);
                if(index==20) {
                    return false;//false跳出所有循环；true跳出本次循环。
                }
            });
        }).catch(err => {
            console.log(err);//获取失败
        });

        $('#address').css('display','block');//显示地址列表
         
        e.preventDefault();//取消a标签自带的href事件
     });



     //点击地址跳转到该地区的影院 (使用jQuery的事件委托)
    $('#address').on('click','li',function() {
        var className = $(this).prop('class');
        loadYinyuan(className);//传入点击的城市名
        $('#address').css('display','none');//隐藏地址列表
        $('#top .dq').text(className);
    });
  
    










})
