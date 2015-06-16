var x;x=function(e){var t;return t={},t.selector=e,t.element=function(){return document.querySelector(t.selector)},t.elements=function(){return document.querySelectorAll(t.selector)},t.e=t.element,t.es=t.elements,t.addClass=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.elements(),l=0,a=s.length;a>l;l++)r=s[l],r.className===r.className.split(e).join("")&&(""===r.className?r.className=e:r.className+=" "+e);else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.addClass. The selector was "+t.selector),null;o=t.elements()[n],""===o.className?o.className=e:o.className+=" "+e}return this},t.append=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.es(),l=0,a=s.length;a>l;l++)r=s[l],r.innerHTML+=e;else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.append. The selector was "+t.selector),null;o=t.es()[n],o.innerHTML+=e}return this},t.css=function(e,n,o){var s,r,l,a,i,u,c,f,d;if(void 0===o){if("object"==typeof e&&void 0===n)for(r=t.es(),u=0,f=r.length;f>u;u++){i=r[u];for(l in e)a=e[l],e.hasOwnProperty(l)&&(i.style[l]=a)}for(r=t.es(),c=0,d=r.length;d>c;c++)i=r[c],i.style[e]=n}else{if(o>=t.elements().length||0>o)return console.warn("You provided an index ("+o+") that is out of range to a x.css. The selector was "+t.selector),null;s=t.es()[o],s.style[e]=n}return this},t.each=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.es(),l=0,a=s.length;a>l;l++)r=s[l],e(r);else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.each. The selector was "+t.selector),null;o=t.es()[n],e(o)}return this},t.html=function(e,n){var o,s,r,l,a,i,u,c;if(void 0!==e&&"number"!=typeof e){if(void 0===n)for(s=t.es(),l=0,i=s.length;i>l;l++)r=s[l],r.innerHTML=e;else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.html. The selector was "+t.selector),null;o=t.es()[n],o.innerHTML=e}return this}if(void 0===e){for(c=[],s=t.es(),a=0,u=s.length;u>a;a++)r=s[a],c.push(r.innerHTML);return c}return e>=t.elements().length||0>e?(console.warn("You provided an index ("+e+") that is out of range to a x.html. The selector was "+t.selector),null):t.es()[e].innerHTML},t.httpReq=function(e,t,n,o){var s;return s=new XMLHttpRequest,s.open("GET",e,!0),s.onload=function(){if(this.status>=200&&this.status<400){if(t)return t(this)}else if(n)return n(this)},s.onerror=function(){return o?o(this):!o&&n?n(this):void 0},s.send(),s},t.on=function(e,n,o){var s,r,l,a,i;if(r=function(t){return t.addEventListener(e,n,!1)},void 0!==o){if(o>=t.elements().length||0>o)return console.warn("You provided an index ("+o+") that is out of range to a x.on. The selector was "+t.selector),null}else for(s=t.es(),a=0,i=s.length;i>a;a++)l=s[a],r(l);return this},t.ready=function(e){return"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)},t.removeAllClasses=function(e){var n,o,s,r,l;if(void 0===e)for(o=t.elements(),r=0,l=o.length;l>r;r++)s=o[r],s.className="";else{if(e>=t.elements().length||0>e)return console.warn("You provided an index ("+e+") that is out of range to a x.removeAllClasses. The selector was "+t.selector),null;n=t.elements()[e],n.className=""}return this},t.removeClass=function(e,n){var o,s,r,l,a;if(void 0===n)for(s=t.elements(),l=0,a=s.length;a>l;l++)r=s[l],r.className=r.className.split(e).join("").split("  ").join(" ").trim();else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.removeClass. The selector was "+t.selector),null;o=t.elements()[n],o.className=o.className.split(e).join("").split("  ").join(" ").trim()}return this},t.toggle=function(e){var n,o,s,r,l;if(l=function(e){return e.style.display="none"===getComputedStyle(e).display?"block":"none"},"number"==typeof e){if(e>=t.elements().length||0>e)return console.warn("You provided an index ("+e+") that is out of range to a x.toggle. The selector was "+t.selector),null;l(t.es()[e])}else for(n=t.es(),s=0,r=n.length;r>s;s++)o=n[s],l(o);return t},t.val=function(e,n){var o,s,r,l,a,i,u,c;if(void 0!==e&&"number"!=typeof e){if(void 0===n)for(s=t.es(),l=0,i=s.length;i>l;l++)r=s[l],r.value=e;else{if(n>=t.elements().length||0>n)return console.warn("You provided an index ("+n+") that is out of range to a x.val. The selector was "+t.selector),null;o=t.es()[n],o.vaule=e}return this}if(void 0===e){for(c=[],s=t.es(),a=0,u=s.length;u>a;a++)r=s[a],c.push(r.value);return c}return e>=t.elements().length||0>e?(console.warn("You provided an index ("+e+") that is out of range to a x.val. The selector was "+t.selector),null):t.es()[e].value},t};;


