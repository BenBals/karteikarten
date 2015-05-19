var JSONLoadCheckInterval, addQueryVar, animationTime, answer, answerRight, answerWrong, check, data, flipCard, flipElement, getQueryVar, init, loadData, nextCard, playAgainAllCards, playAgainWrongCards, playAgian, reset, setProgressBar, setTextOnCard, updateProgressBar;

console.log('karteikarten v0.3 - BETA admantium armadillo');

$(document).ready(function() {
  toastr.options.preventDuplicates = true;
  $('.dataSelect').SumoSelect({
    'placeholder': 'URL auswählen'
  });
  if (getQueryVar('dataURL') !== false) {
    return loadData(getQueryVar('dataURL'));
  }
});

animationTime = 500;

JSONLoadCheckInterval = 10;

data = {};

data.allCards = [];

data.random = false;

answer = function() {
  return data.lastAnsweredCard = data.unansweredCards.splice(0, 1)[0];
};

answerRight = function() {
  data.rightCards.push(data.lastAnsweredCard);
  return nextCard();
};

answerWrong = function() {
  data.wrongCards.push(data.lastAnsweredCard);
  return nextCard(true);
};

check = function() {
  return flipCard();
};

init = function(wichCards) {
  if (!!wichCards === false) {
    data.unansweredCards = data.allCards.slice();
  } else {
    data.unansweredCards = data.wrongCards.slice();
  }
  data.rightCards = [];
  data.wrongCards = [];
  data.currCard = 0;
  return setTextOnCard();
};

loadData = function(queryURL) {
  var checkDataLoad, k, len, loadFail, loadedData, url, urls;
  urls = [];
  if (queryURL) {
    urls = queryURL.trim().split(',');
  } else if ($('.dataSelect').val() === null) {
    urls = $('input.jsonUrl').val().trim().split(', ').join(',').split(',');
  } else {
    urls = $('.dataSelect').val();
  }
  console.log('the urls are ');
  console.log(urls);
  toastr.info('Laden...');
  loadedData = [];
  loadFail = false;
  for (k = 0, len = urls.length; k < len; k++) {
    url = urls[k];
    url = url.split('gist.githubusercontent.com').join('cdn.rawgit.com');
    if (window.location.hostname === 'localhost') {
      url = url.split('cdn.').join('');
    }
    $.getJSON(url, function(jsonData) {
      return loadedData.push(jsonData);
    }).fail(function() {
      return loadFail = true;
    }).done(function() {
      return checkDataLoad();
    });
    console.log('start loading', url);
  }
  return checkDataLoad = function() {
    var dataThing, l, len1;
    if (loadFail) {
      toastr.clear();
      toastr.error('Es ist ein Fehler beim Laden der Daten aufgetreten. Kontrolliere die URL(s) bzw. die Datenquelle(n).');
      clearInterval(JSONLoadCheckInterval);
    }
    if (loadedData.length === urls.length) {
      console.log('all data loaded');
      console.log(loadedData);
      if (loadedData.length === 1) {
        if (loadedData[0] instanceof Array) {
          data.allCards = loadedData[0];
        } else {
          data.allCards = loadedData[0].data.shuffle();
          data.random = loadedData[0].config.random;
        }
      } else {
        for (l = 0, len1 = loadedData.length; l < len1; l++) {
          dataThing = loadedData[l];
          console.log(dataThing);
          if (dataThing instanceof Array) {
            data.allCards = data.allCards.concat(dataThing);
          } else {
            data.allCards = data.allCards.concat(dataThing.data);
          }
        }
        data.allCards.shuffle();
      }
      toastr.clear();
      flipCard();
      setTimeout(function() {
        init();
        $('.front').show();
        $('.back').hide();
        $('.allDone').hide();
        $('.selectData').hide();
        $('.progressbar').fadeIn('fast');
        return updateProgressBar();
      }, animationTime / 2);
      addQueryVar('dataURL', urls.join(','));
      return toastr.info('Kopiere einfach die URL aus der Leiste und sende sende sie an jemandem und er spielt mit den gleichen karteikarten.');
    }
  };
};

