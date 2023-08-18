var objCal1 = new AMIB.persianCalendar('pcal1');
anElement = new AutoNumeric('#DEMO', {
    decimalCharacter: ',',
    decimalPlacesShownOnFocus: 0,
    decimalPlaces: 0
});


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', ];

    return n
        .toString()
        .split('')
        .map(x => farsiDigits[x]


        )
        .join('');
}

function persiannumtomonth(n) {
    PERSIAN_MONTH_NAMES = "\u0641\u0631\u0648\u0631\u062f\u06cc\u0646 \u0627\u0631\u062f\u0628\u06cc\u0647\u0634\u062a \u062e\u0631\u062f\u0627\u062f \u062a\u06cc\u0631 \u0645\u0631\u062f\u0627\u062f \u0634\u0647\u0631\u06cc\u0648\u0631 \u0645\u0647\u0631 \u0622\u0628\u0627\u0646 \u0622\u0630\u0631 \u062f\u06cc \u0628\u0647\u0645\u0646 \u0627\u0633\u0641\u0646\u062f".split(" ")
    n--
    return n
        .toString()
        .split('$')
        .map(x => PERSIAN_MONTH_NAMES[x]).join("");
}





function toFarsiNumberforcal(n) {
    arrcal = n.split("/")
    year = toFarsiNumber(arrcal[0])
    month = toFarsiNumber(arrcal[1])
    day = toFarsiNumber(arrcal[2])
    return year + '/' + month + '/' + day
}

function calhorofi(n) {
    arrcal = n.split("/")
    x = arrcal[2].toPersianLetter() + " " + persiannumtomonth(arrcal[1]) + " " + arrcal[0].toPersianLetter()
    return x;
}


function toPersianwithcomma(x) {
    newarry = []
    splitarry = x.toString().split('')
    for (i = 0; i < splitarry.length; i++) {
        if (Number.isInteger(parseInt(splitarry[i]))) {
            newarry.push(toFarsiNumber(splitarry[i]))
        } else {
            splitarry[i] = ","
            newarry.push(splitarry[i])
        }
    }
    return newarry.join('')

}
var form = document.getElementById("check-form");
form.onsubmit = function(e) {
    e.preventDefault();
    rawval = document.getElementById("DEMO").value
    num = rawval.replace(/\./g, "");
    console.log(num.toPersianLetter() + " ریال");
    console.log(document.getElementById("pcal1").value.toLocaleString('ar-EG'))
    console.log(document.getElementById("reciver").value)


    document.getElementById("price-val-sentence").innerHTML = num.toPersianLetter() + " ریال معادل " + (Math.round(num / 10)).toPersianLetter() + " " + "تومان تمام" + "###"
    document.getElementById("price-val-num").innerHTML = "#" + toPersianwithcomma(rawval) + "#"
    console.log(toFarsiNumberforcal(document.getElementById("pcal1").value))
    document.getElementById("date-val").innerHTML = toFarsiNumberforcal(document.getElementById("pcal1").value)
    document.getElementById("reciver-val").innerHTML = document.getElementById("reciver").value
    document.getElementById("date-val-horofi").innerHTML = calhorofi(document.getElementById("pcal1").value)
    console.log(rawval)
    console.log(toFarsiNumber(rawval))
    console.log(toPersianwithcomma(rawval))


};