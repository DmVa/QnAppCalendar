/*
dhtmlxScheduler v.4.3.0 Professional

This software is covered by DHTMLX Enterprise License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){e._grid={sort_rules:{"int":function(e,t,i){return 1*i(e)<1*i(t)?1:-1},str:function(e,t,i){return i(e)<i(t)?1:-1},date:function(e,t,i){return new Date(i(e))<new Date(i(t))?1:-1}},_getObjName:function(e){return"grid_"+e},_getViewName:function(e){return e.replace(/^grid_/,"")}}}(),e.createGridView=function(t){function i(e){return!(void 0!==e&&(1*e!=e||0>e))}var a=t.name||"grid",n=e._grid._getObjName(a);e.config[a+"_start"]=t.from||new Date(0),e.config[a+"_end"]=t.to||new Date(9999,1,1),e[n]=t,e[n].defPadding=8,e[n].columns=e[n].fields,e[n].unit=t.unit||"month",e[n].step=t.step||1,delete e[n].fields;
for(var r=e[n].columns,s=0;s<r.length;s++)i(r[s].width)&&(r[s].initialWidth=r[s].width),i(r[s].paddingLeft)||delete r[s].paddingLeft,i(r[s].paddingRight)||delete r[s].paddingRight;e[n].select=void 0===t.select?!0:t.select,void 0===e.locale.labels[a+"_tab"]&&(e.locale.labels[a+"_tab"]=e[n].label||e.locale.labels.grid_tab),e[n]._selected_divs=[],e.date[a+"_start"]=function(i){return e.date[t.unit+"_start"]?e.date[t.unit+"_start"](i):i},e.date["add_"+a]=function(t,i){return e.date.add(t,i*e[n].step,e[n].unit)
},e.templates[a+"_date"]=function(t,i){return e.templates.day_date(t)+" - "+e.templates.day_date(i)},e.templates[a+"_full_date"]=function(t,i,n){return e.isOneDayEvent(n)?this[a+"_single_date"](t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(i)},e.templates[a+"_single_date"]=function(t){return e.templates.day_date(t)+" "+this.event_date(t)},e.templates[a+"_field"]=function(e,t){return t[e]},e.attachEvent("onTemplatesReady",function(){e.attachEvent("onDblClick",function(t){return this._mode==a?(e._click.buttons.details(t),!1):!0
}),e.attachEvent("onClick",function(t,i){return this._mode==a&&e[n].select?(e._grid.unselectEvent("",a),e._grid.selectEvent(t,a,i),!1):!0});var t=e.render_data;e.render_data=function(){return this._mode!=a?t.apply(this,arguments):void e._grid._fill_grid_tab(n)};var i=e.render_view_data;e.render_view_data=function(){var t=e._els.dhx_cal_data[0].lastChild;return this._mode==a&&t&&(e._grid._gridScrollTop=t.scrollTop),i.apply(this,arguments)}}),e[a+"_view"]=function(t){if(e._grid._sort_marker=null,delete e._gridView,e._grid._gridScrollTop=0,e._rendered=[],e[n]._selected_divs=[],t){var i=null,r=null,s=e[n];
s.paging?(i=e.date[a+"_start"](new Date(e._date)),r=e.date["add_"+a](i,1)):(i=e.config[a+"_start"],r=e.config[a+"_end"]),e._min_date=i,e._max_date=r,e._grid.set_full_view(n);var d="";+i>+new Date(0)&&+r<+new Date(9999,1,1)&&(d=e.templates[a+"_date"](i,r)),e._els.dhx_cal_date[0].innerHTML=d,e._gridView=n}}},e.dblclick_dhx_grid_area=function(){!this.config.readonly&&this.config.dblclick_create&&this.addEventNow()},e._click.dhx_cal_header&&(e._old_header_click=e._click.dhx_cal_header),e._click.dhx_cal_header=function(t){if(e._gridView){var i=t||window.event,a=e._grid.get_sort_params(i,e._gridView);
e._grid.draw_sort_marker(i.originalTarget||i.srcElement,a.dir),e.clear_view(),e._grid._fill_grid_tab(e._gridView,a)}else if(e._old_header_click)return e._old_header_click.apply(this,arguments)},e._grid.selectEvent=function(t,i,a){if(e.callEvent("onBeforeRowSelect",[t,a])){var n=e._grid._getObjName(i);e.for_rendered(t,function(t){t.className+=" dhx_grid_event_selected",e[n]._selected_divs.push(t)}),e._select_id=t}},e._grid._unselectDiv=function(e){e.className=e.className.replace(/ dhx_grid_event_selected/,"")
},e._grid.unselectEvent=function(t,i){var a=e._grid._getObjName(i);if(a&&e[a]._selected_divs)if(t){for(var n=0;n<e[a]._selected_divs.length;n++)if(e[a]._selected_divs[n].getAttribute("event_id")==t){e._grid._unselectDiv(e[a]._selected_divs[n]),e[a]._selected_divs.slice(n,1);break}}else{for(var n=0;n<e[a]._selected_divs.length;n++)e._grid._unselectDiv(e[a]._selected_divs[n]);e[a]._selected_divs=[]}},e._grid.get_sort_params=function(t,i){var a=t.originalTarget||t.srcElement,n="desc";"dhx_grid_view_sort"==a.className&&(a=a.parentNode),a.className&&-1!=a.className.indexOf("dhx_grid_sort_asc")||(n="asc");
for(var r=0,s=0;s<a.parentNode.childNodes.length;s++)if(a.parentNode.childNodes[s]==a){r=s;break}var d=null;if(e[i].columns[r].template){var o=e[i].columns[r].template;d=function(e){return o(e.start_date,e.end_date,e)}}else{var l=e[i].columns[r].id;"date"==l&&(l="start_date"),d=function(e){return e[l]}}var _=e[i].columns[r].sort;return"function"!=typeof _&&(_=e._grid.sort_rules[_]||e._grid.sort_rules.str),{dir:n,value:d,rule:_}},e._grid.draw_sort_marker=function(t,i){"dhx_grid_view_sort"==t.className&&(t=t.parentNode),e._grid._sort_marker&&(e._grid._sort_marker.className=e._grid._sort_marker.className.replace(/( )?dhx_grid_sort_(asc|desc)/,""),e._grid._sort_marker.removeChild(e._grid._sort_marker.lastChild)),t.className+=" dhx_grid_sort_"+i,e._grid._sort_marker=t;
var a="<div class='dhx_grid_view_sort' style='left:"+(+t.style.width.replace("px","")-15+t.offsetLeft)+"px'>&nbsp;</div>";t.innerHTML+=a},e._grid.sort_grid=function(t){var t=t||{dir:"desc",value:function(e){return e.start_date},rule:e._grid.sort_rules.date},i=e.get_visible_events();return i.sort("desc"==t.dir?function(e,i){return t.rule(e,i,t.value)}:function(e,i){return-t.rule(e,i,t.value)}),i},e._grid.set_full_view=function(t){if(t){var i=(e.locale.labels,e._grid._print_grid_header(t));e._els.dhx_cal_header[0].innerHTML=i,e._table_view=!0,e.set_sizes()
}},e._grid._calcPadding=function(t,i){var a=(void 0!==t.paddingLeft?1*t.paddingLeft:e[i].defPadding)+(void 0!==t.paddingRight?1*t.paddingRight:e[i].defPadding);return a},e._grid._getStyles=function(e,t){for(var i=[],a="",n=0;t[n];n++)switch(a=t[n]+":",t[n]){case"text-align":e.align&&i.push(a+e.align);break;case"vertical-align":e.valign&&i.push(a+e.valign);break;case"padding-left":void 0!==e.paddingLeft&&i.push(a+(e.paddingLeft||"0")+"px");break;case"padding-right":void 0!==e.paddingRight&&i.push(a+(e.paddingRight||"0")+"px")
}return i},e._grid._fill_grid_tab=function(t,i){for(var a=(e._date,e._grid.sort_grid(i)),n=e[t].columns,r="<div>",s=-2,d=0;d<n.length;d++){var o=e._grid._calcPadding(n[d],t);s+=n[d].width+o,d<n.length-1&&(r+="<div class='dhx_grid_v_border' style='left:"+s+"px'></div>")}r+="</div>",r+="<div class='dhx_grid_area'><table>";for(var d=0;d<a.length;d++)r+=e._grid._print_event_row(a[d],t);r+="</table></div>",e._els.dhx_cal_data[0].innerHTML=r,e._els.dhx_cal_data[0].lastChild.scrollTop=e._grid._gridScrollTop||0;
var l=e._els.dhx_cal_data[0].getElementsByTagName("tr");e._rendered=[];for(var d=0;d<l.length;d++)e._rendered[d]=l[d]},e._grid._print_event_row=function(t,i){var a=[];t.color&&a.push("background:"+t.color),t.textColor&&a.push("color:"+t.textColor),t._text_style&&a.push(t._text_style),e[i].rowHeight&&a.push("height:"+e[i].rowHeight+"px");var n="";a.length&&(n="style='"+a.join(";")+"'");for(var r=e[i].columns,s=e.templates.event_class(t.start_date,t.end_date,t),d="<tr class='dhx_grid_event"+(s?" "+s:"")+"' event_id='"+t.id+"' "+n+">",o=e._grid._getViewName(i),l=["text-align","vertical-align","padding-left","padding-right"],_=0;_<r.length;_++){var h;
h=r[_].template?r[_].template(t.start_date,t.end_date,t):"date"==r[_].id?e.templates[o+"_full_date"](t.start_date,t.end_date,t):"start_date"==r[_].id||"end_date"==r[_].id?e.templates[o+"_single_date"](t[r[_].id]):e.templates[o+"_field"](r[_].id,t);var c=e._grid._getStyles(r[_],l),u=r[_].css?' class="'+r[_].css+'"':"";d+="<td style='width:"+r[_].width+"px;"+c.join(";")+"' "+u+">"+h+"</td>"}return d+="<td class='dhx_grid_dummy'></td></tr>"},e._grid._print_grid_header=function(t){for(var i="<div class='dhx_grid_line'>",a=e[t].columns,n=[],r=a.length,s=e._obj.clientWidth-2*a.length-20,d=0;d<a.length;d++){var o=1*a[d].initialWidth;
isNaN(o)||""===a[d].initialWidth||null===a[d].initialWidth||"boolean"==typeof a[d].initialWidth?n[d]=null:(r--,s-=o,n[d]=o)}for(var l=Math.floor(s/r),_=["text-align","padding-left","padding-right"],h=0;h<a.length;h++){var c=n[h]?n[h]:l;a[h].width=c-e._grid._calcPadding(a[h],t);var u=e._grid._getStyles(a[h],_);i+="<div style='width:"+(a[h].width-1)+"px;"+u.join(";")+"'>"+(void 0===a[h].label?a[h].id:a[h].label)+"</div>"}return i+="</div>"}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_grid_view.js.map