!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var o={exports:{}};t(o.exports,o),e.autosize=o.exports}}(this,function(e,t){"use strict";function o(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),l="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),n()}function o(t){var o=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=o,u=t,a&&(e.style.overflowY=t),n()}function n(){var t=e.style.height,n=document.documentElement.scrollTop,i=document.body.scrollTop,r=e.style.height;e.style.height="auto";var d=e.scrollHeight+l;if(0===e.scrollHeight)return void(e.style.height=r);e.style.height=d+"px",document.documentElement.scrollTop=n,document.body.scrollTop=i;var s=window.getComputedStyle(e,null);if(s.height!==e.style.height){if("visible"!==u)return void o("visible")}else if("hidden"!==u)return void o("hidden");if(t!==e.style.height){var a=document.createEvent("Event");a.initEvent("autosize:resized",!0,!1),e.dispatchEvent(a)}}var i=void 0===arguments[1]?{}:arguments[1],r=i.setOverflowX,d=void 0===r?!0:r,s=i.setOverflowY,a=void 0===s?!0:s;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!e.hasAttribute("data-autosize-on")){var l=null,u="hidden",v=function(t){window.removeEventListener("resize",n),e.removeEventListener("input",n),e.removeEventListener("keyup",n),e.removeAttribute("data-autosize-on"),e.removeEventListener("autosize:destroy",v),Object.keys(t).forEach(function(o){e.style[o]=t[o]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",v),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",n),window.addEventListener("resize",n),e.addEventListener("input",n),e.addEventListener("autosize:update",n),e.setAttribute("data-autosize-on",!0),a&&(e.style.overflowY="hidden"),d&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function n(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var r=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(r=function(e){return e},r.destroy=function(e){return e},r.update=function(e){return e}):(r=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return o(e,t)}),e},r.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],n),e},r.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=r});;


!function(name,context,definition){if(typeof module!=="undefined")module.exports=definition(name,context);else if(typeof define==="function"&&typeof define.amd==="object")define(definition);else context[name]=definition(name,context)}("humane",this,function(name,context){var win=window;var doc=document;var ENV={on:function(el,type,cb){"addEventListener"in win?el.addEventListener(type,cb,false):el.attachEvent("on"+type,cb)},off:function(el,type,cb){"removeEventListener"in win?el.removeEventListener(type,cb,false):el.detachEvent("on"+type,cb)},bind:function(fn,ctx){return function(){fn.apply(ctx,arguments)}},isArray:Array.isArray||function(obj){return Object.prototype.toString.call(obj)==="[object Array]"},config:function(preferred,fallback){return preferred!=null?preferred:fallback},transSupport:false,useFilter:/msie [678]/i.test(navigator.userAgent),_checkTransition:function(){var el=doc.createElement("div");var vendors={webkit:"webkit",Moz:"",O:"o",ms:"MS"};for(var vendor in vendors)if(vendor+"Transition"in el.style){this.vendorPrefix=vendors[vendor];this.transSupport=true}}};ENV._checkTransition();var Humane=function(o){o||(o={});this.queue=[];this.baseCls=o.baseCls||"humane";this.addnCls=o.addnCls||"";this.timeout="timeout"in o?o.timeout:2500;this.waitForMove=o.waitForMove||false;this.clickToClose=o.clickToClose||false;this.timeoutAfterMove=o.timeoutAfterMove||false;this.container=o.container;try{this._setupEl()}catch(e){ENV.on(win,"load",ENV.bind(this._setupEl,this))}};Humane.prototype={constructor:Humane,_setupEl:function(){var el=doc.createElement("div");el.style.display="none";if(!this.container){if(doc.body)this.container=doc.body;else throw"document.body is null"}this.container.appendChild(el);this.el=el;this.removeEvent=ENV.bind(function(){var timeoutAfterMove=ENV.config(this.currentMsg.timeoutAfterMove,this.timeoutAfterMove);if(!timeoutAfterMove){this.remove()}else{setTimeout(ENV.bind(this.remove,this),timeoutAfterMove)}},this);this.transEvent=ENV.bind(this._afterAnimation,this);this._run()},_afterTimeout:function(){if(!ENV.config(this.currentMsg.waitForMove,this.waitForMove))this.remove();else if(!this.removeEventsSet){ENV.on(doc.body,"mousemove",this.removeEvent);ENV.on(doc.body,"click",this.removeEvent);ENV.on(doc.body,"keypress",this.removeEvent);ENV.on(doc.body,"touchstart",this.removeEvent);this.removeEventsSet=true}},_run:function(){if(this._animating||!this.queue.length||!this.el)return;this._animating=true;if(this.currentTimer){clearTimeout(this.currentTimer);this.currentTimer=null}var msg=this.queue.shift();var clickToClose=ENV.config(msg.clickToClose,this.clickToClose);if(clickToClose){ENV.on(this.el,"click",this.removeEvent);ENV.on(this.el,"touchstart",this.removeEvent)}var timeout=ENV.config(msg.timeout,this.timeout);if(timeout>0)this.currentTimer=setTimeout(ENV.bind(this._afterTimeout,this),timeout);if(ENV.isArray(msg.html))msg.html="<ul><li>"+msg.html.join("<li>")+"</ul>";this.el.innerHTML=msg.html;this.currentMsg=msg;this.el.className=this.baseCls;if(ENV.transSupport){this.el.style.display="block";setTimeout(ENV.bind(this._showMsg,this),50)}else{this._showMsg()}},_setOpacity:function(opacity){if(ENV.useFilter){try{this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity=opacity*100}catch(err){}}else{this.el.style.opacity=String(opacity)}},_showMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-animate"}else{var opacity=0;this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-js-animate";this._setOpacity(0);this.el.style.display="block";var self=this;var interval=setInterval(function(){if(opacity<1){opacity+=.1;if(opacity>1)opacity=1;self._setOpacity(opacity)}else clearInterval(interval)},30)}},_hideMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls;ENV.on(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent)}else{var opacity=1;var self=this;var interval=setInterval(function(){if(opacity>0){opacity-=.1;if(opacity<0)opacity=0;self._setOpacity(opacity)}else{self.el.className=self.baseCls+" "+addnCls;clearInterval(interval);self._afterAnimation()}},30)}},_afterAnimation:function(){if(ENV.transSupport)ENV.off(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent);if(this.currentMsg.cb)this.currentMsg.cb();this.el.style.display="none";this._animating=false;this._run()},remove:function(e){var cb=typeof e=="function"?e:null;ENV.off(doc.body,"mousemove",this.removeEvent);ENV.off(doc.body,"click",this.removeEvent);ENV.off(doc.body,"keypress",this.removeEvent);ENV.off(doc.body,"touchstart",this.removeEvent);ENV.off(this.el,"click",this.removeEvent);ENV.off(this.el,"touchstart",this.removeEvent);this.removeEventsSet=false;if(cb&&this.currentMsg)this.currentMsg.cb=cb;if(this._animating)this._hideMsg();else if(cb)cb()},log:function(html,o,cb,defaults){var msg={};if(defaults)for(var opt in defaults)msg[opt]=defaults[opt];if(typeof o=="function")cb=o;else if(o)for(var opt in o)msg[opt]=o[opt];msg.html=html;if(cb)msg.cb=cb;this.queue.push(msg);this._run();return this},spawn:function(defaults){var self=this;return function(html,o,cb){self.log.call(self,html,o,cb,defaults);return self}},create:function(o){return new Humane(o)}};return new Humane});;


