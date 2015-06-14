var x;x=function(e){var t;return t={},t.selector=e,t.element=function(){return document.querySelector(t.selector)},t.elements=function(){return document.querySelectorAll(t.selector)},t.e=t.element,t.es=t.elements,t.addClass=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.elements(),l=0,a=s.length;a>l;l++)r=s[l],r.className===r.className.split(e).join("")&&(""===r.className?r.className=e:r.className+=" "+e);else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.addClass. The selector was "+t.selector),null;o=t.elements()[n],""===o.className?o.className=e:o.className+=" "+e}return this},t.append=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.es(),l=0,a=s.length;a>l;l++)r=s[l],r.innerHTML+=e;else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.append. The selector was "+t.selector),null;o=t.es()[n],o.innerHTML+=e}return this},t.css=function(e,n,o){var s,r,l,a,i,u,c,f,d;if(void 0===o){if("object"==typeof e&&void 0===n)for(r=t.es(),u=0,f=r.length;f>u;u++){i=r[u];for(l in e)a=e[l],e.hasOwnProperty(l)&&(i.style[l]=a)}for(r=t.es(),c=0,d=r.length;d>c;c++)i=r[c],i.style[e]=n}else{if(o>=t.elements().length||0>o)return console.warn("You provided an index ("+o+") that is out of range to a x.css. The selector was "+t.selector),null;s=t.es()[o],s.style[e]=n}return this},t.each=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.es(),l=0,a=s.length;a>l;l++)r=s[l],e(r);else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.each. The selector was "+t.selector),null;o=t.es()[n],e(o)}return this},t.html=function(e,n){var o,s,r,l,a,i,u,c;if(void 0!==e&&"number"!=typeof e){if(void 0===n)for(s=t.es(),l=0,i=s.length;i>l;l++)r=s[l],r.innerHTML=e;else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.html. The selector was "+t.selector),null;o=t.es()[n],o.innerHTML=e}return this}if(void 0===e){for(c=[],s=t.es(),a=0,u=s.length;u>a;a++)r=s[a],c.push(r.innerHTML);return c}return e>=t.elements().length||0>e?(console.warn("You provided an index ("+e+") that is out of range to a x.html. The selector was "+t.selector),null):t.es()[e].innerHTML},t.httpReq=function(e,t,n,o){var s;return s=new XMLHttpRequest,s.open("GET",e,!0),s.onload=function(){if(this.status>=200&&this.status<400){if(t)return t(this)}else if(n)return n(this)},s.onerror=function(){return o?o(this):!o&&n?n(this):void 0},s.send(),s},t.on=function(e,n,o){var s,r,l,a,i;if(r=function(t){return t.addEventListener(e,n,!1)},void 0!==o){if(o>=t.elements().length||0>o)return console.warn("You provided an index ("+o+") that is out of range to a x.on. The selector was "+t.selector),null}else for(s=t.es(),a=0,i=s.length;i>a;a++)l=s[a],r(l);return this},t.ready=function(e){return"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)},t.removeAllClasses=function(e){var n,o,s,r,l;if(void 0===e)for(o=t.elements(),r=0,l=o.length;l>r;r++)s=o[r],s.className="";else{if(e>=t.elements().length||0>e)return console.warn("You provided an index ("+e+") that is out of range to a x.removeAllClasses. The selector was "+t.selector),null;n=t.elements()[e],n.className=""}return this},t.removeClass=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.elements(),l=0,a=s.length;a>l;l++)r=s[l],r.className=r.className.split(e).join("").split("  ").join(" ").trim();else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.removeClass. The selector was "+t.selector),null;o=t.elements()[n],o.className=o.className.split(e).join("").split("  ").join(" ").trim()}return this},t.toggle=function(e){var n,o,s,r,l;if(l=function(e){return e.style.display="none"===getComputedStyle(e).display?"block":"none"},"number"==typeof e){if(e>=t.elements().length||0>e)return console.warn("You provided an index ("+e+") that is out of range to a x.toggle. The selector was "+t.selector),null;l(t.es()[e])}else for(n=t.es(),s=0,r=n.length;r>s;s++)o=n[s],l(o);return t},t.val=function(e,n){var o,s,r,l,a,i,u,c;if(void 0!==e&&"number"!=typeof e){if(void 0===n)for(s=t.es(),l=0,i=s.length;i>l;l++)r=s[l],r.value=e;else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.val. The selector was "+t.selector),null;o=t.es()[n],o.vaule=e}return this}if(void 0===e){for(c=[],s=t.es(),a=0,u=s.length;u>a;a++)r=s[a],c.push(r.value);return c}return e>=t.elements().length||0>e?(console.warn("You provided an index ("+e+") that is out of range to a x.val. The selector was "+t.selector),null):t.es()[e].value},t};;


!function(name,context,definition){if(typeof module!=="undefined")module.exports=definition(name,context);else if(typeof define==="function"&&typeof define.amd==="object")define(definition);else context[name]=definition(name,context)}("humane",this,function(name,context){var win=window;var doc=document;var ENV={on:function(el,type,cb){"addEventListener"in win?el.addEventListener(type,cb,false):el.attachEvent("on"+type,cb)},off:function(el,type,cb){"removeEventListener"in win?el.removeEventListener(type,cb,false):el.detachEvent("on"+type,cb)},bind:function(fn,ctx){return function(){fn.apply(ctx,arguments)}},isArray:Array.isArray||function(obj){return Object.prototype.toString.call(obj)==="[object Array]"},config:function(preferred,fallback){return preferred!=null?preferred:fallback},transSupport:false,useFilter:/msie [678]/i.test(navigator.userAgent),_checkTransition:function(){var el=doc.createElement("div");var vendors={webkit:"webkit",Moz:"",O:"o",ms:"MS"};for(var vendor in vendors)if(vendor+"Transition"in el.style){this.vendorPrefix=vendors[vendor];this.transSupport=true}}};ENV._checkTransition();var Humane=function(o){o||(o={});this.queue=[];this.baseCls=o.baseCls||"humane";this.addnCls=o.addnCls||"";this.timeout="timeout"in o?o.timeout:2500;this.waitForMove=o.waitForMove||false;this.clickToClose=o.clickToClose||false;this.timeoutAfterMove=o.timeoutAfterMove||false;this.container=o.container;try{this._setupEl()}catch(e){ENV.on(win,"load",ENV.bind(this._setupEl,this))}};Humane.prototype={constructor:Humane,_setupEl:function(){var el=doc.createElement("div");el.style.display="none";if(!this.container){if(doc.body)this.container=doc.body;else throw"document.body is null"}this.container.appendChild(el);this.el=el;this.removeEvent=ENV.bind(function(){var timeoutAfterMove=ENV.config(this.currentMsg.timeoutAfterMove,this.timeoutAfterMove);if(!timeoutAfterMove){this.remove()}else{setTimeout(ENV.bind(this.remove,this),timeoutAfterMove)}},this);this.transEvent=ENV.bind(this._afterAnimation,this);this._run()},_afterTimeout:function(){if(!ENV.config(this.currentMsg.waitForMove,this.waitForMove))this.remove();else if(!this.removeEventsSet){ENV.on(doc.body,"mousemove",this.removeEvent);ENV.on(doc.body,"click",this.removeEvent);ENV.on(doc.body,"keypress",this.removeEvent);ENV.on(doc.body,"touchstart",this.removeEvent);this.removeEventsSet=true}},_run:function(){if(this._animating||!this.queue.length||!this.el)return;this._animating=true;if(this.currentTimer){clearTimeout(this.currentTimer);this.currentTimer=null}var msg=this.queue.shift();var clickToClose=ENV.config(msg.clickToClose,this.clickToClose);if(clickToClose){ENV.on(this.el,"click",this.removeEvent);ENV.on(this.el,"touchstart",this.removeEvent)}var timeout=ENV.config(msg.timeout,this.timeout);if(timeout>0)this.currentTimer=setTimeout(ENV.bind(this._afterTimeout,this),timeout);if(ENV.isArray(msg.html))msg.html="<ul><li>"+msg.html.join("<li>")+"</ul>";this.el.innerHTML=msg.html;this.currentMsg=msg;this.el.className=this.baseCls;if(ENV.transSupport){this.el.style.display="block";setTimeout(ENV.bind(this._showMsg,this),50)}else{this._showMsg()}},_setOpacity:function(opacity){if(ENV.useFilter){try{this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity=opacity*100}catch(err){}}else{this.el.style.opacity=String(opacity)}},_showMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-animate"}else{var opacity=0;this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-js-animate";this._setOpacity(0);this.el.style.display="block";var self=this;var interval=setInterval(function(){if(opacity<1){opacity+=.1;if(opacity>1)opacity=1;self._setOpacity(opacity)}else clearInterval(interval)},30)}},_hideMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls;ENV.on(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent)}else{var opacity=1;var self=this;var interval=setInterval(function(){if(opacity>0){opacity-=.1;if(opacity<0)opacity=0;self._setOpacity(opacity)}else{self.el.className=self.baseCls+" "+addnCls;clearInterval(interval);self._afterAnimation()}},30)}},_afterAnimation:function(){if(ENV.transSupport)ENV.off(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent);if(this.currentMsg.cb)this.currentMsg.cb();this.el.style.display="none";this._animating=false;this._run()},remove:function(e){var cb=typeof e=="function"?e:null;ENV.off(doc.body,"mousemove",this.removeEvent);ENV.off(doc.body,"click",this.removeEvent);ENV.off(doc.body,"keypress",this.removeEvent);ENV.off(doc.body,"touchstart",this.removeEvent);ENV.off(this.el,"click",this.removeEvent);ENV.off(this.el,"touchstart",this.removeEvent);this.removeEventsSet=false;if(cb&&this.currentMsg)this.currentMsg.cb=cb;if(this._animating)this._hideMsg();else if(cb)cb()},log:function(html,o,cb,defaults){var msg={};if(defaults)for(var opt in defaults)msg[opt]=defaults[opt];if(typeof o=="function")cb=o;else if(o)for(var opt in o)msg[opt]=o[opt];msg.html=html;if(cb)msg.cb=cb;this.queue.push(msg);this._run();return this},spawn:function(defaults){var self=this;return function(html,o,cb){self.log.call(self,html,o,cb,defaults);return self}},create:function(o){return new Humane(o)}};return new Humane});;


