$(function() {

    $(document).on('click', "#btnAddItemGroup", function() {
        addItem();
    });

    $(document).on('click', "button[id^=btnDeleteItemGroup_]", function() {
        var trIndex = $(this).attr("id").split("_")[1];
        var select = $(document).find("select#ItemGroup_" + trIndex);
        $("select[id^=ItemGroup_]").find("option[value='" + $(select).val() + "']").css("display", "block");
        $(document).find("tr#trAmount_" + trIndex).remove();
        $(document).find("tr#trUnit_" + trIndex).remove();
        calQuater();
    });

    $(document).on('change', "select[id^=ItemGroup_]", function() {
        removeSelected();
    });

    $(document).on('keyup', "input[id^=Amt_]", function() {
        calQuater();
    });

    $(document).on('keyup', "input[id^=Unit_]", function() {
        calQuater();
    });

    $(document).on('keypress', "input[data-item='money']", function(event) {
        if ((event.which != 8) && (event.which != 46) && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault(); //stop character from entering input
        }
    });

    $(document).on('keypress', "input[data-item='number']", function(event) {
        if ((event.which != 8) && (event.which != 46) && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault(); //stop character from entering input
        }
    });

}); //===================================================================end ready

function FncNumberFloatFormat(value) {
    number_format(value, 2);
}

function FncNumberFormat(value) {
    number_format(value, 0);
}

function number_format(number, decimals) {
    dec_point = '.';
    thousands_sep = ',';
    n = parseFloat(number.value.split(',').join(''));

    prec = decimals;


    var toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return (Math.round(n * k) / k).toString();
    };

    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

    var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = toFixedFix(Math.abs(n), prec);
    var _, i;

    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;

        _[0] = s.slice(0, i + (n < 0)) +
            _[0].slice(i).replace(/(\d{3})/g, sep + '$1');
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }

    var decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && (s.length - decPos - 1) < prec) {
        s += new Array(prec - (s.length - decPos - 1)).join(0) + '0';
    } else if (prec >= 1 && decPos === -1) {
        s += dec + new Array(prec).join(0) + '0';
    }
    //alert(s)
    number.value = s;
}

function number_format_num(number, decimals) {

    dec_point = '.';
    thousands_sep = ',';
    n = number
    prec = decimals;

    var toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return (Math.round(n * k) / k).toString();
    };

    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

    var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = toFixedFix(Math.abs(n), prec);
    var _, i;

    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;

        _[0] = s.slice(0, i + (n < 0)) +
            _[0].slice(i).replace(/(\d{3})/g, sep + '$1');
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }

    var decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && (s.length - decPos - 1) < prec) {
        s += new Array(prec - (s.length - decPos - 1)).join(0) + '0';
    } else if (prec >= 1 && decPos === -1) {
        s += dec + new Array(prec).join(0) + '0';
    }
    return s;
}

function addItem() {
    var newItem = $("table#newItem").clone();
    var trCount = $("tr[id^=trAmount_]").length;
    var trIndex = trCount + 1;
    var trMax = 0;
    var trAfter = trCount;
    $("tr[id^=trAmount_]").each(function(key, elm) {
        var index = parseFloat($(elm).attr("id").split("_")[1]);
        trMax = (trMax < index) ? index : trMax;
    });
    trAfter = trMax;
    trMax += 1;

    newItem.find("tr#trAmount").prop("id", "trAmount_" + trMax);
    newItem.find("tr#trUnit").prop("id", "trUnit_" + trMax);
    newItem.find("select#ItemGroup").prop("id", "ItemGroup_" + trMax);
    newItem.find("button#btnDeleteItemGroup").prop("id", "btnDeleteItemGroup_" + trMax);

    newItem.find("input[id^=Amt_]").each(function(key, elm) {
        $(elm).prop("id", elm.id + "_" + trMax);
    });

    newItem.find("input[id^=Unit_]").each(function(key, elm) {
        $(elm).prop("id", elm.id + "_" + trMax);
    });

    newItem = newItem.find("tbody").html();
    if (trCount == 0) {
        $("tr#itemHeader").after(newItem);
    } else {
        $("tr#trUnit_" + trAfter).after(newItem);
    }

    removeSelected();

}

function removeSelected() {

    $("select[id^=ItemGroup_]").each(function(key, elm1) { // loop get value(1) all selected
        $("select[id^=ItemGroup_]").each(function(key, elm2) { // loop remove value=value(1)
            if ($(elm1).attr("id") != $(elm2).attr("id")) {
                $(elm2).find("option[value='" + $(elm1).val() + "']").css("display", "none");
                console.log($(elm1).val(), " : ", $(elm2).attr("id"))
            }
        });
    });
}

