this["ts"] = this["ts"] || {};
this["ts"]["templates"] = this["ts"]["templates"] || {};
this["ts"]["templates"]["statsContainer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "<div class='stats-container'>\n    <a href='https://loki.dev.essentials.myob.com/LA/app.htm#businesses/1461289/invoices' class='label tag'>\n        <span class='badge blue'>"
    + alias1(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span> Invoices issued\n    </a>\n    <a href='#' class='label tag'>\n        <span class='badge red'>$"
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.due : depth0)) != null ? stack1.value : stack1), depth0))
    + "</span> Invoices due\n    </a>\n</div>";
},"useData":true});