var addQueryVar, animationTime, answer, answerRight, answerWrong, check, data, flipCard, flipElement, getMultiselectValues, getQueryVar, init, loadData, nextCard, playAgainAllCards, playAgainWrongCards, playAgian, reset, setProgressBar, setState, setTextOnCard, updateProgressBar;

console.log('karteikarten v0.5.3 - BETA ceasium chameleon');

x('.ready').ready(function() {
  humane.clickToClose = true;
  if (getQueryVar('dataURL') !== false) {
    return loadData(getQueryVar('dataURL'));
  }
});

animationTime = 500;

data = {};

data.allCards = [];

data.random = false;

data.state = 'selectData';

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
  setTextOnCard();
  return updateProgressBar();
};

loadData = function(queryURL) {
  var checkDataLoad, k, len, loadFail, loadedData, url, urls;
  console.log('running loadData');
  urls = [];
  if (queryURL) {
    urls = queryURL.trim().split(',');
  } else if (x('.dataSelect').val()[0] === "") {
    urls = x('input.jsonUrl').val()[0].trim().split(', ').join(',').split(',');
  } else {
    urls = getMultiselectValues();
  }
  humane.log('Laden...');
  console.log(urls);
  loadedData = [];
  loadFail = false;
  for (k = 0, len = urls.length; k < len; k++) {
    url = urls[k];
    url = url.split('gist.githubusercontent.com').join('cdn.rawgit.com');
    if (window.location.hostname === 'localhost') {
      url = url.split('cdn.').join('');
    }
    x().httpReq(url, function(req) {
      loadedData.push(JSON.parse(req.response));
      return checkDataLoad();
    }, function() {
      loadFail = true;
      return checkDataLoad();
    });
    console.log('start loading', url);
  }
  return checkDataLoad = function() {
    var dataThing, l, len1;
    if (loadFail) {
      humane.remove();
      humane.log('Es ist ein Fehler beim Laden der Daten aufgetreten. Kontrolliere die URL(s) bzw. die Datenquelle(n).');
    }
    if (loadedData.length === urls.length) {
      console.log('all data loaded');
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
          if (dataThing instanceof Array) {
            data.allCards = data.allCards.concat(dataThing);
          } else {
            data.allCards = data.allCards.concat(dataThing.data);
          }
        }
        data.allCards.shuffle();
      }
      humane.remove();
      flipCard();
      setTimeout(function() {
        init();
        setState('front');
        x('.progressbar').css('display', 'block');
        return updateProgressBar();
      }, animationTime / 2);
      addQueryVar('dataURL', urls.join(','));
      return humane.log('Kopiere einfach die URL aus der Leiste und sende sende sie an jemandem und er spielt mit den gleichen karteikarten.');
    }
  };
};