function calQuater() {

    var allQuater = {
        "Q1": ["01", "02", "03"],
        "Q2": ["04", "05", "06"],
        "Q3": ["07", "08", "09"],
        "Q4": ["10", "11", "12"]
    };

    var allMonthAndQuater = ["01", "02", "03", "Q1", "04", "05", "06", "Q2", "07", "08", "09", "Q3", "10", "11", "12", "Q4"];

    //loop sum total input amt Q1,Q2,Q3,Q4
    $.each(allQuater, function(quater, months) {
        $("input[id^=Amt_" + quater + "_").each(function(key, elm) { // loop remove value=value(1)
            var trIndex = $(this).attr("id").split("_")[2];
            var sumAmount = 0;
            $.each(months, function(index, monthNo) {
                var value = $("input[id^=Amt_" + monthNo + "_" + trIndex).val();
                sumAmount += parseFloat(accounting.unformat(value));
            });

            $("input[id^=Amt_" + quater + "_" + trIndex).val(accounting.formatMoney(sumAmount, "฿"));
        });

    });

    //loop sum total input all amt Quater (right)
    $("input[id^=Amt_Total_]").each(function() {
        var trIndex = $(this).attr("id").split("_")[2];
        var sumAmtQuater = 0;
        $.each(allQuater, function(quater, months) {
            sumAmtQuater += parseFloat(accounting.unformat($("input#Amt_" + quater + "_" + trIndex).val()));
        });
        $(this).val(accounting.formatMoney(sumAmtQuater, "฿"));
    });


    //loop sum total input unit Q1,Q2,Q3,Q4
    $.each(allQuater, function(quater, months) {
        $("input[id^=Unit_" + quater + "_").each(function(key, elm) { // loop remove value=value(1)
            var trIndex = $(this).attr("id").split("_")[2];
            var sumUnit = 0;
            $.each(months, function(index, monthNo) {
                var value = $("input[id^=Unit_" + monthNo + "_" + trIndex).val();
                sumUnit += parseInt(accounting.unformat(value));
            });
            $("input[id^=Unit_" + quater + "_" + trIndex).val(accounting.formatNumber(sumUnit));
        });
    });

    //loop sum total input all unit Quater (right)
    $("input[id^=Unit_Total_]").each(function() {
        var trIndex = $(this).attr("id").split("_")[2];
        var sumUnitQuater = 0;
        $.each(allQuater, function(quater, months) {
            sumUnitQuater += parseInt(accounting.unformat($("input#Unit_" + quater + "_" + trIndex).val()));
        });
        $(this).val(accounting.formatNumber(sumUnitQuater));
    });

    //loop sum total input all amt Quater (bottom)
    $.each(allMonthAndQuater, function(index, month) {
        var totalOfMonth = 0;
        $("tr[id^=trAmount_]").each(function(key, elm) {
            var trIndex = $(elm).attr("id").split("_")[1];
            totalOfMonth += parseFloat(accounting.unformat($("input#Amt_" + month + "_" + trIndex).val()));
        });
        $("input#total_amt_" + month.toLowerCase()).val(accounting.formatMoney(totalOfMonth, "฿"));
    });

    //loop sum total input all unit Quater (bottom)
    $.each(allMonthAndQuater, function(index, month) {
        var totalOfMonth = 0;
        $("tr[id^=trUnit_]").each(function(key, elm) {
            var trIndex = $(elm).attr("id").split("_")[1];
            totalOfMonth += parseInt(accounting.unformat($("input#Unit_" + month + "_" + trIndex).val()));
        });
        $("input#total_unit_" + month.toLowerCase()).val(accounting.formatNumber(totalOfMonth));
    });

    // Grand Amt
    var QAmt1, QAmt2, QAmt3, QAmt4, QAmttotal = 0;
    QAmt1 = parseFloat(accounting.unformat($("input#total_amt_q1").val()));
    QAmt2 = parseFloat(accounting.unformat($("input#total_amt_q2").val()));
    QAmt3 = parseFloat(accounting.unformat($("input#total_amt_q3").val()));
    QAmt4 = parseFloat(accounting.unformat($("input#total_amt_q4").val()));
    QAmttotal = QAmt1 + QAmt2 + QAmt3 + QAmt4;
    $("input#grand_total_amt").val(accounting.formatMoney(QAmttotal, "฿"));

    // Grand Unit
    var QUnit1, QUnit2, QUnit3, QUnit4, QUnittotal = 0;
    QUnit1 = parseInt(accounting.unformat($("input#total_unit_q1").val()));
    QUnit2 = parseInt(accounting.unformat($("input#total_unit_q2").val()));
    QUnit3 = parseInt(accounting.unformat($("input#total_unit_q3").val()));
    QUnit4 = parseInt(accounting.unformat($("input#total_unit_q4").val()));
    QUnittotal = QUnit1 + QUnit2 + QUnit3 + QUnit4;
    $("input#grand_total_unit").val(accounting.formatNumber(QUnittotal));

}