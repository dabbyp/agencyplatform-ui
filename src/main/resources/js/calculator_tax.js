$(function() {
	$('#tax').autoNumeric('init');

	$('#tax').click(function() {
		$('#tax').caretToStart();
	});
});

$(function(){
	$("#tax").keypress(function(){
		_taxChangeText( $("#tax").val(), "");
	});
});

$(function() {
	$('#tax2').autoNumeric('init');

	$('#tax2').click(function() {
		$('#tax2').caretToStart();
	});
});

$(function(){
	$("#tax2").keypress(function(){
		_taxChangeText( $("#tax2").val(), "2");
	});
});

function numberFormat(num) {
	var pattern = /(-?[0-9]+)([0-9]{3})/;
	while(pattern.test(num)) {
		num = num.replace(pattern,"$1,$2");
	}
	return num;
}

function unNumberFormat(num) {
	var temp_num = Number(num.replace(/\,/g,"")) + "";
	console.log("temp_num : "+temp_num);
	return (temp_num);
}

function taxCheck(value, th) {
	//var value = $("#tax").val();
	var tax = _moneyNoCurrencyFormat(value);

	if (tax == 0 || tax == null || tax == "") {
		$("#tax" + th + "Text").val("");
		$("#tax" + th + "Text").hide();
	} else {
		_taxChangeText(value, th);
	}
}

function _taxChangeText(value, th) {
    //var value = $("#tax").val();
	var tax = _moneyNoCurrencyFormat(value);
	var hanA = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십");
	var danA = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백",
			"천", "", "십", "백", "천");
	var result = "";
	for (var i = 0; i < tax.length; i++) {
		str = "";
		han = hanA[tax.charAt(tax.length - (i + 1))];
		if (han != "")
			str += han + danA[i];
		if (i == 4)
			str += "만";
		if (i == 8)
			str += "억";
		if (i == 12)
			str += "조";

		result = str + result;
	}
	if (tax != 0 && tax != null) {
		result = _stringReplaceAll(result, "억만", "억");
		result = result + " 원";
	} else {
		$("#tax" + th + "Text").val("");
	}
	$("#tax" + th + "Text").val(result);
	$("#tax" + th + "Text").show();

}

var areaText = {
    "0": "서울특별시 및 광역시"
    ,"1" : "그 밖의 지역"
};