nextCard = function(wrongBool) {
  updateProgressBar();
  if (wrongBool) {
    $('.card').addClass('swingOut-wrong');
  } else {
    $('.card').addClass('swingOut-right');
  }
  setTimeout(function() {
    $('.card').removeClass('swingOut-wrong');
    $('.card').removeClass('swingOut-right');
    $('.card').addClass('swingIn');
    return setTimeout(function() {
      return $('.card').removeClass('swingIn');
    }, animationTime);
  }, animationTime);
  if (data.random) {
    data.unansweredCards.shuffle();
  }
  flipCard();
  data.currCard++;
  return setTimeout(function() {
    return setTextOnCard();
  }, animationTime / 2);
};

playAgian = function() {
  console.log('runnig playAgian');
  return setTimeout(function() {
    $('.allDone').hide();
    return $('.front').show();
  }, animationTime / 2);
};

playAgainAllCards = function() {
  flipCard();
  return setTimeout(function() {
    return init();
  }, animationTime / 2);
};

playAgainWrongCards = function() {
  flipCard();
  return setTimeout(function() {
    return init(true);
  }, animationTime / 2);
};

reset = function() {
  window.location.hash = '';
  return window.location.href = window.location.href.split('#')[0];
};

addQueryVar = function(name, val) {
  var hash;
  hash = window.location.hash;
  if (hash.startsWith('#?')) {
    return window.location.hash += '&' + String(name) + '=' + String(val);
  } else {
    return window.location.hash = '?' + String(name) + '=' + String(val);
  }
};

flipElement = function(selector) {
  $(selector).addClass('flip');
  return setTimeout(function() {
    return $(selector).removeClass('flip');
  }, animationTime);
};

flipCard = function() {
  console.log('runnig flip card');
  flipElement('.card');
  return setTimeout(function() {
    $('.front').toggle();
    return $('.back').toggle();
  }, animationTime / 2);
};

getQueryVar = function(name) {
  var k, len, pair, query, varString, vars;
  query = window.location.hash.substring(2);
  vars = query.split('&');
  for (k = 0, len = vars.length; k < len; k++) {
    varString = vars[k];
    pair = varString.split('=');
    if (pair[0] === name) {
      return pair[1];
    }
  }
  return false;
};

setProgressBar = function(right, wrong, unanswered) {
  $('.progressbar .unanswered').width(unanswered + '%');
  $('.progressbar .right').width(right + '%');
  $('.progressbar .wrong').width(wrong + '%');
  $('.progressbar .wrong').css('left', right + '%');
  return $('.progressbar .unanswered').css('left', (right + wrong) + '%');
};

setTextOnCard = function() {
  console.log('running setTextOnCard');
  if (data.allCards.length === 0) {
    console.log('there is no data');
    $('.front').hide();
    $('.back').hide();
    $('.allDone').hide();
    return $('.selectData').show();
  } else if (data.unansweredCards.length > 0) {
    $('.q').html(data.unansweredCards[0][0]);
    $('.a').html(data.unansweredCards[0][1]);
    $('.front').show();
    $('.back').hide();
    $('.allDone').hide();
    return $('.selectData').hide();
  } else {
    $('.front').hide();
    $('.back').hide();
    $('.allDone').show();
    $('.selectData').hide();
    if (data.wrongCards.length === 0) {
      return $('.btnAgainWrong').hide();
    } else {
      return $('.btnAgainWrong').show();
    }
  }
};

updateProgressBar = function() {
  var right, unanswered, wrong;
  right = data.rightCards.length / data.allCards.length * 100;
  wrong = data.wrongCards.length / data.allCards.length * 100;
  unanswered = data.unansweredCards.length / data.allCards.length * 100;
  return setProgressBar(right, wrong, unanswered);
};

