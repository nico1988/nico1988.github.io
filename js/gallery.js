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
  //点击隐藏导航事件
  $("body>header").on("click",function(e){
    e.stopPropagation();//点击header(第一个header)不冒泡往上到body
  })
  $("body").on("click",function(){
    if($("nav").hasClass("shownav")){
      $(".navbar").trigger("click");//点击body(除header).触发navbar的点击事件
    }
  })

})(jQuery);
