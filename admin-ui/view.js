layui.define([],function(e){var t=layui.jquery,i=function(e){return new d(e)},s="LAY_app_body",d=function(e){this.id=e,this.container=t("#"+(e||s))};d.prototype.autoRender=function(e,a){var n=this;t(e||"body").find("*[template]").each(function(e,a){var r=t(this);n.container=r,n.parse(r,"refresh")})},e("view",i)});