Array.prototype.shuffle = function() {
  var i, j, temp;
  i = this.length;
  j = void 0;
  temp = void 0;
  if (i === 0) {
    return this;
  }
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

$('.checkBtn').click(function() {
  return check();
});

$('.btnRight, .btnWrong').click(function() {
  return answer();
});

$('.btnRight').click(function() {
  return answerRight();
});

$('.btnWrong').click(function() {
  return answerWrong();
});

$('.btnAgainAll, .btnAgainWrong').click(function() {
  return playAgian();
});

$('.btnAgainAll').click(function() {
  return playAgainAllCards();
});

$('.btnAgainWrong').click(function() {
  return playAgainWrongCards();
});

$('.btnSubmitJson').click(function() {
  return loadData();
});

$('.btnReset').click(function() {
  return reset();
});

!function(e){"namespace sumo";e.fn.SumoSelect=function(t){var l=e.extend({placeholder:"Select Here",csvDispCount:3,captionFormat:"{0} Selected",floatWidth:400,forceCustomRendering:!1,nativeOnDevice:["Android","BlackBerry","iPhone","iPad","iPod","Opera Mini","IEMobile","Silk"],outputAsCSV:!1,csvSepChar:",",okCancelInMulti:!1,triggerChangeCombined:!0,selectAll:!1,selectAlltext:"Select All"},t),s=this.each(function(){var t=this;!this.sumo&&e(this).is("select")&&(this.sumo={E:e(t),is_multi:e(t).attr("multiple"),select:"",caption:"",placeholder:"",optDiv:"",CaptionCont:"",is_floating:!1,is_opened:!1,mob:!1,Pstate:[],createElems:function(){var t=this;return t.E.wrap('<div class="SumoSelect" tabindex="0">'),t.select=t.E.parent(),t.caption=e("<span></span>"),t.CaptionCont=e('<p class="CaptionCont"><label><i></i></label></p>').addClass("SlectBox").attr("style",t.E.attr("style")).prepend(t.caption),t.select.append(t.CaptionCont),t.E.attr("disabled")&&t.select.addClass("disabled").removeAttr("tabindex"),l.outputAsCSV&&t.is_multi&&t.E.attr("name")&&(t.select.append(e('<input class="HEMANT123" type="hidden" />').attr("name",t.E.attr("name")).val(t.getSelStr())),t.E.removeAttr("name")),t.isMobile()&&!l.forceCustomRendering?void t.setNativeMobile():(t.E.hide(),t.optDiv=e('<div class="optWrapper">'),t.floatingList(),ul=e('<ul class="options">'),t.optDiv.append(ul),l.selectAll&&t.selAll(),e(t.E.children("option")).each(function(l,i){i=e(i),t.createLi(i)}),t.is_multi&&t.multiSelelect(),t.select.append(t.optDiv),t.basicEvents(),void t.selAllState())},createLi:function(t,l){var i=this;return t.attr("value")||t.attr("value",t.val()),li=e('<li data-val="'+t.val()+'"><label>'+t.text()+"</label></li>"),i.is_multi&&li.prepend("<span><i></i></span>"),t[0].disabled&&(li=li.addClass("disabled")),i.onOptClick(li),t[0].selected&&li.addClass("selected"),t.attr("class")&&li.addClass(t.attr("class")),ul=i.optDiv.children("ul.options"),"undefined"==typeof l?ul.append(li):ul.children("li").eq(l).before(li),li},getSelStr:function(){return sopt=[],this.E.children("option:selected").each(function(){sopt.push(e(this).val())}),sopt.join(l.csvSepChar)},multiSelelect:function(){var t=this;t.optDiv.addClass("multiple"),t.okbtn=e('<p class="btnOk">OK</p>').click(function(){l.triggerChangeCombined&&(changed=!1,t.E.children("option:selected").length!=t.Pstate.length?changed=!0:t.E.children("option:selected").each(function(){t.Pstate.indexOf(e(this).val())<0&&(changed=!0)}),changed&&(t.E.trigger("change").trigger("click"),t.setText())),t.hideOpts()}),t.cancelBtn=e('<p class="btnCancel">Cancel</p>').click(function(){t._cnbtn(),t.hideOpts()}),t.optDiv.append(e('<div class="MultiControls">').append(t.okbtn).append(t.cancelBtn))},_cnbtn:function(){var e=this;for(e.E.children("option:selected").each(function(){this.selected=!1}),e.optDiv.find("li.selected").removeClass("selected"),i=0;i<e.Pstate.length;i++)e.E.children('option[value="'+e.Pstate[i]+'"]')[0].selected=!0,e.optDiv.find('li[data-val="'+e.Pstate[i]+'"]').addClass("selected");e.selAllState()},selAll:function(){var t=this;t.is_multi&&(t.chkAll=e("<i>"),t.selAll=e('<p class="select-all"><label>'+l.selectAlltext+"</label></p>").prepend(e("<span></span>").append(t.chkAll)),t.chkAll.on("click",function(){t.selAll.toggleClass("selected"),t.optDiv.find("ul.options li").each(function(l,i){i=e(i),t.selAll.hasClass("selected")?i.hasClass("selected")||i.trigger("click"):i.hasClass("selected")&&i.trigger("click")})}),t.optDiv.prepend(t.selAll))},selAllState:function(){var t=this;if(l.selectAll){var i=0,s=0;t.optDiv.find("ul.options li").each(function(t,l){e(l).hasClass("selected")&&i++,e(l).hasClass("disabled")||s++}),i==s?t.selAll.removeClass("partial").addClass("selected"):0==i?t.selAll.removeClass("selected partial"):t.selAll.addClass("partial")}},showOpts:function(){var t=this;t.E.attr("disabled")||(t.is_opened=!0,t.optDiv.addClass("open"),e(document).on("click.sumo",function(e){if(!t.select.is(e.target)&&0===t.select.has(e.target).length){if(!t.is_opened)return;t.hideOpts(),t.is_multi&&l.okCancelInMulti&&t._cnbtn()}}),t.is_floating&&(H=t.optDiv.children("ul").outerHeight()+2,t.is_multi&&(H+=parseInt(t.optDiv.css("padding-bottom"))),t.optDiv.css("height",H)),t.is_multi&&(t.is_floating||l.okCancelInMulti)&&(t.Pstate=[],t.E.children("option:selected").each(function(){t.Pstate.push(e(this).val())})))},hideOpts:function(){var t=this;t.is_opened=!1,t.optDiv.removeClass("open").find("ul li.sel").removeClass("sel"),e(document).off("click.sumo")},setOnOpen:function(){var e=this,t=e.optDiv.find("ul li").eq(e.E[0].selectedIndex);t.addClass("sel"),e.showOpts()},nav:function(e){var t,l=this,i=l.optDiv.find("ul li.sel");if(l.is_opened&&i.length){if(t=e?i.prevAll("li:not(.disabled)"):i.nextAll("li:not(.disabled)"),!t.length)return;i.removeClass("sel"),i=t.first().addClass("sel");var s=l.optDiv.find("ul"),n=s.scrollTop(),o=i.position().top+n;o>=n+s.height()-i.outerHeight()&&s.scrollTop(o-s.height()+i.outerHeight()),n>o&&s.scrollTop(o)}else l.setOnOpen()},basicEvents:function(){var t=this;t.CaptionCont.click(function(e){t.E.trigger("click"),t.is_opened?t.hideOpts():t.showOpts(),e.stopPropagation()}),t.select.on("keydown",function(e){switch(e.which){case 38:t.nav(!0);break;case 40:t.nav(!1);break;case 32:case 13:t.is_opened?t.optDiv.find("ul li.sel").trigger("click"):t.setOnOpen();break;case 9:case 27:return t.is_multi&&l.okCancelInMulti&&t._cnbtn(),void t.hideOpts();default:return}e.preventDefault()}),e(window).on("resize.sumo",function(){t.floatingList()})},onOptClick:function(t){var i=this;t.click(function(){var t=e(this);t.hasClass("disabled")||(txt="",i.is_multi?(t.toggleClass("selected"),i.E.children('option[value="'+t.data("val")+'"]')[0].selected=t.hasClass("selected"),i.selAllState()):(t.parent().find("li.selected").removeClass("selected"),t.toggleClass("selected"),i.E.val(t.attr("data-val"))),i.is_multi&&l.triggerChangeCombined&&(i.is_floating||l.okCancelInMulti)||(i.setText(),i.E.trigger("change").trigger("click")),i.is_multi||i.hideOpts())})},setText:function(){var t=this;if(t.placeholder="",t.is_multi){for(sels=t.E.children(":selected").not(":disabled"),i=0;i<sels.length;i++){if(i>=l.csvDispCount&&l.csvDispCount){t.placeholder=l.captionFormat.replace("{0}",sels.length);break}t.placeholder+=e(sels[i]).text()+", "}t.placeholder=t.placeholder.replace(/,([^,]*)$/,"$1")}else t.placeholder=t.E.children(":selected").not(":disabled").text();return is_placeholder=!1,t.placeholder||(is_placeholder=!0,t.placeholder=t.E.attr("placeholder"),t.placeholder||(t.placeholder=t.E.children("option:disabled:selected").text())),t.placeholder=t.placeholder?t.placeholder:l.placeholder,t.caption.text(t.placeholder),csvField=t.select.find("input.HEMANT123"),csvField.length&&csvField.val(t.getSelStr()),is_placeholder?t.caption.addClass("placeholder"):t.caption.removeClass("placeholder"),t.placeholder},isMobile:function(){for(var e=navigator.userAgent||navigator.vendor||window.opera,t=0;t<l.nativeOnDevice.length;t++)if(e.toString().toLowerCase().indexOf(l.nativeOnDevice[t].toLowerCase())>0)return l.nativeOnDevice[t];return!1},setNativeMobile:function(){var e=this;e.E.addClass("SelectClass"),e.mob=!0,e.E.change(function(){e.setText()})},floatingList:function(){var t=this;t.is_floating=e(window).width()<=l.floatWidth,t.optDiv.toggleClass("isFloating",t.is_floating),t.is_floating||t.optDiv.css("height",""),t.optDiv.toggleClass("okCancelInMulti",l.okCancelInMulti&&!t.is_floating)},vRange:function(e){var t=this;if(opts=t.E.children("option"),opts.length<=e||0>e)throw"index out of bounds";return t},toggSel:function(e,t){var l=this.vRange(t);l.E.children("option")[t].disabled||(l.E.children("option")[t].selected=e,l.mob||l.optDiv.find("ul.options li").eq(t).toggleClass("selected",e),l.setText())},toggDis:function(e,t){var l=this.vRange(t);l.E.children("option")[t].disabled=e,e&&(l.E.children("option")[t].selected=!1),l.mob||l.optDiv.find("ul.options li").eq(t).toggleClass("disabled",e).removeClass("selected"),l.setText()},toggSumo:function(e){var t=this;return t.enabled=e,t.select.toggleClass("disabled",e),e?(t.E.attr("disabled","disabled"),t.select.removeAttr("tabindex")):(t.E.removeAttr("disabled"),t.select.attr("tabindex","0")),t},toggSelAll:function(t){var i=this;i.E.find("option").each(function(l,s){i.E.find("option")[e(this).index()].disabled||(i.E.find("option")[e(this).index()].selected=t,i.mob||i.optDiv.find("ul.options li").eq(e(this).index()).toggleClass("selected",t),i.setText())}),!i.mob&&l.selectAll&&i.selAll.removeClass("partial").toggleClass("selected",t)},reload:function(){var t=this.unload();return e(t).SumoSelect(l)},unload:function(){var e=this;return e.select.before(e.E),e.E.show(),l.outputAsCSV&&e.is_multi&&e.select.find("input.HEMANT123").length&&e.E.attr("name",e.select.find("input.HEMANT123").attr("name")),e.select.remove(),delete t.sumo,t},add:function(l,i,s){if("undefined"==typeof l)throw"No value to add";var n=this;if(opts=n.E.children("option"),"number"==typeof i&&(s=i,i=l),"undefined"==typeof i&&(i=l),opt=e("<option></option>").val(l).html(i),opts.length<s)throw"index out of bounds";return"undefined"==typeof s||opts.length==s?(n.E.append(opt),n.mob||n.createLi(opt)):(opts.eq(s).before(opt),n.mob||n.createLi(opt,s)),t},remove:function(e){var t=this.vRange(e);t.E.children("option").eq(e).remove(),t.mob||t.optDiv.find("ul.options li").eq(e).remove(),t.setText()},selectItem:function(e){this.toggSel(!0,e)},unSelectItem:function(e){this.toggSel(!1,e)},selectAll:function(){this.toggSelAll(!0)},unSelectAll:function(){this.toggSelAll(!1)},disableItem:function(e){this.toggDis(!0,e)},enableItem:function(e){this.toggDis(!1,e)},enabled:!0,enable:function(){return this.toggSumo(!1)},disable:function(){return this.toggSumo(!0)},init:function(){var e=this;return e.createElems(),e.setText(),e}},t.sumo.init())});return 1==s.length?s[0]:s}}(jQuery);;


!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return f({type:O.error,iconClass:g().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=g()),v=e("#"+t.containerId),v.length?v:(n&&(v=c(t)),v)}function i(e,t,n){return f({type:O.info,iconClass:g().iconClasses.info,message:e,optionsOverride:n,title:t})}function o(e){w=e}function s(e,t,n){return f({type:O.success,iconClass:g().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return f({type:O.warning,iconClass:g().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e){var t=g();v||n(t),l(e,t)||u(t)}function d(t){var i=g();return v||n(i),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function u(t){for(var n=v.children(),i=n.length-1;i>=0;i--)l(e(n[i]),t)}function l(t,n){return t&&0===e(":focus",t).length?(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0):!1}function c(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass).attr("aria-live","polite").attr("role","alert"),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:"<button>&times;</button>",newestOnTop:!0,preventDuplicates:!1,progressBar:!1}}function m(e){w&&w(e)}function f(t){function i(t){return!e(":focus",l).length||t?(clearTimeout(O.intervalId),l[r.hideMethod]({duration:r.hideDuration,easing:r.hideEasing,complete:function(){h(l),r.onHidden&&"hidden"!==b.state&&r.onHidden(),b.state="hidden",b.endTime=new Date,m(b)}})):void 0}function o(){(r.timeOut>0||r.extendedTimeOut>0)&&(u=setTimeout(i,r.extendedTimeOut),O.maxHideTime=parseFloat(r.extendedTimeOut),O.hideEta=(new Date).getTime()+O.maxHideTime)}function s(){clearTimeout(u),O.hideEta=0,l.stop(!0,!0)[r.showMethod]({duration:r.showDuration,easing:r.showEasing})}function a(){var e=(O.hideEta-(new Date).getTime())/O.maxHideTime*100;f.width(e+"%")}var r=g(),d=t.iconClass||r.iconClass;if(r.preventDuplicates){if(t.message===C)return;C=t.message}"undefined"!=typeof t.optionsOverride&&(r=e.extend(r,t.optionsOverride),d=t.optionsOverride.iconClass||d),T++,v=n(r,!0);var u=null,l=e("<div/>"),c=e("<div/>"),p=e("<div/>"),f=e("<div/>"),w=e(r.closeHtml),O={intervalId:null,hideEta:null,maxHideTime:null},b={toastId:T,state:"visible",startTime:new Date,options:r,map:t};return t.iconClass&&l.addClass(r.toastClass).addClass(d),t.title&&(c.append(t.title).addClass(r.titleClass),l.append(c)),t.message&&(p.append(t.message).addClass(r.messageClass),l.append(p)),r.closeButton&&(w.addClass("toast-close-button").attr("role","button"),l.prepend(w)),r.progressBar&&(f.addClass("toast-progress"),l.prepend(f)),l.hide(),r.newestOnTop?v.prepend(l):v.append(l),l[r.showMethod]({duration:r.showDuration,easing:r.showEasing,complete:r.onShown}),r.timeOut>0&&(u=setTimeout(i,r.timeOut),O.maxHideTime=parseFloat(r.timeOut),O.hideEta=(new Date).getTime()+O.maxHideTime,r.progressBar&&(O.intervalId=setInterval(a,10))),l.hover(s,o),!r.onclick&&r.tapToDismiss&&l.click(i),r.closeButton&&w&&w.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),i(!0)}),r.onclick&&l.click(function(){r.onclick(),i()}),m(b),r.debug&&console&&console.log(b),l}function g(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&v.remove())}var v,w,C,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:d,error:t,getContainer:n,info:i,options:{},subscribe:o,success:s,version:"2.1.0",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});;

