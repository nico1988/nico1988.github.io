(function($){
  // Caption
  $('.entry').each(function(i){
    $(this).find('img').each(function(){
      if (!$(this).hasClass('nofancybox')){
        var alt = this.alt;

        if (alt){
          $(this).after('<span class="caption">' + alt + '</span>');
        }

        $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox" rel="gallery' + i + '" />');
      }
    });
  });

  // Gallery
  var play = function(parent, item, callback){
    var width = parent.width();

    item.imagesLoaded(function(){
      var _this = this[0],
        nWidth = _this.naturalWidth,
        nHeight = _this.naturalHeight;

      callback();
      this.animate({opacity: 1}, 500);
      parent.animate({height: width * nHeight / nWidth}, 500);
    });
  };

  $('.gallery').each(function(){
    var $this = $(this),
      current = 0,
      photoset = $this.children('.photoset').children(),
      all = photoset.length,
      loading = true;

    play($this, photoset.eq(0), function(){
      loading = false;
    });

    $this.on('click', '.prev', function(){
      if (!loading){
        var next = (current - 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    }).on('click', '.next', function(){
      if (!loading){
        var next = (current + 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    });
  });
  //点击汉堡菜单事件，覆盖掉之前的
  document.querySelector(".navbar").onclick = function(){
    var isClick = true;
    if(isClick){
       $(".animated ").show(3000);
       isClick = false;
    }else{
       $(".animated ").hide();
       isClick = false;
    }
  }
  //点击隐藏导航事件
  $("body>header").on("click",function(e){
    e.stopPropagation();//点击header(第一个header)不冒泡往上到body
  })
  $("body").on("click",function(){
    //如果已经点击过汉堡按钮,让导航弹上去
    if($("nav").hasClass("shownav")){
      $(".navbar").trigger("click");//点击body(除header).触发navbar的点击事件,菜单隐藏
    }
  })
  //滑动事件
  //创建div，让其html等于nav的值
  var nav_html = $("nav.animated>ul").html();
  var div_aside = $('<div class="touch_out"></div>');
  $(div_aside).html(nav_html).css({"width":"225px","position":"fixed","top":$("body>header")[0].offsetHeight,"zIndex":30,"background":"rgba(135,206,235,.9)","height":"100%"}).find("li").css({"padding":"15px","borderBottom":"1px solid pink"});
  $(".touch_out").css({"left":"-225px"});
  $("body").append(div_aside);
  var left = $(".touch_out").width()+"px";
  $("div.touch_out").css({"left":"-225px"});
  touch();//触摸屏幕显示侧边栏
  function touch(event){
      //算的时候一定要带单位
      //让菜单滑动
      /*定义公用的方法*/
      var addTransition = function(){
          $("div.touch_out").css({"-webkit-transition":'all .6s'});
          $("div.touch_out").css({"transition":'all .6s'});
      }
      var removeTransition = function(){
          $("div.touch_out").css({"-webkit-transition":'none'});
          $("div.touch_out").css({"transition":'none'});
      }
      var setTranslateX = function(y){
          $("div.touch_out").css({"-webkit-transform":'translateX('+y+'px)'});
          $("div.touch_out").css({"transform":'translateX('+y+'px)'});
      }
      //点击屏幕,让侧边栏显示出来
      var startX = 0;
      var moveX =0;
      var distanceX = 0;
      var isMove = false;
      var currX = 0;//记录当前的定位，全局，相当于每次滑动到哪个位置
      $("body").on("touchstart",function(e){
        /*jquery e 返回的  originalEvent 就是原生js当中的 touchEvent*/
        /*每次开始的点事开始位置+上次位置(负数)*/
        removeTransition();
        startX = e.originalEvent.touches[0].clientX - distanceX;
      })
      $("body").on("touchmove",function(e){
        //如果已经点击过，只要窗口滑动，让nav弹上去
        if($("nav").hasClass("shownav")){
          $(".navbar").trigger("click");//点击body(除header).触发navbar的点击事件,菜单隐藏
        }
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
        /*这里要注意要加px*/
        var width = $("div.touch_out").width();
        //点击区域在屏幕左边两百范围以内，才发生侧滑事件
        if(distanceX>40 && startX<=225){//如果向右滑动距离大于40，隐藏盒子向右移出
          setTranslateX(width);//如果没有超出边界，就移动
        }else if(distanceX<-40 && startX<=225){//如果向左滑动，隐藏盒子向左移出
          setTranslateX(-width);//如果没有超出边界，就移动
        }
        addTransition();
      })
      $("body").on("touchend",function(e){
            //判断是否在定位区间中，
            //如果不在，让当前的位置等于最大或最小的位置，同时吸附回去
            /*每次触摸事件完成后，让参数重置*/
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;
      })
    }
})(jQuery);