var appendNewRow, changedData, closeModal, config, data, dataObjToView, getDataJsonString, load, loadFromLocalStorage, openModal, publish, saveToLocalStorage, setModal, viewToDataObj;

console.log('karteikarten creator v0.2 - ALPHA concerned caro');

x('').ready(function() {
  loadFromLocalStorage();
  return dataObjToView();
});

autosize(x('textarea').es());

data = {
  config: {
    random: true
  },
  data: []
};

config = {
  animationTime: 500
};

appendNewRow = function() {
  var tr;
  tr = document.createElement('tr');
  tr.innerHTML = '<td><textarea placeholder="Vorderseite"></textarea></td><td><textarea placeholder="Rückseite"></textarea></td>';
  x('tbody').e().appendChild(tr);
  return x('tbody > tr').on('keypress', changedData);
};

changedData = function() {
  console.log('changedData');
  return setTimeout(function() {
    if (x('tbody > tr:last-child > td > textarea').val()[0] !== '' || x('tbody > tr:last-child > td > textarea').val()[1] !== '') {
      console.log('changed last-child');
      appendNewRow();
    }
    viewToDataObj();
    return saveToLocalStorage();
  }, 5);
};

dataObjToView = function() {
  var card, i, len, ref, tr;
  x('tbody').html('');
  ref = data.data;
  for (i = 0, len = ref.length; i < len; i++) {
    card = ref[i];
    tr = document.createElement('tr');
    tr.innerHTML = "<td><textarea placeholder='Vorderseite'>" + card[0] + "</textarea></td><td><textarea placeholder='Rückseite'>" + card[1] + "</textarea></td>";
    x('tbody').e().appendChild(tr);
  }
  return appendNewRow();
};

