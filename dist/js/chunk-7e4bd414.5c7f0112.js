(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e4bd414"],{2821:function(t,s,a){"use strict";a("8ed7")},"8ed7":function(t,s,a){},a770:function(t,s,a){},dd09:function(t,s,a){"use strict";a.r(s);var o=function(){var t=this,s=t._self._c;return s("div",{staticClass:"favorlist"},[s("el-tabs",{model:{value:t.activeName,callback:function(s){t.activeName=s},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"全部宝贝",name:"first"}},[s("favor-goods-list",{attrs:{goodsData:t.goodsList}})],1)],1)],1)},i=[],e=(a("14d9"),a("2f62")),r=function(){var t=this,s=t._self._c;return s("div",{staticClass:"grid_c1 more_inner"},[s("div",[s("ul",{staticClass:"more_list"},t._l(t.goodsData,(function(a,o){return s("li",{key:o,staticClass:"more_item more_item_good hover-on",on:{click:function(s){return t.toDetail(a.goodsId)}}},[s("span",{staticClass:"more_item_dot"}),s("a",{staticClass:"more_lk",attrs:{title:a.goodsName,"aria-label":a.goodsName}},[s("div",{staticClass:"lazyimg_loaded lazyimg more_img"},[s("img",{staticClass:"lazyimg",attrs:{src:a.goodsImageBig,alt:a.goodsName}})]),s("div",{staticClass:"more_info"},[s("p",{staticClass:"more_info_name"},[t._v(t._s(a.goodsName))]),s("div",{staticClass:"more_info_price more_info_plus"},[s("div",{staticClass:"mod_price"},[s("i",[t._v("¥")]),s("span",{staticClass:"more_info_price_txt"},[t._v(t._s(Number(a.salePrice).toFixed(2)))])])])])])])})),0)])])},l=[],n={props:{goodsData:{type:Array,default:()=>[]}},methods:{toDetail(t){this.$router.push({path:"/goodsDetail",query:{goodsId:t}})}}},c=n,d=(a("2821"),a("2877")),m=Object(d["a"])(c,r,l,!1,null,"272c4aa0",null),u=m.exports,f={components:{FavorGoodsList:u},data(){return{activeName:"first",goodsList:[]}},computed:{...Object(e["c"])(["login"])},created(){this.login?this.getFavorList():this.$router.push({path:"/login"})},methods:{async getFavorList(){var t;const s=await this.$http.get("/favorList");this.goodsList=null===(t=s.data)||void 0===t?void 0:t.favorList}}},_=f,g=(a("ffd7"),Object(d["a"])(_,o,i,!1,null,"fd7097f4",null));s["default"]=g.exports},ffd7:function(t,s,a){"use strict";a("a770")}}]);
//# sourceMappingURL=chunk-7e4bd414.5c7f0112.js.map