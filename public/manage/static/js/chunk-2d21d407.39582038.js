(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d407"],{d104:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-cascades"}),t._v(" 新闻管理")])],1)],1),a("div",{staticClass:"container"},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"新闻类别"}},[a("el-popover",{attrs:{placement:"right",trigger:"click"},model:{value:t.classVisible,callback:function(e){t.classVisible=e},expression:"classVisible"}},[a("el-tree",{attrs:{data:t.treeData,"default-expand-all":!0,"highlight-current":!0,"expand-on-click-node":!1,"check-on-click-node":!0},on:{"node-click":t.selectClass}}),a("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v(t._s(t.classPath))])],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.openAddnews}},[t._v("新增新闻")])],1)],1),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"id",label:"ID",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.date))]}}])}),a("el-table-column",{attrs:{prop:"title",label:"新闻标题",width:"120"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.date))]}}])})],1)],1),a("el-dialog",{attrs:{title:"新增新闻",visible:t.addVisible,width:"90%"},on:{"update:visible":function(e){t.addVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"新闻类别"}},[t._v("\n                "+t._s(t.classPath)+"\n            ")]),a("el-form-item",{attrs:{label:"新闻标题"}},[a("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"新闻内容"}},[a("quill-editor",{ref:"myTextEditor",model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addNews}},[t._v("确 定")])],1)],1)],1)},s=[],i=(a("3040"),a("cac2"),a("1e58"),a("b881")),o={name:"News",components:{quillEditor:i["quillEditor"]},data:function(){return{classVisible:!1,addVisible:!1,form:{classid:0,title:"",content:""},treeData:[{label:"全部分类",id:0}],classPath:"全部分类",tableData:[]}},created:function(){this.loadTreeData()},methods:{loadTreeData:function(){var t=this;t.$axios.get("/api/getClassTree").then(function(e){e.data.flag?t.$set(t.treeData[0],"children",e.data.data):alert(e.data.msg)})},selectClass:function(t,e,a){var l=[];function s(t){return l.push(t.label),t.parent.label?s(t.parent):l.reverse().join(" > ")}this.classVisible=!1,this.form.classid=e.data.id,this.classPath=s(e)},openAddnews:function(){this.form.title="",this.form.content="",this.addVisible=!0},addNews:function(){var t=this;t.$axios.post("/api/addnews",t.form).then(function(e){e.data.flag?(t.$message({type:"success",message:"添加成功!"}),t.addVisible=!1):t.$message({type:"error",message:e.data.msg})}).catch(function(){})}}},n=o,r=a("17cc"),c=Object(r["a"])(n,l,s,!1,null,"4ef27b54",null);e["default"]=c.exports}}]);