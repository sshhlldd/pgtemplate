var initPhone = function (arr) {
  let imgArr = [];
  arr.forEach(function (item) {
    if (item.type === "img" && item.isimg == true) {
      imgArr.push(item.value);
    }
    if (item.type === "pics" && item.isimg == true) {
      imgArr = imgArr.concat(item.value);
    }
  });
  preloadimages(imgArr).done(image => {
    myScroll(arr);
    hotPic(arr);
    initVideo(arr);
    myDzp(arr);
    textScroll(arr);
    myTime(arr);
  });
};
var myTime = function (objArr) {
  var len = objArr.length;
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      if (objArr[i].type === "time") {
        (function (e) {
          InitTime(e, objArr[e]);
        })(i);
      }
    }
  }

  function InitTime(k, obj) {
    var $doc = $('[data-id="' + k + '"]');
    $doc.addClass("mytime");
    $doc.css({
      "background-image": "url(" + obj.bgImg + ")",
      "background-color": obj.bgcolor,
      color: obj.color
    });

    function init() {
      var tempHtml =
        '<div class="tit"  style="color:' +
        obj.tit.color +
        '">' +
        obj.tit.text +
        '</div><div class="count"></div>';

      $doc.html(tempHtml);
      $doc.find(".tit").css("font-size", setpx(obj.tit.size));
      $doc.find(".count").css("font-size", setpx(obj.size));


    }
    init();

    var endt = new Date(obj.value.replace(/-/g,'/')).getTime()
    alert(endt);
    var emsize = setpx(parseInt(obj.size) - 3);

    setInterval(countTime, 1000);


    function countTime() {
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var str = obj.value;
      var end = new Date(str.replace(/-/g,'/')).getTime()
      
      //时间差
      var leftTime = end - now;


      //定义变量 d,h,m,s保存倒计时的时间
      var d, h, m, s;
      if (leftTime >= 0) {
        d = num(Math.floor(leftTime / 1000 / 60 / 60 / 24));
        h = num(Math.floor(leftTime / 1000 / 60 / 60 % 24));
        m = num(Math.floor(leftTime / 1000 / 60 % 60));
        s = num(Math.floor(leftTime / 1000 % 60));
      } else {
        d = "00";
        h = "00";
        m = "00";
        s = "00";
      }
      var temp = '<span>' + d + ' <em style="font-size:' + emsize + '">天</em></span><span>' + h + ' <em style="font-size:' + emsize + '">时</em></span><span>' + m + ' <em style="font-size:' + emsize + '">分</em></span><span>' + s + ' <em style="font-size:' + emsize + '">秒</em></span>';
      $doc.find(".count").html(temp);
    }

    function num(s) {
      return s < 10 ? '0' + s : s;
    }
  }
};
var textScroll = function (objArr) {
  var len = objArr.length;
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      if (objArr[i].type === "txtScroll") {
        (function (e) {
          InitTxt(e, objArr[e]);
        })(i);
      }
    }
  }

  function InitTxt(k, obj) {
    var $doc = $('[data-id="' + k + '"]');
    var len = obj.value.length;
    var ww = $(window).width();
    ww > 750 ? (ww = 750) : (ww = ww);
    $doc.addClass("text-scroll");
    $doc.css({
      "background-image": "url(" + obj.bgImg + ")",
      "background-color": obj.bgcolor,
      color: obj.color
    });

    function init() {
      var tempHtml =
        '<div class="tit" style="color:' +
        obj.tit.color +
        '">' +
        obj.tit.ltext + '<span>' +
        obj.tit.num + '</span>' +
        obj.tit.rtext +
        '</div><div class="scroll-wrap"><ul>';
      for (var i = 0; i < len; i++) {
        var changePhone =
          obj.value[i].phone.substr(0, 3) +
          "****" +
          obj.value[i].phone.substr(7);
        tempHtml +=
          "<li><span>" +
          obj.value[i].name +
          "</span><span>" +
          changePhone +
          "</span><span>已参加活动</span></li>";
      }
      tempHtml += "</ul></div>";
      $doc.html(tempHtml);
      $doc.css({
        "font-size": setpx(13),
        "padding": setpx(obj.padding)
      });


      var sh = parseInt($doc.find("li").outerHeight(true)) * 3;
      $doc.find(".scroll-wrap").css({
        "height": sh,
        "border-color": obj.bdcolor
      });
    }
    init();
    var $con = $doc.find("ul");
    var itemh = parseInt($doc.find("li").outerHeight(true));
    setInterval(function () {
      slider();
    }, 100);

    function slider() {
      var s = parseInt($con.css("margin-top"));
      $con.css({
        "margin-top": s - 1
      });
      var bs = Math.abs(s);
      if (bs >= itemh) {
        $con
          .find("li")
          .eq(0)
          .appendTo($con);
        $con.css({
          "margin-top": 0
        });
      }
    }
  }
};
var myDzp = function (objArr) {
  var isform = false;
  var len = objArr.length;
  if (len > 0) {
    /* for (var i = 0; i < len; i++) {
      if (objArr[i].type === "form") {
        isform = true;
      }
    } */
    for (var i = 0; i < len; i++) {
      if (objArr[i].type === "dzp") {
        (function (e) {
          InitDzp(e, objArr[e], isform);
        })(i);
      }
    }
  }

  function InitDzp(k, obj, isform) {
    var ww = $(window).width();
    ww > 750 ? (ww = 750) : (ww = ww);
    var dzpBox = $('[data-id="' + k + '"]');
    dzpBox.addClass("dzpcon");
    dzpBox.css({
      "background-image": "url(" + obj.bgImg + ")",
      "background-color": obj.bgcolor
    });
    var rbtnw = ww * 0.2;
    var rbtntop = parseInt(ww / 2 - (228 * rbtnw) / 170 + rbtnw / 2);
    var skinobj = {};
    if (obj.skin === "skin1") {
      skinobj = {
        dzpBg: "https://static.auto-smart.com/autopg/static/img/dzpbg1.png",
        startBtn: "https://static.auto-smart.com/autopg/static/img/dzpbtn1.png",
        stopbtn: "https://static.auto-smart.com/autopg/static/img/dzpbtngray1.png"
      };
    } else {
      skinobj = {
        dzpBg: "https://static.auto-smart.com/autopg/static/img/dzpbg2.png",
        startBtn: "https://static.auto-smart.com/autopg/static/img/dzpbtn2.png",
        stopbtn: "https://static.auto-smart.com/autopg/static/img/dzpbtngray2.png"
      };
    }
    dzpHtml();
    var rbtn = dzpBox.find(".lotteryBtn");
    rbtn.click(function () {
      /*  $(this).unbind();
       $(this).attr("src", skinobj.stopbtn);
      var n = Math.floor(Math.random() * 5 + 1);*/
      if (isLogin === true) {
        rotate(parseInt(obj.prizeNum));
      } else {
        if (isform === true) {
          mytip("填写信息，参与抽奖");
          $("html,body").animate({
            scrollTop: $("form").offset().top
          });
        } else {
          var temp =
            ' <form class="formstyle-default" name="popForm"><div class="form-row js-formspace">\
          <span class="inlut-wrap js-style" style="border-color:#dcdcdc"><input id="name" type="text" placeholder="您的姓名" class="js-textcolor"></span>\
          </div>\
          <div class="form-row js-formspace">\
            <span class="inlut-wrap js-style" style="border-color:#dcdcdc"><input id="phone" type="text" placeholder="手机号码" class="js-textcolor"></span>\
          </div>\
          <div class="btnCon js-btnpos" style="text-align: right;">\
          <a href="javascript:;" class="pop-submitbtn form-submitbtn js-btnstyle" style="background-color:#409eff; border-color:#409eff;  color: rgb(255, 255, 255); width: 40%; line-height: 40px; height: 40px; margin-top: 15px; font-size: 16px;">提 交</a>\
          </div>\
          </form>';
          mypop("填写信息", temp);
          submit();
        }
      }
    });

    function submit() {
      $(".my_pop").on("click", ".pop-submitbtn", function () {
        var name = $(".my_pop #name").val();
        var phone = $(".my_pop #phone").val();
        if (name == "") {
          mytip("请填写姓名");
          return;
        }
        if (phone == "") {
          mytip("请填写手机号码");
          return;
        }

        isLogin = true;
        $(".pop_box").removeClass("animation-dialogue-in");
        $(this)
          .parents(".my_pop")
          .hide();
      });
    }

    function dzpHtml() {
      var html = '<div class="ly-plate clearfix"  style="height:' + ww + 'px">';
      html += '<div class="rotate-bg">';
      html += '<img src="' + skinobj.dzpBg + '" width="100%" style="">';
      for (var x in obj.value) {
        html +=
          '<div class="pro-img pro-img' +
          (parseInt(x) + 1) +
          '" style="color:' +
          obj.color +
          '">';
        html += "<span>" + obj.value[x].name + "</span>";
        html += "</div>";
      }
      html += "</div>";
      html += '<div class="lottery-star" style="top:' + rbtntop + 'px">';
      html +=
        '<img src="' +
        skinobj.startBtn +
        '" class="lotteryBtn" data-id="' +
        k +
        '" width="100%">';
      html += "</div></div>";
      dzpBox.append(html);
      dzpBox.find(".pro-img").css("font-size", setpx(12));
      //中心点横坐标
      var unitWidth = ww * 0.15; //奖项摆放外框的宽度
      var dotLeft = (ww - unitWidth) / 2;
      //中心点纵坐标
      var dotTop = (ww - unitWidth) / 2;
      //中心点纵坐标

      //起始角度
      var stard = 0;
      //半径
      var radius = parseInt(ww / 3.7);
      //每一个BOX对应的角度;
      var avd = 360 / dzpBox.find(".pro-img").length;
      //每一个BOX对应的弧度;
      var ahd = (avd * Math.PI) / 180;

      //设置圆的中心点的位置d
      dzpBox.find(".pro-img").each(function (index, element) {
        $(this).css({
          left: Math.sin(ahd * index) * radius + dotLeft,
          top: Math.cos(ahd * index) * radius + dotTop
        });
      });
    }

    function rotate(index) {
      if (index == 0) {
        rotateFunc(0, -180);
      } else if (index == 1) {
        rotateFunc(1, -120);
      } else if (index == 2) {
        rotateFunc(2, -60);
      } else if (index == 3) {
        rotateFunc(3, 0);
      } else if (index == 4) {
        rotateFunc(4, 60);
      } else if (index == 5) {
        rotateFunc(5, 120);
      } else {
        return false;
      }
    }

    function rotateFunc(index, angle) {
      //awards:奖项，angle:奖项对应的角度
      dzpBox.find(".rotate-bg").stopRotate();
      dzpBox.find(".rotate-bg").rotate({
        angle: 0,
        duration: 5000,
        animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
        callback: function () {
          mypop("提示", '<p class="tip">' + obj.value[index].tip + "</p>");
        }
      });
    }

    function reset() {
      //超时函数
      dzpBox.find(".rotate-bg").rotate({
        angle: 0,
        duration: 10000,
        animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
        callback: function () {
          alert("网络超时");
        }
      });
    }
  }
};

