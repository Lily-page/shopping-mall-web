(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9408"],{"31c7":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t._self._c;return e("div",[e("el-result",{attrs:{icon:"success",title:t.msg,subTitle:"您已经成功付款，请继续关注后续进度"}},[e("template",{slot:"extra"},[e("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.toHome}},[t._v("返回首页")])],1)],2)],1)},o=[],n=(s("14d9"),{data(){return{msg:""}},created(){this.getResult()},methods:{toHome(){this.$router.push("home")},async getResult(){let t={out_trade_no:this.$route.query.out_trade_no,trade_no:this.$route.query.trade_no};const e=await this.$http.post("/queryOrder",this.$qs.stringify(t),{headers:{"content-type":"application/x-www-form-urlencoded"}});this.msg=e.data.msg}}}),u=n,a=s("2877"),i=Object(a["a"])(u,r,o,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d0b9408.638052b6.js.map