//** 시가표준액 대비 채권비용 계산
//부동산 소유권등기 - 아파트, 주택
 function cal_0() {
     var q0_1 = $("#tax");
     var q0_0_val = $('input[name="area"]:checked').val();
     var q0_1_num = _moneyNoCurrencyFormat(q0_1.val());

     if(q0_1_num < 20000000) {
         alert("시가표준액이 2천만원 미만입니다. 시가표준액 2천만원 이상부터 국민주택채권 매입대상입니다.");
         q0_1.focus();
         return;
     }
     var rate = 0;
     var resultText = areaText[q0_0_val];
     if(q0_1_num >= 20000000 && q0_1_num < 50000000) {
         rate = 13 / 1000;
         resultText += " 시가표준액 2천만원 이상 5천만원 미만";
         resultText += " : 시가표준액의 13/1,000";
     } else if(q0_1_num >= 50000000 && q0_1_num < 100000000) {
         rate = q0_0_val == "0" ? 19 / 1000 : 14 / 1000;
         resultText += " 시가표준액 5천만원 이상 1억원 미만";
         resultText += " : 시가표준액의 " + (q0_0_val == "0" ? "19/1,000" : "14/1,000" );
     } else if(q0_1_num >= 100000000 && q0_1_num < 160000000) {
         rate = q0_0_val == "0" ? 21 / 1000 : 16 / 1000;
         resultText += " 시가표준액 1억 이상 1억6천만원 미만";
         resultText += " : 시가표준액의 " + (q0_0_val == "0" ? "21/1,000" : "16/1,000" );
     } else if(q0_1_num >= 160000000 && q0_1_num < 260000000) {
         rate = q0_0_val == "0" ? 23 / 1000 : 18 / 1000;
         resultText += " 시가표준액 1억6천만원 이상 2억6천만원 미만";
         resultText += " : 시가표준액의 " + (q0_0_val == "0" ? "23/1,000" : "18/1,000" );
     } else if(q0_1_num >= 260000000 && q0_1_num < 600000000) {
         rate = q0_0_val == "0" ? 26 / 1000 : 21 / 1000;
         resultText += " 시가표준액 2억6천만원 이상 6억원 미만";
         resultText += " : 시가표준액의 " + (q0_0_val == "0" ? "26/1,000" : "21/1,000" );
     } else if(q0_1_num >= 600000000) {
         rate = q0_0_val == "0" ? 31 / 1000 : 26 / 1000;
         resultText += " 시가표준액 6억원 이상";
         resultText += " : 시가표준액의 " + (q0_0_val == "0" ? "31/1,000" : "26/1,000" );
     }

     //$("#r0_0").text(numberFormat(""+(Math.round(q0_1_num * rate))) + " 원");
     //$("#r0_1").text(resultText);
     //return numberFormat(""+(Math.round(q0_1_num * rate)));
     //return numberFormat(Math.round(q0_1_num * rate));
     return Math.round(q0_1_num * rate);
 }

 //부동산 소유권등기(농지)
 function cal_1() {
     var q1_1 = $("#tax");
     var q1_0_val = $('input[name="area"]:checked').val();
     var q1_1_num = _moneyNoCurrencyFormat(q0_1.val());

     alert('농지 - tax : ' + q1_1_num + ', area : ' + q1_0_val);

     if(q1_1_num < 5000000) {
         alert("시가표준액이 5백만원 미만입니다. 시가표준액 5백만원 이상부터 국민주택채권 매입대상입니다.");
         q1_1.focus();
         return;
     }
     var rate = 0;
     var resultText = areaText[q1_0_val];
     if(q1_1_num >= 5000000 && q1_1_num < 50000000) {
         rate = q1_0_val == "0" ? 25 / 1000 : 20 / 1000;
         resultText += " 시가표준액 5백만원 이상 5천만원 미만";
         resultText += " : 시가표준액의 " + (q1_0_val == "0" ? "25/1,000" : "20/1,000" );
     } else if(q1_1_num >= 50000000 && q1_1_num < 100000000) {
         rate = q1_0_val == "0" ? 40 / 1000 : 35 / 1000;
         resultText += " 시가표준액 5천만원 이상 1억원 미만";
         resultText += " : 시가표준액의 " + (q1_0_val == "0" ? "40/1,000" : "35/1,000" );
     } else if(q1_1_num >= 100000000) {
         rate = q1_0_val == "0" ? 50 / 1000 : 45 / 1000;
         resultText += " 시가표준액 1억원 이상";
         resultText += " : 시가표준액의 " + (q1_0_val == "0" ? "50/1,000" : "45/1,000" );
     }
     //$("#r1_0").text(numberFormat(""+(Math.round(q1_1_num * rate))) + " 원");
     //$("#r1_1").text(resultText);

     return Math.round(q1_1_num * rate);
 }
 //부동산 소유권등기(주택, 토지 外)
 function cal_2() {
     var q2_1 = $("#tax");
     var q2_2 = $("#tax2");
     var q2_0_val = $('input[name="area"]:checked').val();
     var q2_1_num = _moneyNoCurrencyFormat(q2_1.val());
     var q2_2_num = _moneyNoCurrencyFormat(q2_2.val());
     if(q2_1_num == 0) {
         alert("건물분 시가표준액은 필수 입력사항입니다.(1천만원 이상) 또는 매입용도를 확인해주세요");
         q2_1.focus();
         return;
     } else if(q2_1_num > 0&& q2_1_num < 10000000 && q2_2_num > 0 && q2_2_num < 5000000) {
         alert("건물 시가표준액이 1천만원 미만이고, 토지 시가표준액이 5백만원\n미만 입니다.\n건물 1천만원, 토지 5백만원 이상부터 국민주택채권 매입대상입니다.");
         q2_1.focus();
         return;
     } else if( q2_1_num > 0 && q2_1_num < 10000000 && q2_2_num >= 0) {
         alert("건물 시가표준액이 1천만원 미만입니다. 건물 시가표준액 1천만원 이상부터 국민주택채권 매입대상입니다.");
         q2_1.focus();
         return;
     } else if(q2_1_num >= 10000000 && q2_2_num > 0 && q2_2_num < 5000000) {
         alert("토지 시가표준액은 5백만원 이상부터 가능합니다.");
         q2_2.focus();
         return;
     }

     /*
     if(q2_2_num  < 5000000) {
         alert("토지분 시가표준금액을 5백만원 이상으로 입력하세요.");
         q2_2.focus();
         return;
     }
     */

     var rate_1 = 0;
     var resultText_1 = areaText[q2_0_val] + " 주택,토지 外 부동산 ";
     if(q2_1_num >= 10000000 && q2_1_num < 130000000) {
         rate_1 = q2_0_val == "0" ? 10 / 1000 : 8 / 1000;
         resultText_1 += " 시가표준액 1천만원 이상 1억3천만원 미만";
         resultText_1 += " : 시가표준액의 " + (q2_0_val == "0" ? "10/1,000" : "8/1,000" );
     } else if(q2_1_num >= 130000000 && q2_1_num < 250000000) {
         rate_1 = q2_0_val == "0" ? 16 / 1000 : 14 / 1000;
         resultText_1 += " 시가표준액 1억3천만원 이상 2억5천만원 미만";
         resultText_1 += " : 시가표준액의 " + (q2_0_val == "0" ? "16/1,000" : "14/1,000" );
     } else if(q2_1_num >= 250000000) {
         rate_1 = q2_0_val == "0" ? 20 / 1000 : 18 / 1000;
         resultText_1 += " 시가표준액 2억5천만원 이상";
         resultText_1 += " : 시가표준액의 " + (q2_0_val == "0" ? "20/1,000" : "18/1,000" );
     }
     var rate_2 = 0;
     var resultText_2 = " 그리고 토지 ";
     if(q2_2_num >= 5000000 && q2_2_num < 50000000) {
         rate_2 = q2_0_val == "0" ? 25 / 1000 : 20 / 1000;
         resultText_2 += " 시가표준액 5백만원 이상 5천만원 미만";
         resultText_2 += " : 시가표준액의 " + (q2_0_val == "0" ? "25/1,000" : "20/1,000" );
     } else if(q2_2_num >= 50000000 && q2_2_num < 100000000) {
         rate_2 = q2_0_val == "0" ? 40 / 1000 : 35 / 1000;
         resultText_2 += " 시가표준액 5천만원 이상 1억원 미만";
         resultText_2 += " : 시가표준액의 " + (q2_0_val == "0" ? "40/1,000" : "35/1,000" );
     } else if(q2_2_num >= 100000000) {
         rate_2 = q2_0_val == "0" ? 50 / 1000 : 45 / 1000;
         resultText_2 += " 시가표준액 1억원 이상";
         resultText_2 += " : 시가표준액의 " + (q2_0_val == "0" ? "50/1,000" : "45/1,000" );
     } else {
         resultText_2 = "";
     }

     var r2_0_num = Math.round(q2_1_num * rate_1);
     var r2_1_num = Math.round(q2_2_num * rate_2);
     var r2_2_num = r2_0_num + r2_1_num;
//     $("#r2_0").text(numberFormat(""+r2_0_num) + " 원");
//     $("#r2_1").text(numberFormat(""+r2_1_num) + " 원");
//     $("#r2_2").text(numberFormat(""+r2_2_num) + " 원");
//     $("#r2_3").text(resultText_1 + resultText_2);
     alert(r2_0_num + " + " + r2_1_num + " = " + r2_2_num);
     return r2_2_num;
 }
 //부동산 등기(상속, 증여 및 무상취득)
 function cal_3() {
     // q3_0 : 대상물건지역
     // q3_1 : 건물분 시가표준액
     // q3_2 : 토지분 시가표준액
     // q3_3 : 합산 시가표준액
     var q3_0 = $("#q3_0") ,q3_1 = $("#q3_1"), q3_2 = $("#q3_2"), q3_3 = $("#q3_3");

     var q3_0_val = q3_0.val();
     if(q3_0_val == "") {
         alert("대상물건 지역을 선택해주세요.");
         q3_0.focus();
         return;
     }
//     var q3_1_num = Number(unNumberFormat($.trim(q3_1.val())));
//     var q3_2_num = Number(unNumberFormat($.trim(q3_2.val())));

     var q3_1_num = _moneyNoCurrencyFormat(q3_1.val());
     var q3_2_num = _moneyNoCurrencyFormat(q3_2.val());

    // 건물분 시가표준액 + 토지분 시가표준액
     var q3_3_num = q3_1_num + q3_2_num;

     if(q3_1_num > 0 && q3_1_num < 10000000 && q3_2_num > 0 && q3_2_num < 10000000) {
         alert("건물 및 토지 시가표준액이 1천만원 미만입니다.\n건물 1천만원, 토지 1천만원 이상부터 국민주택채권 매입대상입니다.");
         q3_1.focus();
         return;
     } else if( q3_1_num > 0 && q3_1_num < 10000000 && q3_2_num >= 0) {
         alert("건물 시가표준액이 1천만원 미만입니다.\n건물 시가표준액 1천만원 이상부터 국민주택채권 매입대상입니다.");
         q3_1.focus();
         return;
     } else if(q3_1_num >= 0 && q3_2_num > 0 && q3_2_num < 10000000) {
         alert("토지 시가표준액이 1천만원 미만입니다.\n토지 시가표준액 1천만원 이상부터 국민주택채권 매입대상입니다.");
         q3_2.focus();
         return;
     }

     /*
     if(q3_2_num < 10000000) {
         alert("토지 시가표준액은 1천만원 이상부터 가능합니다.");
         q3_2.focus();
         return;
     }
     */

     var rate_1 = 0;
     var resultText_1 = areaText[q3_0_val] + " 부동산 등기 (상속, 증여 및 무상 취득) ";

     if(q3_1_num >= 10000000 && q3_1_num < 50000000) {
         rate_1 = q3_0_val == "0" ? 18 / 1000 : 14 / 1000;
         resultText_1 += " 시가표준액 1천만원 이상 5천만원 미만";
         resultText_1 += " : 시가표준액의 " + (q3_0_val == "0" ? "18/1,000" : "14/1,000" );
     } else if(q3_1_num >= 50000000 && q3_1_num < 150000000) {
         rate_1 = q3_0_val == "0" ? 28 / 1000 : 25 / 1000;
         resultText_1 += " 시가표준액 5천만원 이상 1억5천만원 미만";
         resultText_1 += " : 시가표준액의 " + (q3_0_val == "0" ? "28/1,000" : "25/1,000" );
     } else if(q3_1_num >= 150000000) {
         rate_1 = q3_0_val == "0" ? 42 / 1000 : 39 / 1000;
         resultText_1 += " 시가표준액 1억5천만원 이상";
         resultText_1 += " : 시가표준액의 " + (q3_0_val == "0" ? "42/1,000" : "39/1,000" );
     }

     var rate_2 = 0;
     var resultText_2 = " 그리고 토지 ";

     if(q3_2_num >= 10000000 && q3_2_num < 50000000) {
         rate_2 = q3_0_val == "0" ? 18 / 1000 : 14 / 1000;
         resultText_2 += " 시가표준액 1천만원 이상 5천만원 미만";
         resultText_2 += " : 시가표준액의 " + (q3_0_val == "0" ? "18/1,000" : "14/1,000" );
     } else if(q3_2_num >= 50000000 && q3_2_num < 150000000) {
         rate_2 = q3_0_val == "0" ? 28 / 1000 : 25 / 1000;
         resultText_2 += " 시가표준액 5천만원 이상 1억5천만원 미만";
         resultText_2 += " : 시가표준액의 " + (q3_0_val == "0" ? "28/1,000" : "25/1,000" );
     } else if(q3_2_num >= 150000000) {
         rate_2 = q3_0_val == "0" ? 42 / 1000 : 39 / 1000;
         resultText_2 += " 시가표준액 1억5천만원 이상";
         resultText_2 += " : 시가표준액의 " + (q3_0_val == "0" ? "42/1,000" : "39/1,000" );
     }

     var r2_0_num = Math.round(q3_1_num * rate_1);
     var r2_1_num = Math.round(q3_2_num * rate_2);
     var r2_2_num = r2_0_num + r2_1_num;

     $("#r3_0").text(numberFormat(""+r2_0_num) + " 원");
     $("#r3_1").text(numberFormat(""+r2_1_num) + " 원");
     $("#r3_2").text(numberFormat(""+r2_2_num) + " 원");
     $("#r3_3").text(resultText_1 + resultText_2);
 }
 //부동산 저당권설정이전
 function cal_4() {
     var q4_0 = $("#q4_0");

//     var q4_0_num = Number(unNumberFormat($.trim(q4_0.val())));

     var q4_0_num = _moneyNoCurrencyFormat(q4_0.val());

     if(q4_0_num < 20000000) {
         alert("저당권 설정금액이 2천만원 미만입니다.\n저당권 설정금액 2천만원 이상부터 국민주택채권 매입대상입니다.");
         q4_0.focus();
         return;
     }

     var rate = 10 /1000;
     var resultText = "저당권설정금액 2천만원 이상 : 저당권 설정 금액의 10/ 1,000. 다만,매입금액이 10억원을 초과하는 경우에는 10억원으로 한다.";

     var r4_0 = Math.round(q4_0_num * rate);
     if(r4_0 >= 1000000000) {
         r4_0 = 1000000000;
     }
     $("#r4_0").text(numberFormat(""+r4_0) + " 원");
     $("#r4_1").text(resultText);
 }
// 시가표준액 대비 채권비용 계산 **//