getDataJsonString = function() {
  return JSON.stringify(data);
};

load = function(obj) {
  data = obj;
  return dataObjToView();
};

loadFromLocalStorage = function() {
  return data = JSON.parse(localStorage.data);
};

publish = function() {
  var publishObj, request;
  publishObj = {
    description: 'karteikarten data json obj',
    "public": true,
    files: {
      'data.json': {
        content: getDataJsonString()
      }
    }
  };
  request = new XMLHttpRequest();
  request.addEventListener('load', function(e) {
    var response, url;
    response = JSON.parse(e.target.responseText);
    url = response.files['data.json'].raw_url;
    console.log(response);
    console.log(url);
    closeModal();
    return setTimeout(function() {
      setModal('published');
      x('.gistUrl').val(url);
      return openModal();
    }, config.animationTime);
  });
  request.addEventListener('error', function(e) {
    console.error(e);
    return humane.log('There was an error publishing. Try again later.');
  });
  request.open('POST', 'https://api.github.com/gists');
  return request.send(JSON.stringify(publishObj));
};

saveToLocalStorage = function() {
  return localStorage.data = JSON.stringify(data);
};

viewToDataObj = function() {
  var i, ref, rückseite, textareas, trN, trs, vorderseite;
  trs = x('tr').es().length - 2;
  data.data = [];
  for (trN = i = 1, ref = trs; 1 <= ref ? i <= ref : i >= ref; trN = 1 <= ref ? ++i : --i) {
    textareas = x('tr:nth-child(' + trN + ') > td > textarea').val();
    vorderseite = textareas[0];
    rückseite = textareas[1];
    data.data.push([vorderseite, rückseite]);
  }
  return true;
};

setModal = function(whatClass) {
  x('.modal .' + whatClass).css('display', 'block');
  if (whatClass === 'export') {
    return x('.modal .export textarea').val(getDataJsonString());
  }
};

openModal = function() {
  x('.modal').addClass('swingIn');
  x('.modal').css('display', 'block');
  return setTimeout(function() {
    return x('.modal').removeClass('swingIn');
  }, config.animationTime);
};

closeModal = function() {
  x('.modal').addClass('swingOut');
  return setTimeout(function() {
    x('.modal').css('display', 'none');
    x('.modal .export').css('display', 'none');
    x('.modal .load').css('display', 'none');
    x('.modal .publish').css('display', 'none');
    return x('.modal').removeClass('swingOut');
  }, config.animationTime);
};

x('tbody > tr').on('keypress', changedData);

x('.closeModal').on('click', closeModal);

x('.exportBtn').on('click', function() {
  setModal('export');
  return openModal();
});

x('.newBtn').on('click', function() {
  data.data = [];
  saveToLocalStorage();
  return dataObjToView();
});

x('.publishBtn').on('click', function() {
  setModal('publish');
  return openModal();
});

x('.loadBtn').on('click', function() {
  setModal('load');
  return openModal();
});

x('.publishGo').on('click', publish);

x('.loadGo').on('click', function() {
  load(JSON.parse(x('.inputJson').val()));
  return closeModal();
});
