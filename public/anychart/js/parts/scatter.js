if(!_.scatter){_.scatter=1;(function($){var S$=function(){$.rx.call(this,!1);this.ua.defaultSeriesType="marker";this.R="scatter"},T$=function(a){var b=new S$;b.va(!0,$.jm("scatter"));for(var c=0,d=arguments.length;c<d;c++)b.marker(arguments[c]);return b},U$=function(a){var b=new S$;b.va(!0,$.jm("marker"));for(var c=0,d=arguments.length;c<d;c++)b.marker(arguments[c]);return b},V$=function(a){var b=new S$;b.va(!0,$.jm("bubble"));for(var c=0,d=arguments.length;c<d;c++)b.bubble(arguments[c]);return b},W$=function(a){var b=new S$;b.va(!0,$.jm("quadrant"));
b.R="quadrant";for(var c=0,d=arguments.length;c<d;c++)b.marker(arguments[c]);return b},Oga={DG:"bubble",xn:"line",zq:"marker"};$.G(S$,$.rx);var X$={},Y$=$.iy|7864320;X$.bubble={ob:4,xb:2,yb:[$.wC,$.xC,$.yC,$.zC],vb:null,qb:null,nb:Y$,lb:"value",kb:"value"};X$.line={ob:8,xb:1,yb:[$.uC],vb:null,qb:null,nb:Y$,lb:"value",kb:"value"};X$.marker={ob:9,xb:2,yb:[$.IC,$.vC],vb:null,qb:null,nb:$.iy|3670016,lb:"value",kb:"value"};S$.prototype.zg=X$;$.vw(S$,S$.prototype.zg);S$.prototype.Mo=function(){return!1};
S$.prototype.lp=function(a,b){return new $.my(this,this,a,b,!1)};S$.prototype.bn=function(a){return $.wk(Oga,a,"line")};S$.prototype.O=function(){var a=S$.I.O.call(this);a.type=this.Va();return{chart:a}};var Z$=S$.prototype;Z$.crosshair=Z$.Po;Z$.xScale=Z$.Qa;Z$.yScale=Z$.ab;Z$.xGrid=Z$.us;Z$.yGrid=Z$.vs;Z$.xMinorGrid=Z$.Pu;Z$.yMinorGrid=Z$.Qu;Z$.xAxis=Z$.Cq;Z$.yAxis=Z$.Qo;Z$.getSeries=Z$.je;Z$.lineMarker=Z$.rs;Z$.rangeMarker=Z$.ss;Z$.textMarker=Z$.ts;Z$.palette=Z$.Sk;Z$.markerPalette=Z$.Bi;
Z$.hatchFillPalette=Z$.Ll;Z$.getType=Z$.Va;Z$.maxBubbleSize=Z$.cw;Z$.minBubbleSize=Z$.gw;Z$.addSeries=Z$.Rj;Z$.getSeriesAt=Z$.Wi;Z$.getSeriesCount=Z$.Dq;Z$.removeSeries=Z$.To;Z$.removeSeriesAt=Z$.Uo;Z$.removeAllSeries=Z$.So;Z$.getPlotBounds=Z$.Ne;Z$.annotations=Z$.wm;Z$.getXScales=Z$.fr;Z$.getYScales=Z$.gr;Z$.quarters=Z$.uF;Z$.crossing=Z$.YC;$.Yo.bubble=V$;$.Yo.marker=U$;$.Yo.quadrant=W$;$.Yo.scatter=T$;$.F("anychart.bubble",V$);$.F("anychart.scatter",T$);$.F("anychart.marker",U$);$.F("anychart.quadrant",W$);$.F("anychart.scatterChart",T$);}).call(this,$)}