var myScroll = function (objArr) {
  var len = objArr.length;
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      if (objArr[i].type === "pics") {
        (function (e) {
          InitScroll(e, objArr[e]);
        })(i);
      }
    }
  }

  function InitScroll(k, obj) {
    function init(obj) {
      var $doc = $('[data-id="' + k + '"]'),
        _SrollConClass = "img-container";
      var len = obj.value.length;
      var imgHtml = ""; // '<li><a href="javascript:;"><img src="xxx" width="100%" /></a></li>';
      var pageHtml = ""; // '<li></li>';
      for (var i = 0; i < len; i++) {
        imgHtml +=
          '<li><a href="javascript:;"><img src="' +
          obj.value[i] +
          '" loadsrc="' +
          obj.value[i] +
          '" width="100%" /></a></li>';
        if (i == 0) {
          pageHtml +=
            '<li class="on" style="background:' +
            obj.rollcurr.currcolor +
            ";border-color:" +
            obj.rollcurr.currcolor +
            ';"></li>';
        } else {
          pageHtml +=
            '<li style="background:' + obj.rollcurr.color + ';"></li>';
        }
      }

      var scrollBox =
        '<div class="img_scroll ' +
        _SrollConClass +
        " rollbtn_" +
        obj.rollbtn.type +
        '">' +
        '<span class="prev roll_btn" style="color: ' +
        obj.rollbtn.color +
        ';"></span><span class="next roll_btn" style="color: ' +
        obj.rollbtn.color +
        ';"></span>' +
        '<div class="img-list">' +
        '<ul class="img-con">' +
        imgHtml +
        "</ul>" +
        "</div>" +
        '<ul class="slide-nav rollnav_' +
        obj.rollcurr.type +
        '" style="text-align:' +
        obj.rollcurr.pos +
        ';">' +
        pageHtml +
        "</ul>" +
        "</div>";

      $doc.html(scrollBox);
      $doc.find(".roll_btn").css("font-size", setpx(28));
    }
    init(obj);
    var $doc = $('[data-id="' + k + '"]'),
      _SrollConClass = "img-container";
    var ww;
    var hh;
    var i = 0;
    var next = $doc.find(".next");
    var prev = $doc.find(".prev");
    var nav = $doc.find(".slide-nav");
    var con = $doc.find(".img-list ul");
    var imgScroll = $doc.find(".img_scroll");
    var imgList = $doc.find(".img-list");
    var imgContainer = $doc.find(".img-container");

    var imgTimer = setInterval(function () {
      hh = $doc
        .find(".img_scroll img")
        .eq(0)
        .height();
      if (hh > 0) {
        $doc.find(".img_scroll img").height(hh);
        clearInterval(imgTimer);
        return;
      }
    }, 200);

    $(window).resize(function () {
      ww = imgContainer.width();
      imgScroll.css({
        width: ww
      });
      imgList.css({
        width: ww
      });
      imgList.find("li").css({
        width: ww
      });
    });
    ww = imgContainer.width();
    imgScroll.css({
      width: ww
    });
    imgList.css({
      width: ww
    });
    imgList.find("li").css({
      width: ww
    });
    var MyMar = setInterval(Next, 5000);
    var l = imgList.find("li").length;

    function Next() {
      i++;
      if (i == l) {
        i = 0;
      }
      nav
        .find("li")
        .removeClass("on")
        .css({
          background: obj.rollcurr.color
        });
      nav
        .find("li:eq(" + i + ")")
        .addClass("on")
        .css({
          background: obj.rollcurr.currcolor,
          borderColor: obj.rollcurr.currcolor
        });
      con.animate({
          "margin-left": -ww
        },
        function () {
          con
            .find("li")
            .eq(0)
            .appendTo(con);
          con.css({
            "margin-left": 0
          });
        }
      );
    }

    function Prev() {
      i--;
      if (i == -1) {
        i = l - 1;
      }
      nav
        .find("li")
        .removeClass("on")
        .css({
          background: obj.rollcurr.color
        });
      nav
        .find("li:eq(" + i + ")")
        .addClass("on")
        .css({
          background: obj.rollcurr.currcolor,
          borderColor: obj.rollcurr.currcolor
        });
      con.find("li:last").prependTo(con);
      con.css({
        "margin-left": -ww
      });
      con.animate({
        "margin-left": 0
      });
    }
    prev.click(function () {
      Prev();
    });
    next.click(function () {
      Next();
    });
    //支持手机滑动
    con.touchwipe({
      wipeRight: function () {
        Prev();
      },
      wipeLeft: function () {
        Next();
      },
      min_move_x: 20,
      min_move_y: 20,
      preventDefaultEvents: true
    });
  }
};
var hotPic = function (objArr) {
  var len = objArr.length;
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      if (objArr[i].hasOwnProperty("hotpot")) {
        (function (e) {
          initHotpic(e, objArr[e]);
        })(i);
      }
      if (!objArr[i].hasOwnProperty("hotpot") && objArr[i].type === "img") {
        (function (e) {
          initImg(e, objArr[e]);
        })(i);
      }
    }
  }

  function initImg(k, obj) {
    var imgBox = $('[data-id="' + k + '"]');
    imgBox.html('<img src="' + obj.value + '" width="100%">');
  }

  function initHotpic(k, obj) {
    var initObj = {
      //"id": 1,
      type: "",
      //热点：type类型=pop弹窗 value:图片数组，closebtn:关闭图片地址.type=link value:跳转链接
      hotpot: {
        type: "",
        link: "",
        url: "",
        value: [],
        bgcolor: "",
        closebtn: "",
        pos: {
          //热区 位置
          top: "",
          left: "",
          width: "",
          height: ""
        }
      },
      value: ""
    };
    $.extend(true, initObj, obj);
    var hotBox = $('[data-id="' + k + '"]');
    var hotHref = "javascript:void(0)";
    var popImgHTml = "";
    var imgArr = initObj.hotpot.value;
    var closeHtml = "";
    hotBox.addClass("picBox");
    if (initObj.hotpot.type != "pop") {
      hotHref = initObj.hotpot.url;
      hotBox.html(
        '<img src="' + initObj.value + '"/><a href="' + hotHref + '"></a>'
      );
      var $hotBtn = hotBox.find("a");
      var btnpos = {
        top: setpx(initObj.hotpot.pos.top),
        left: setpx(initObj.hotpot.pos.left),
        width: setpx(initObj.hotpot.pos.width),
        height: setpx(initObj.hotpot.pos.height)
      };
      $hotBtn.css(btnpos);
      return;
    } else {
      //弹层
      for (var i = 0; i < imgArr.length; i++) {
        popImgHTml += '<div><img src="' + imgArr[i] + '"/></div>';
      }
      closeHtml = '<img src="' + initObj.hotpot.closebtn + '"/>';
      hotBox.html(
        '<img src="' +
        initObj.value +
        '"/><a href="' +
        hotHref +
        '"></a><div data-role="popData" style="display:none;widht:0;height:0;line-height:0">' +
        popImgHTml +
        '</div><div data-role="closeData" style="display:none;widht:0;height:0;line-height:0">' +
        closeHtml +
        "</div>"
      );
    }

    var $hotBtn = hotBox.find("a");
    var btnpos = {
      top: setpx(initObj.hotpot.pos.top),
      left: setpx(initObj.hotpot.pos.left),
      width: setpx(initObj.hotpot.pos.width),
      height: setpx(initObj.hotpot.pos.height)
    };
    $hotBtn.css(btnpos);
    var popHtml =
      '<div class="gray"></div>' +
      '<div class="pop" id="pop">' +
      '<div class="popCon">' +
      '<div class="dialog"></div>' +
      "</div>" +
      '<div class="close"></div>' +
      "</div>";
    if ($(".pop").length > 0) {
      $(".pop").remove();
      $(".gray").remove();
    }
    $("body").append(popHtml);

    var $pop = $(".pop"),
      $popBg = $(".gray"),
      $close = $(".close");

    $pop.css({
      marginTop: "0px"
    });

    $close.on("click", hotBox, function () {
      $pop.hide();
      $popBg.hide();
    });
    $hotBtn.on("click", hotBox, function () {
      var popDataHtml = $(this)
        .siblings('[data-role="popData"]')
        .html();
      var closeDataHtml = $(this)
        .siblings('[data-role="closeData"]')
        .html();
      $pop = $(".pop");
      $popBg = $(".gray");
      $pop.css({
        background: initObj.hotpot.bgcolor
      });

      $pop.find(".dialog").html(popDataHtml);
      $pop.find(".close").html(closeDataHtml);
      $pop.show();
      $popBg.show();
    });
  }
};
var initVideo = function (objArr) {
  var len = objArr.length;
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      if (objArr[i].type === "video") {
        (function (e) {
          createVideo(e, objArr[e]);
        })(i);
      }
    }
  }

  function createVideo(k, obj) {
    var initObj = {
      //"id": '1',
      type: "video", //视频
      cover: "", //封面图片
      //"isimg": true,
      value: "", //视频地址
      videostyle: {
        //
        videoBgColor: "rgb(0,0,0)", //背景颜色
        videoPaddingTop: "0px", //整体video边距
        videoPaddingBottom: "0px",
        videoPaddingLeft: "0px",
        videoPaddingRight: "0px"
      }
    };
    $.extend(true, initObj, obj);
    var videoHtml =
      '<div class="videoBox" style="background:' +
      initObj.videostyle.videoBgColor +
      ";padding:" +
      initObj.videostyle.videoPaddingTop +
      " " +
      initObj.videostyle.videoPaddingRight +
      " " +
      initObj.videostyle.videoPaddingBottom +
      " " +
      initObj.videostyle.videoPaddingLeft +
      '">' +
      '<video width="100%" height="auto" src="' +
      initObj.value +
      '" poster="' +
      initObj.cover +
      '" loop="loop" x-webkit-airplay="true" webkit-playsinline="true">' +
      "您的浏览器暂不支持播放该视频，请升级至最新版浏览器。" +
      "</video>" +
      '<div class="videoCtrl"></div></div>';

    var $videoArea = $('[data-id="' + k + '"]');
    $videoArea.html(videoHtml);
    var $videoBox = $videoArea.find(".videoBox"),
      $video = $videoBox.find("video"),
      $videoCtrl = $videoBox.find(".videoCtrl");

    var w = "100%",
      h =
      $videoBox.outerHeight() + parseInt(initObj.videostyle.videoPaddingTop);

    //$videoCtrl.css({ "width": w, "height": h + "px" })
    $videoCtrl.on("click", $videoArea, function () {
      if ($video[0].paused) {
        $video[0].play();
        $videoCtrl.hide();
      } else {
        $video[0].pause();
        $videoCtrl.show();
      }
    });
    $video.on("click", $videoArea, function () {
      $video[0].pause();
      $videoCtrl.show();
    });
  }
};

