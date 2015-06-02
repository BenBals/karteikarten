var x;x=function(e){var n;return n={},n.selector=e,n.element=function(){return document.querySelector(n.selector)},n.elements=function(){return document.querySelectorAll(n.selector)},n.e=n.element,n.es=n.elements,n.addClass=function(e,t){var o,s,l,r,a;if(void 0===t)for(s=n.elements(),r=0,a=s.length;a>r;r++)l=s[r],l.className===l.className.split(e).join("")&&(""===l.className?l.className=e:l.className+=" "+e);else{if(t>=n.elements().length||0>t)return console.warn("You provided an index ("+t+") that is out of range to a x.addClass. The selector was "+n.selector),null;o=n.elements()[t],""===o.className?o.className=e:o.className+=" "+e}return this},n.append=function(e,t){var o,s,l,r,a;if(void 0===t)for(s=n.es(),r=0,a=s.length;a>r;r++)l=s[r],l.innerHTML+=e;else{if(t>=n.elements().length||0>t)return console.warn("You provided an index ("+t+") that is out of range to a x.append. The selector was "+n.selector),null;o=n.es()[t],o.innerHTML+=e}return this},n.css=function(e,t,o){var s,l,r,a,i,u,c,d,f;if(void 0===o){if("object"==typeof e&&void 0===t)for(l=n.es(),console.log(l),u=0,d=l.length;d>u;u++){i=l[u],console.log(i);for(r in e)a=e[r],e.hasOwnProperty(r)&&(console.log("css: "+r+": "+a),i.style[r]=a)}for(l=n.es(),c=0,f=l.length;f>c;c++)i=l[c],i.style[e]=t}else{if(o>=n.elements().length||0>o)return console.warn("You provided an index ("+o+") that is out of range to a x.css. The selector was "+n.selector),null;s=n.es()[o],s.style[e]=t}return this},n.each=function(e,t){var o,s,l,r,a;if(void 0===t)for(s=n.es(),r=0,a=s.length;a>r;r++)l=s[r],e(l);else{if(t>=n.elements().length||0>t)return console.warn("You provided an index ("+t+") that is out of range to a x.each. The selector was "+n.selector),null;o=n.es()[t],e(o)}return this},n.html=function(e,t){var o,s,l,r,a,i,u,c;if(void 0!==e&&"number"!=typeof e){if(void 0===t)for(s=n.es(),r=0,i=s.length;i>r;r++)l=s[r],l.innerHTML=e;else{if(t>=n.elements().length||0>t)return console.warn("You provided an index ("+t+") that is out of range to a x.html. The selector was "+n.selector),null;o=n.es()[t],o.innerHTML=e}return this}if(void 0===e){for(c=[],s=n.es(),a=0,u=s.length;u>a;a++)l=s[a],c.push(l.innerHTML);return c}return e>=n.elements().length||0>e?(console.warn("You provided an index ("+e+") that is out of range to a x.html. The selector was "+n.selector),null):n.es()[e].innerHTML},n.httpReq=function(e,n,t,o){var s;return s=new XMLHttpRequest,s.open("GET",e,!0),s.onload=function(){if(this.status>=200&&this.status<400){if(n)return n(this)}else if(t)return t(this)},s.onerror=function(){return o?o(this):!o&&t?t(this):void 0},s.send(),s},n.on=function(e,t,o){var s,l,r,a,i;if(l=function(n){return n.addEventListener(e,t,!1)},void 0!==o){if(o>=n.elements().length||0>o)return console.warn("You provided an index ("+o+") that is out of range to a x.on. The selector was "+n.selector),null}else for(s=n.es(),a=0,i=s.length;i>a;a++)r=s[a],l(r);return this},n.ready=function(e){return"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)},n.removeAllClasses=function(e){var t,o,s,l,r;if(void 0===e)for(o=n.elements(),l=0,r=o.length;r>l;l++)s=o[l],s.className="";else{if(e>=n.elements().length||0>e)return console.warn("You provided an index ("+e+") that is out of range to a x.removeAllClasses. The selector was "+n.selector),null;t=n.elements()[e],t.className=""}return this},n.removeClass=function(e,t){var o,s,l,r,a;if(void 0===t)for(s=n.elements(),r=0,a=s.length;a>r;r++)l=s[r],l.className=l.className.split(e).join("").split("  ").join(" ").trim();else{if(t>=n.elements().length||0>t)return console.warn("You provided an index ("+t+") that is out of range to a x.removeClass. The selector was "+n.selector),null;o=n.elements()[t],o.className=o.className.split(e).join("").split("  ").join(" ").trim()}return this},n.toggle=function(e){var t,o,s,l,r;if(r=function(e){return console.log(getComputedStyle(e).display),e.style.display="none"===getComputedStyle(e).display?"block":"none"},"number"==typeof e){if(e>=n.elements().length||0>e)return console.warn("You provided an index ("+e+") that is out of range to a x.toggle. The selector was "+n.selector),null;r(n.es()[e])}else for(t=n.es(),s=0,l=t.length;l>s;s++)o=t[s],r(o);return n},n.val=function(e,t){var o,s,l,r,a,i,u,c;if(void 0!==e&&"number"!=typeof e){if(void 0===t)for(s=n.es(),r=0,i=s.length;i>r;r++)l=s[r],l.value=e;else{if(t>=n.elements().length||0>t)return console.warn("You provided an index ("+t+") that is out of range to a x.val. The selector was "+n.selector),null;o=n.es()[t],o.vaule=e}return this}if(void 0===e){for(c=[],s=n.es(),a=0,u=s.length;u>a;a++)l=s[a],c.push(l.value);return c}return e>=n.elements().length||0>e?(console.warn("You provided an index ("+e+") that is out of range to a x.val. The selector was "+n.selector),null):n.es()[e].value},n};;


!function(name,context,definition){if(typeof module!=="undefined")module.exports=definition(name,context);else if(typeof define==="function"&&typeof define.amd==="object")define(definition);else context[name]=definition(name,context)}("humane",this,function(name,context){var win=window;var doc=document;var ENV={on:function(el,type,cb){"addEventListener"in win?el.addEventListener(type,cb,false):el.attachEvent("on"+type,cb)},off:function(el,type,cb){"removeEventListener"in win?el.removeEventListener(type,cb,false):el.detachEvent("on"+type,cb)},bind:function(fn,ctx){return function(){fn.apply(ctx,arguments)}},isArray:Array.isArray||function(obj){return Object.prototype.toString.call(obj)==="[object Array]"},config:function(preferred,fallback){return preferred!=null?preferred:fallback},transSupport:false,useFilter:/msie [678]/i.test(navigator.userAgent),_checkTransition:function(){var el=doc.createElement("div");var vendors={webkit:"webkit",Moz:"",O:"o",ms:"MS"};for(var vendor in vendors)if(vendor+"Transition"in el.style){this.vendorPrefix=vendors[vendor];this.transSupport=true}}};ENV._checkTransition();var Humane=function(o){o||(o={});this.queue=[];this.baseCls=o.baseCls||"humane";this.addnCls=o.addnCls||"";this.timeout="timeout"in o?o.timeout:2500;this.waitForMove=o.waitForMove||false;this.clickToClose=o.clickToClose||false;this.timeoutAfterMove=o.timeoutAfterMove||false;this.container=o.container;try{this._setupEl()}catch(e){ENV.on(win,"load",ENV.bind(this._setupEl,this))}};Humane.prototype={constructor:Humane,_setupEl:function(){var el=doc.createElement("div");el.style.display="none";if(!this.container){if(doc.body)this.container=doc.body;else throw"document.body is null"}this.container.appendChild(el);this.el=el;this.removeEvent=ENV.bind(function(){var timeoutAfterMove=ENV.config(this.currentMsg.timeoutAfterMove,this.timeoutAfterMove);if(!timeoutAfterMove){this.remove()}else{setTimeout(ENV.bind(this.remove,this),timeoutAfterMove)}},this);this.transEvent=ENV.bind(this._afterAnimation,this);this._run()},_afterTimeout:function(){if(!ENV.config(this.currentMsg.waitForMove,this.waitForMove))this.remove();else if(!this.removeEventsSet){ENV.on(doc.body,"mousemove",this.removeEvent);ENV.on(doc.body,"click",this.removeEvent);ENV.on(doc.body,"keypress",this.removeEvent);ENV.on(doc.body,"touchstart",this.removeEvent);this.removeEventsSet=true}},_run:function(){if(this._animating||!this.queue.length||!this.el)return;this._animating=true;if(this.currentTimer){clearTimeout(this.currentTimer);this.currentTimer=null}var msg=this.queue.shift();var clickToClose=ENV.config(msg.clickToClose,this.clickToClose);if(clickToClose){ENV.on(this.el,"click",this.removeEvent);ENV.on(this.el,"touchstart",this.removeEvent)}var timeout=ENV.config(msg.timeout,this.timeout);if(timeout>0)this.currentTimer=setTimeout(ENV.bind(this._afterTimeout,this),timeout);if(ENV.isArray(msg.html))msg.html="<ul><li>"+msg.html.join("<li>")+"</ul>";this.el.innerHTML=msg.html;this.currentMsg=msg;this.el.className=this.baseCls;if(ENV.transSupport){this.el.style.display="block";setTimeout(ENV.bind(this._showMsg,this),50)}else{this._showMsg()}},_setOpacity:function(opacity){if(ENV.useFilter){try{this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity=opacity*100}catch(err){}}else{this.el.style.opacity=String(opacity)}},_showMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-animate"}else{var opacity=0;this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-js-animate";this._setOpacity(0);this.el.style.display="block";var self=this;var interval=setInterval(function(){if(opacity<1){opacity+=.1;if(opacity>1)opacity=1;self._setOpacity(opacity)}else clearInterval(interval)},30)}},_hideMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls;ENV.on(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent)}else{var opacity=1;var self=this;var interval=setInterval(function(){if(opacity>0){opacity-=.1;if(opacity<0)opacity=0;self._setOpacity(opacity)}else{self.el.className=self.baseCls+" "+addnCls;clearInterval(interval);self._afterAnimation()}},30)}},_afterAnimation:function(){if(ENV.transSupport)ENV.off(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent);if(this.currentMsg.cb)this.currentMsg.cb();this.el.style.display="none";this._animating=false;this._run()},remove:function(e){var cb=typeof e=="function"?e:null;ENV.off(doc.body,"mousemove",this.removeEvent);ENV.off(doc.body,"click",this.removeEvent);ENV.off(doc.body,"keypress",this.removeEvent);ENV.off(doc.body,"touchstart",this.removeEvent);ENV.off(this.el,"click",this.removeEvent);ENV.off(this.el,"touchstart",this.removeEvent);this.removeEventsSet=false;if(cb&&this.currentMsg)this.currentMsg.cb=cb;if(this._animating)this._hideMsg();else if(cb)cb()},log:function(html,o,cb,defaults){var msg={};if(defaults)for(var opt in defaults)msg[opt]=defaults[opt];if(typeof o=="function")cb=o;else if(o)for(var opt in o)msg[opt]=o[opt];msg.html=html;if(cb)msg.cb=cb;this.queue.push(msg);this._run();return this},spawn:function(defaults){var self=this;return function(html,o,cb){self.log.call(self,html,o,cb,defaults);return self}},create:function(o){return new Humane(o)}};return new Humane});;


