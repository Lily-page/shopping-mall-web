(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8d96672a"],{"0c8c":function(t,s,r){"use strict";r("86c5")},"2bbb":function(t,s,r){"use strict";r.r(s);var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"payment container"},[s("div",{staticClass:"order-info clearfix"},[s("div",{staticClass:"fl order-info-left"},[t._v(" "+t._s(t.orderTips)+" ")]),s("div",{staticClass:"fr order-info-right"},[s("strong",{staticClass:"pay-price"},[t._v(t._s(t._f("keepTwoNum")(t.total)))]),s("em",[t._v("元")])])]),t._m(0),s("div",{staticClass:"trade-btn"},[s("el-button",{attrs:{type:"primary"},on:{click:t.toPay}},[t._v("立即支付")])],1)])},i=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"pay-cashier"},[s("h3",{staticClass:"pay-title"},[t._v("支付方式")]),s("div",{staticClass:"pay-pattern"},[s("img",{attrs:{src:"https://t.alipayobjects.com/images/rmsweb/T1.a4gXo4sXXXXXXXX.png"}})])])}],o={data(){return{orderId:"",total:"",goods:[]}},computed:{orderTips(){return"订单提交成功，请尽快付款！ 订单号："+this.orderId}},mounted(){this.orderId=this.$route.query.orderId,this.total=this.$route.query.total,this.goods=this.$route.query.goods&&JSON.parse(this.$route.query.goods)},methods:{async toPay(){let t={orderId:this.orderId,total:String(this.total)};const s=await this.$http.post("/pcAlipay",this.$qs.stringify(t),{headers:{"content-type":"application/x-www-form-urlencoded"}});window.location.href=s.data.result}}},e=o,c=(r("0c8c"),r("2877")),n=Object(c["a"])(e,a,i,!1,null,"138c323b",null);s["default"]=n.exports},"86c5":function(t,s,r){}}]);
//# sourceMappingURL=chunk-8d96672a.5ce44f76.js.map