//省市经销商初始化
var testDrive = function (url) {
  //初始化省市经销商数据
  $.ajax({
    url: url,
    /* type:'get', */
    dataType: "jsonp",
    jsonp: "callback",
    data: "need=province",
    error: function (msg) {
      alert("wrong");
    },
    success: function (msg) {
      //alert('aha');
      $("[name=province]").append("<option>省份</option>");
      $.each(msg, function (id, province) {
        $("[name=province]").append(
          "<option value=" + id + ">" + province + "</option>"
        );
      });
    }
  });
  $("[name=province]").change(function () {
    //var provinceid=$("[name=province] option:selected").attr('value');//获取option元素
    var province = $("#province option:selected").text(); //获取选取的值
    //alert(provinceid);
    $.ajax({
      url: url,
      dataType: "jsonp",
      jsonp: "callback",
      data: "need=city&detail=" + province,
      success: function (msg) {
        $("[name=city]").empty();
        $("[name=agency]").empty();
        $("[name=city]").append("<option>请选择</option>");
        $("[name=agency]").append("<option>请选择</option>");
        /*  $("[name=agency]").empty(); */
        $.each(msg, function (cityid, city) {
          $("[name=city]").append(
            "<option value=" + cityid + ">" + city + "</option>"
          );
        });
      }
    });
  });
  $("[name=city]").change(function () {
    //var cityid=$("[name=city] option:selected").attr('value');
    var city = $("[name=city] option:selected").text();
    //alert(cityid);
    $.ajax({
      url: url,
      dataType: "jsonp",
      jsonp: "callback",
      data: "need=agency&detail=" + city,
      success: function (msg) {
        $("[name=agency]").empty();
        $("[name=agency]").append("<option value='0'>请选择</option>");
        $.each(msg, function (agencyid, agency) {
          $("[name=agency]").append(
            "<option value=" + agencyid + ">" + agency + "</option>"
          );
        });
      }
    });
  });
};
//初始化input select
var initForm = function (rw) {
  $("input").each(function () {
    var w = $(this)
      .closest(".form-group")
      .width();
    $(this).css({
      width: w - rw
    });
  });
  $("select").each(function () {
    var w = $(this)
      .closest(".form-group")
      .width();
    $(this).css({
      width: w - rw
    });
  });
};
//初始化字体大小
//@originalSize 328宽度的原始尺寸
var setpx = function (originalSize) {
  originalSize = parseInt(originalSize);
  var ratio = 328;
  var ww = $(window).width();
  ww > 750 ? (ww = 750) : (ww = ww);
  var newSize = parseInt((originalSize * ww) / ratio);
  newSize = newSize + "px";
  return newSize;
};

