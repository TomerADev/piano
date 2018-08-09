!function(e){"use strict";var t,n,i,s,a,r;function o(){}function h(){this.inputInUse=!1,this.outputInUse=!1;var e=document.createElement("object");e.id="_Jazz"+Math.random()+"ie",e.classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90",this.activeX=e;var t=document.createElement("object");t.id="_Jazz"+Math.random(),t.type="audio/x-jazz",e.appendChild(t),this.objRef=t;var n=document.createElement("p");n.appendChild(document.createTextNode("This page requires the "));var i,s=document.createElement("a");(s.appendChild(document.createTextNode("Jazz plugin")),s.href="http://jazz-soft.net/",n.appendChild(s),n.appendChild(document.createTextNode(".")),t.appendChild(n),i=document.getElementById("MIDIPlugin"))||((i=document.createElement("div")).id="MIDIPlugin",i.style.position="absolute",i.style.visibility="hidden",i.style.left="-9999px",i.style.top="-9999px",document.body.appendChild(i));i.appendChild(e),this.objRef.isJazz?this._Jazz=this.objRef:this.activeX.isJazz?this._Jazz=this.activeX:this._Jazz=null,this._Jazz&&(this._Jazz._jazzTimeZero=this._Jazz.Time(),this._Jazz._perfTimeZero=window.performance.now())}o.prototype.then=function(e,t){this.accept=e,this.reject=t},o.prototype.succeed=function(e){this.accept&&this.accept(e)},o.prototype.fail=function(e){this.reject&&this.reject(e)},t=function(){return(new n)._promise},n=function(){this._jazzInstances=new Array,this._jazzInstances.push(new h),this._promise=new o,this._jazzInstances[0]._Jazz?(this._Jazz=this._jazzInstances[0]._Jazz,window.setTimeout(i.bind(this),3)):window.setTimeout(function(){this._promise&&this._promise.fail({code:1})}.bind(this),3)},i=function(){this._promise&&this._promise.succeed(this)},n.prototype.inputs=function(){if(!this._Jazz)return null;for(var e=this._Jazz.MidiInList(),t=new Array(e.length),n=0;n<e.length;n++)t[n]=new s(this,e[n],n);return t},n.prototype.outputs=function(){if(!this._Jazz)return null;for(var e=this._Jazz.MidiOutList(),t=new Array(e.length),n=0;n<e.length;n++)t[n]=new a(this,e[n],n);return t},(s=function(e,t,n){this._listeners=[],this._midiAccess=e,this._index=n,this._inLongSysexMessage=!1,this._sysexBuffer=new Uint8Array,this.id=n+"."+t,this.manufacturer="",this.name=t,this.type="input",this.version="",this.onmidimessage=null;for(var i=null,s=0;s<e._jazzInstances.length&&!i;s++)e._jazzInstances[s].inputInUse||(i=e._jazzInstances[s]);i||(i=new h,e._jazzInstances.push(i)),i.inputInUse=!0,this._jazzInstance=i._Jazz,this._input=this._jazzInstance.MidiInOpen(this._index,r.bind(this))}).prototype.addEventListener=function(e,t,n){if("midimessage"===e){for(var i=0;i<this._listeners.length;i++)if(this._listeners[i]==t)return;this._listeners.push(t)}},s.prototype.removeEventListener=function(e,t,n){if("midimessage"===e)for(var i=0;i<this._listeners.length;i++)if(this._listeners[i]==t)return void this._listeners.splice(i,1)},s.prototype.preventDefault=function(){this._pvtDef=!0},s.prototype.dispatchEvent=function(e){this._pvtDef=!1;for(var t=0;t<this._listeners.length;t++)this._listeners[t].handleEvent?this._listeners[t].handleEvent.bind(this)(e):this._listeners[t].bind(this)(e);return this.onmidimessage&&this.onmidimessage(e),this._pvtDef},s.prototype.appendToSysexBuffer=function(e){var t=this._sysexBuffer.length,n=new Uint8Array(t+e.length);n.set(this._sysexBuffer),n.set(e,t),this._sysexBuffer=n},s.prototype.bufferLongSysex=function(e,t){for(var n=t;n<e.length;){if(247==e[n])return n++,this.appendToSysexBuffer(e.slice(t,n)),n;n++}return this.appendToSysexBuffer(e.slice(t,n)),this._inLongSysexMessage=!0,n},r=function(e,t){var n,i=0,s=!1;for(n=0;n<t.length;n+=i){if(this._inLongSysexMessage){if(247!=t[(n=this.bufferLongSysex(t,n))-1])return;s=!0}else switch(s=!1,240&t[n]){case 128:case 144:case 160:case 176:case 224:i=3;break;case 192:case 208:i=2;break;case 240:switch(t[n]){case 240:if(247!=t[(n=this.bufferLongSysex(t,n))-1])return;s=!0;break;case 241:case 243:i=2;break;case 242:i=3;break;default:i=1}}var a=document.createEvent("Event");a.initEvent("midimessage",!1,!1),a.receivedTime=parseFloat(e.toString())+this._jazzInstance._perfTimeZero,s||this._inLongSysexMessage?(a.data=new Uint8Array(this._sysexBuffer),this._sysexBuffer=new Uint8Array(0),this._inLongSysexMessage=!1):a.data=new Uint8Array(t.slice(n,i+n)),this.dispatchEvent(a)}},(a=function(e,t,n){this._listeners=[],this._midiAccess=e,this._index=n,this.id=n+"."+t,this.manufacturer="",this.name=t,this.type="output",this.version="";for(var i=null,s=0;s<e._jazzInstances.length&&!i;s++)e._jazzInstances[s].outputInUse||(i=e._jazzInstances[s]);i||(i=new h,e._jazzInstances.push(i)),i.outputInUse=!0,this._jazzInstance=i._Jazz,this._jazzInstance.MidiOutOpen(this.name)}).prototype.send=function(e,t){var n=0;if(0===e.length)return!1;if(t&&(n=Math.floor(t-window.performance.now())),t&&n>1){var i=new Object;i.jazz=this._jazzInstance,i.data=e,window.setTimeout(function(){this.jazz.MidiOutLong(this.data)}.bind(i),n)}else this._jazzInstance.MidiOutLong(e);return!0},window.navigator.requestMIDIAccess||(window.navigator.requestMIDIAccess=t)}(window),function(e){var t,n={};"performance"in e&&"now"in e.performance||("performance"in e||Object.defineProperty(e,"performance",{get:function(){return n}}),t=function(){for(var t,n=["moz","webkit","o","ms"],i=n.length,s={value:(t=Date.now(),function(){return Date.now()-t})};i>=0;i--)if(n[i]+"Now"in e.performance)return s.value=function(t){return function(){e.performance[t]()}}(n[i]+"Now"),s;return"timing"in e.performance&&"connectStart"in e.performance.timing&&(s.value=(e.performance.timing.connectStart,function(){Date.now()})),s}(),Object.defineProperty(e.performance,"now",t))}(window);