var addQueryVar, animationTime, answer, answerRight, answerWrong, check, data, flipCard, flipElement, getQueryVar, init, loadData, nextCard, playAgainAllCards, playAgainWrongCards, playAgian, reset, setProgressBar, setState, setTextOnCard, updateProgressBar;

console.log('karteikarten v0.4 - BETA barium bear');

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
  urls = [];
  if (queryURL) {
    urls = queryURL.trim().split(',');
  } else if (x('.dataSelect').val() === null) {
    urls = x('input.jsonUrl').val().trim().split(', ').join(',').split(',');
  } else {
    urls = x('.dataSelect').val();
  }
  console.log('the urls are ');
  console.log(urls);
  humane.log('Laden...');
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
      console.log(loadedData);
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
  console.log('runnig playAgian');
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
  console.log('runnig flip card');
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
  console.log('running setTextOnCard');
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
  console.log(ev.keyCode);
  console.log(data.state);
  if (ev.keyCode === 13) {
    if (data.state === 'front') {
      return check();
    } else if (data.state === 'back') {
      console.log('running hk back');
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


(function () {
	var options = document.getElementsByTagName('option');
	var selected = [];
	var select;

	function setSelected() {
	  for (var i in options)
	    options[i].selected = selected[i];
	}

	function getSelected() {
	  for (var i in options)
	    selected[i] = options[i].selected;
	}

	function init() {
	  for (var i = 0; i < options.length; i++) {
	    options[i].onmousedown = function(e) {
	      var j = e.target.index;
	      selected[j] = !selected[j];
	      setSelected();
	      
	      return false;
	    }
	  }
	}

	init();
})()
;

