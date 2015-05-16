var addQueryVar, animationTime, answer, answerRight, answerWrong, check, data, flipCard, flipElement, getQueryVar, init, loadData, nextCard, playAgainAllCards, playAgainWrongCards, playAgian, setProgressBar, setTextOnCard, updateProgressBar;

console.log('karteikarten v0.2.2');

$(document).ready(function() {
  toastr.options.preventDuplicates = true;
  if (getQueryVar('dataURL') !== false) {
    return loadData(getQueryVar('dataURL'));
  }
});

animationTime = 500;

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
  var url;
  url = '';
  if (queryURL) {
    url = queryURL;
  } else if ($('.dataSelect').val() === '') {
    url = $('input.jsonUrl').val();
  } else {
    url = $('.dataSelect').val();
  }
  console.log(url);
  toastr.info('Laden...');
  return $.getJSON(url, function(jsonData) {
    console.log(typeof jsonData);
    if (jsonData instanceof Array) {
      data.allCards = jsonData;
    } else {
      data.allCards = jsonData.data.shuffle();
      data.random = jsonData.config.random;
    }
    console.log(jsonData);
    flipCard();
    return setTimeout(function() {
      init();
      $('.front').show();
      $('.back').hide();
      $('.allDone').hide();
      $('.selectData').hide();
      $('.progressbar').fadeIn('fast');
      return updateProgressBar();
    }, animationTime / 2);
  }).fail(function() {
    toastr.clear();
    return toastr.error('Es ist ein Fehler beim Laden der Daten aufgetreten. Kontrolliere die URL bzw. die Datenquelle.');
  }).done(function() {
    toastr.clear();
    addQueryVar('dataURL', url);
    return toastr.info('Kopiere einfach die URL aus der Leiste und sende sende sie an jemandem und er spielt mit den gleichen karteikarten.');
  });
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
  return window.location.href = window.location.href.split('#').join('');
});

!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return f({type:O.error,iconClass:g().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=g()),v=e("#"+t.containerId),v.length?v:(n&&(v=c(t)),v)}function i(e,t,n){return f({type:O.info,iconClass:g().iconClasses.info,message:e,optionsOverride:n,title:t})}function o(e){w=e}function s(e,t,n){return f({type:O.success,iconClass:g().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return f({type:O.warning,iconClass:g().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e){var t=g();v||n(t),l(e,t)||u(t)}function d(t){var i=g();return v||n(i),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function u(t){for(var n=v.children(),i=n.length-1;i>=0;i--)l(e(n[i]),t)}function l(t,n){return t&&0===e(":focus",t).length?(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0):!1}function c(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass).attr("aria-live","polite").attr("role","alert"),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:"<button>&times;</button>",newestOnTop:!0,preventDuplicates:!1,progressBar:!1}}function m(e){w&&w(e)}function f(t){function i(t){return!e(":focus",l).length||t?(clearTimeout(O.intervalId),l[r.hideMethod]({duration:r.hideDuration,easing:r.hideEasing,complete:function(){h(l),r.onHidden&&"hidden"!==b.state&&r.onHidden(),b.state="hidden",b.endTime=new Date,m(b)}})):void 0}function o(){(r.timeOut>0||r.extendedTimeOut>0)&&(u=setTimeout(i,r.extendedTimeOut),O.maxHideTime=parseFloat(r.extendedTimeOut),O.hideEta=(new Date).getTime()+O.maxHideTime)}function s(){clearTimeout(u),O.hideEta=0,l.stop(!0,!0)[r.showMethod]({duration:r.showDuration,easing:r.showEasing})}function a(){var e=(O.hideEta-(new Date).getTime())/O.maxHideTime*100;f.width(e+"%")}var r=g(),d=t.iconClass||r.iconClass;if(r.preventDuplicates){if(t.message===C)return;C=t.message}"undefined"!=typeof t.optionsOverride&&(r=e.extend(r,t.optionsOverride),d=t.optionsOverride.iconClass||d),T++,v=n(r,!0);var u=null,l=e("<div/>"),c=e("<div/>"),p=e("<div/>"),f=e("<div/>"),w=e(r.closeHtml),O={intervalId:null,hideEta:null,maxHideTime:null},b={toastId:T,state:"visible",startTime:new Date,options:r,map:t};return t.iconClass&&l.addClass(r.toastClass).addClass(d),t.title&&(c.append(t.title).addClass(r.titleClass),l.append(c)),t.message&&(p.append(t.message).addClass(r.messageClass),l.append(p)),r.closeButton&&(w.addClass("toast-close-button").attr("role","button"),l.prepend(w)),r.progressBar&&(f.addClass("toast-progress"),l.prepend(f)),l.hide(),r.newestOnTop?v.prepend(l):v.append(l),l[r.showMethod]({duration:r.showDuration,easing:r.showEasing,complete:r.onShown}),r.timeOut>0&&(u=setTimeout(i,r.timeOut),O.maxHideTime=parseFloat(r.timeOut),O.hideEta=(new Date).getTime()+O.maxHideTime,r.progressBar&&(O.intervalId=setInterval(a,10))),l.hover(s,o),!r.onclick&&r.tapToDismiss&&l.click(i),r.closeButton&&w&&w.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),i(!0)}),r.onclick&&l.click(function(){r.onclick(),i()}),m(b),r.debug&&console&&console.log(b),l}function g(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&v.remove())}var v,w,C,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:d,error:t,getContainer:n,info:i,options:{},subscribe:o,success:s,version:"2.1.0",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});;

