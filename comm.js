reportcom = {
    accAdd: function(e, t) {
        var r, a, o;
        try {
            r = e.toString().split(".")[1].length
        } catch (i) {
            r = 0
        }
        try {
            a = t.toString().split(".")[1].length
        } catch (i) {
            a = 0
        }
        return o = Math.pow(10, Math.max(r, a)), (e * o + t * o) / o
    },
};
var MoveXY = {
    pageX: 0,
    pageY: 0,
    distX: 0,
    distY: 0,
    startTime: 0,
    endTime: 0,
    getTime: function() {
        return (new Date).getTime()
    },
    scrollTop: 0,
    oscrollTop: 0,
    oscrollLeft: 0
};
summary = {
    pageindex: 1,
    pagesize: 0,
    count: 0,
    w: null,
    h: null,
    typename: null,
    sortNumber: {},
    createTable: function(e, t, r, a, o) {
        if (e.length > 0) {
            t.push("<div class='leftContent' id='leftContent'>"), t.push("<table border='0' cellpadding='0' cellspacing='0' class='report_table_list'>"), r.push("<div class='rightContent' id='rightContent'>"), r.push("<table id='rightmaintable' border='0' cellpadding='0' cellspacing='0'  class='report_table_list'>");
            for (var i = 0; i < e.length; i++) {
                t.push("<tr width='100%'><td width='100%' class='view-report' data-id='" + e[i].main.reportid + "'>" + e[i].main.name + "</td></tr>"), r.push("<tr><td style='min-width:8.475rem'>" + e[i].main.createTime + "</td>");
                for (var n = 0; n < a.length; n++) {
                    var s = e[i].body[a[n]];
                    "undefined" == typeof s && (s = ""), r.push("<td style='max-width:7.475rem'>" + s + "</td>")
                }
                r.push("</tr>")
            }
            t.push("<tr width='100%'><td width='100%'>总计：" + o + "</td></tr>"), r.push("<tr id=\"tablefoot\"><td style='min-width:8.475rem'></td>");
            for (var n = 0; n < a.length; n++) r.push("<td style='max-width:7.475rem'></td>");
            r.push("</tr>"), t.push("</table></div>"), r.push("</table></div>")
        }
    },
    afterCreateTable: function(e) {
        $("#tablefoot td").each(function() {
            var t = $("#tablefoot td").index($(this));
            if (0 == t) return !0;
            for (var r = "", a = 0; a < e.length; a++)
                if (2 == e[t + 1].type) return $("#rightmaintable tr:not(#tablefoot)").each(function() {
                    var e = $(this).find("td:eq(" + t + ")");
                    if ($.isNumeric(e.text().trim())) {
                        "" == r && (r = 0);
                        var a = e.text() || 0;
                        r = reportcom.accAdd(r, parseFloat(a))
                    }
                }), void $("#tablefoot td:eq(" + t + ")").text(r)
        }), e.length - 4 >= 2 && $(".rightPanel table").css("width", 7.475 * (e.length + 1) + "rem");
        var t = $("#rightTop table tr").height(),
            r = $("#leftTop").height();
        t > r ? $("#leftTop table tr").height(t) : $("#rightTop table tr").height(r), $("#rightContent table tr").each(function(e) {
            var t = $("#rightContent table tr:eq(" + e + ")").height(),
                r = $("#leftContent table tr:eq(" + e + ")").height();
            t > r && $("#leftContent table tr:eq(" + e + ")").height(t), r > t && $("#rightContent table tr:eq(" + e + ")").height(r)
        }), $(window).resize(function() {
            var e = $(window).width();
            null == w && (w = e), w / e == 1 ? $(".report_list_t_nav2").show() : $(".report_list_t_nav2").hide()
        }), summary.typename && "undefined" != typeof summary.typename && summary.createmark();
        var a = $(".leftPanel .tableTitle").height(),
            o = $(window).height();
        $("#leftContent,#rightContent").height(o - a)
    }
}