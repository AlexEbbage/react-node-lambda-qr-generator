(this["webpackJsonpreact-node-lambda-qr-generator"]=this["webpackJsonpreact-node-lambda-qr-generator"]||[]).push([[0],{11:function(e,t,n){},13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(4),c=n.n(o),l=(n(11),n(2)),u=n.n(l),s=n(5),i=n(1),m=(n(13),function(e){var t=Object(a.useState)("WPA/WPA2"),n=Object(i.a)(t,2),o=n[0],c=n[1],l=Object(a.useState)(""),u=Object(i.a)(l,2),s=u[0],m=u[1],p=Object(a.useState)(""),d=Object(i.a)(p,2),b=d[0],h=d[1],g=Object(a.useState)(!1),f=Object(i.a)(g,2),E=f[0],v=f[1];return r.a.createElement("div",null,r.a.createElement("select",{defaultValue:o,onChange:function(e){return c(e.target.value)}},r.a.createElement("option",null,"WPA/WPA2"),r.a.createElement("option",null,"WEP"),r.a.createElement("option",null,"None")),r.a.createElement("input",{type:"text",placeholder:"SSID",onChange:function(e){return m(e.target.value)}}),r.a.createElement("input",{type:"text",placeholder:"Password",onChange:function(e){return h(e.target.value)}}),r.a.createElement("span",null,"Hidden ",r.a.createElement("input",{type:"checkbox",onChange:function(e){return v(e.target.value)}})),r.a.createElement("button",{type:"button",onClick:function(){return e.submitSettings(o,s,b,E)}},"Submit"))}),p=function(e){var t=e.qr;return r.a.createElement("img",{src:t,alt:"Generated QR Code."})};var d=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],o=t[1],c=function(){var e=Object(s.a)(u.a.mark((function e(t,n,a,r){var c,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://imi4ns5dpb.execute-api.eu-west-1.amazonaws.com/prod/qr-generator/generateCode",{method:"POST",body:JSON.stringify({type:t,SSID:n,password:a,hidden:r})});case 3:return c=e.sent,e.next=6,c.text();case 6:l=e.sent,c.ok?o(l):console.error("Error ".concat(c.status,". ").concat(l)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n,a,r){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},""!==n&&r.a.createElement(p,{qr:n}),r.a.createElement(m,{submitSettings:c}),r.a.createElement("p",null,"react-node-lambda-qr-generator ",r.a.createElement("a",{href:"https://github.com/AlexEbbage/react-node-lambda-qr-generator",target:"_blank",rel:"noopener noreferrer"},"GitHub")),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,n){e.exports=n(14)}},[[6,1,2]]]);
//# sourceMappingURL=main.f544b6c4.chunk.js.map