nextCard = function(wrongBool) {
  updateProgressBar();
  if (wrongBool) {
    x('.card').addClass('swingOut-wrong');
  } else {
    x('.card').addClass('swingOut-right');
  }
  setTimeout(function() {
    x('.card').removeClass('swingOut-wrong');
    x('.card').removeClass('swingOut-right');
    x('.card').addClass('swingIn');
    return setTimeout(function() {
      return x('.card').removeClass('swingIn');
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
  return setTimeout(function() {
    return setState('front');
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
  x(selector).addClass('flip');
  return setTimeout(function() {
    return x(selector).removeClass('flip');
  }, animationTime);
};

flipCard = function() {
  if (data.state === 'front') {
    data.state = 'back';
  } else if (data.state === 'back') {
    data.state = 'front';
  }
  flipElement('.card');
  return setTimeout(function() {
    x('.front').toggle();
    return x('.back').toggle();
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

getMultiselectValues = function() {
  var k, len, option, options, results;
  results = [];
  options = x('.dataSelect option').es();
  for (k = 0, len = options.length; k < len; k++) {
    option = options[k];
    if (option.selected) {
      results.push(option.value);
    }
  }
  return results;
};

setProgressBar = function(right, wrong) {
  x('.progressbar .right').css('width', right + '%');
  x('.progressbar .wrong').css('width', wrong + '%');
  return x('.progressbar .wrong').css('left', right + '%');
};

setState = function(stateId) {
  data.state = stateId;
  x('.front').css('display', 'none');
  x('.back').css('display', 'none');
  x('.allDone').css('display', 'none');
  x('.selectData').css('display', 'none');
  return x('.' + stateId).css('display', 'block');
};

setTextOnCard = function() {
  if (data.allCards.length === 0) {
    console.log('there is no data');
    return setState('selectData');
  } else if (data.unansweredCards.length > 0) {
    x('.q').html(data.unansweredCards[0][0]);
    x('.a').html(data.unansweredCards[0][1]);
    return setState('front');
  } else {
    setState('allDone');
    humane.log('Psst. Profi-Tipp: Benutze <a href="https://github.com/BenBals/karteikarten/blob/master/README.md#shortcuts">Shortcuts<a>, wenn du auf einem Computer spielst.');
    if (data.wrongCards.length === 0) {
      return x('.btnAgainWrong').css('display', 'none');
    } else {
      return x('.btnAgainWrong').css('display', 'block');
    }
  }
};

updateProgressBar = function() {
  var currentCardAmount, right, wrong;
  currentCardAmount = data.unansweredCards.length + data.rightCards.length + data.wrongCards.length;
  right = data.rightCards.length / currentCardAmount * 100;
  wrong = data.wrongCards.length / currentCardAmount * 100;
  return setProgressBar(right, wrong);
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

x('.checkBtn').on('click', function() {
  return check();
});

x('.btnRight, .btnWrong').on('click', function() {
  return answer();
});

x('.btnRight').on('click', function() {
  return answerRight();
});

x('.btnWrong').on('click', function() {
  return answerWrong();
});

x('.btnAgainAll, .btnAgainWrong').on('click', function() {
  return playAgian();
});

x('.btnAgainAll').on('click', function() {
  return playAgainAllCards();
});

x('.btnAgainWrong').on('click', function() {
  return playAgainWrongCards();
});

x('.btnSubmitJson').on('click', function() {
  return loadData();
});

x('.btnReset').on('click', function() {
  return reset();
});

x('body').on('keypress', function(ev) {
  if (ev.keyCode === 13) {
    if (data.state === 'front') {
      return check();
    } else if (data.state === 'back') {
      answer();
      return answerRight();
    } else if (data.state === 'allDone') {
      playAgian();
      return playAgainAllCards();
    } else if (data.state === 'selectData') {
      return loadData();
    }
  } else if (ev.keyCode === 32) {
    if (data.state === 'back') {
      answer();
      return answerWrong();
    } else if (data.state === 'allDone') {
      playAgian();
      return playAgainWrongCards();
    }
  } else if (ev.keyCode === 82) {
    return reset();
  }
});

(function() {
  var getSelected, init, options, select, selected, setSelected;
  options = document.getElementsByTagName('option');
  setSelected = function() {
    var i;
    window.multiSelectSelected = [];
    for (i in options) {
      options[i].selected = selected[i];
    }
  };
  getSelected = function() {
    var i;
    for (i in options) {
      selected[i] = options[i].selected;
    }
  };
  init = function() {
    var i;
    i = 0;
    while (i < options.length) {
      options[i].onmousedown = function(e) {
        var j;
        j = e.target.index;
        selected[j] = !selected[j];
        setSelected();
        return false;
      };
      i++;
    }
  };
  selected = [];
  select = void 0;
  init();
})();