//弹窗
function mypop(tit, html) {
  $(".my_pop").remove();
  $(".my_pop").off("click", ".close");
  var modalDiv =
    '<div class="my_pop">\
          <div class="cover"></div>\
          <div class="pop_box">\
          <div class="pop_head"><button type="button" class="close">×</button><h4>' +
    tit +
    '</h4></div>\
          <div class="pop_body" style="">' +
    html +
    "</div>\
          </div></div>";
  $("body").append(modalDiv);
  $(".pop_box").addClass("animation-dialogue-in"); //弹出层后，禁用body和html滚动
  /* $("body,html").addClass("forbid-scroll"); */
  $(".my_pop").on("click", ".close", function () {
    $(this)
      .parents(".my_pop")
      .hide();
    $(".pop_box").removeClass("animation-dialogue-in");
    /* $("body,html").removeClass("forbid-scroll"); */
  });
}
//提示
function mytip(html) {
  var modalDiv =
    '<div class="my_tip">\
          <div class="tip_body">' +
    html +
    "</div>\
         </div>";
  $("body").append(modalDiv);
  $(".my_tip").addClass("animation-mytip-in");
  setTimeout(function () {
    $(".my_tip").fadeOut(function () {
      $(this).remove();
    });
  }, 2000);
}

/**
 * 检测是否为空
 * @param string
 * @returns {Boolean}
 */
function isEmpty(string) {
  if (null == string || "" == string || false == string) {
    return true;
  }
  return false;
}

function preloadimages(arr) {
  var newimages = [],
    loadedimages = 0;
  var postaction = function () {}; //此处增加了一个postaction函数
  var arr = typeof arr != "object" ? [arr] : arr;

  function imageloadpost() {
    loadedimages++;
    if (loadedimages == arr.length) {
      postaction(newimages); //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
    }
  }
  for (var i = 0; i < arr.length; i++) {
    newimages[i] = new Image();
    newimages[i].src = arr[i];
    newimages[i].onload = function () {
      imageloadpost();
    };
    newimages[i].onerror = function () {
      imageloadpost();
    };
  }
  return {
    //此处返回一个空白对象的done方法
    done: function (f) {
      postaction = f || postaction;
    }
  };
}

function toGetCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return false;
}

function dmpCallback(jsoncallback) {
  //alert("你已注册成功，稍后我们的客服会和你电话联系，请保持手机畅通。");

  $("#name").val("");
  $("#phone").val("");
  $("#submitBtn").removeAttr("disabled");
}

function toGetCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return false;
}
