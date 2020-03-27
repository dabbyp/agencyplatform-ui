$(function() {
	$('#price').autoNumeric('init');

	$('#price').click(function() {
		$('#price').caretToStart();
	});

	$('#lunarPrice').autoNumeric('init');

	$('#lunarPrice').click(function() {
		$('#lunarPrice').caretToStart();
	});
});

$(function(){
	$("#price").keypress(function(){
		_priceChangeText();
	});
});

$(function(){
	$("#lunarPrice").keypress(function(){
		_priceChangeText2();
	});
});

function valueCheck(value) {
	var value = $("#price").val();
	var price = _priceNoCurrentFormat(value);

	if (price == 0 || price == null || price == "") {
		$("#priceText").val("");
		$("#priceText").hide();
	} else {
		_priceChangeText();
	}
}

function valueCheck2(value){
	var value = $("#lunarPrice").val();
	var price = _priceNoCurrentFormat(value);
	
	if(price == 0 || price == null || price == ""){
		$("#lunarPriceText").val("");
		$("#lunarPriceText").hide();
	}else{
		_priceChangeText2();
	}
}

function _setCurrency(n) {

	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');

	return n;
}

function _priceNoCurrentFormat(price) {
	if (_isNull(price))
		return "";

	var value = _stringReplaceAll(price, ",", "");
	return _stringReplaceAll(value, "원", "");
}

function _isNull(str) {
	if (typeof (str) == "undefined" || str == null || str == "null"
			|| str == "")
		return true;

	return false;
}

function _stringReplaceAll(str, rep1, rep2) {
	if (_isNull(str)) {
		return "";
	}

	var temp = str;

	while (true) {
		if (temp.indexOf(rep1) < 0)
			break;
		temp = temp.replace(rep1, rep2);
	}

	return temp;
}


function _priceChangeText() {
	var value = $("#price").val();
	var price = _priceNoCurrentFormat(value);
	var hanA = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십");
	var danA = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백",
			"천", "", "십", "백", "천");
	var result = "";
	for (var i = 0; i < price.length; i++) {
		str = "";
		han = hanA[price.charAt(price.length - (i + 1))];
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
	if (price != 0 && price != null) {
		result = _stringReplaceAll(result, "억만", "억");
		result = _stringReplaceAll(result, "일만", "만");
		result = _stringReplaceAll(result, "일천", "천");
		result = _stringReplaceAll(result, "일백", "백");
		result = _stringReplaceAll(result, "일십", "십");
		// result =
		// result.replace("억만","억").replace("조억","조").replace("일만","만").replace("일천","천").replace("일백","백").replace("일십","십");
		result = result + " 원";
	} else {
		$("#priceText").val("");
	}

	$("#priceText").val(result);
	$("#priceText").show();
}

function _priceChangeText2(){
	var value = $("#lunarPrice").val();
	var price = _priceNoCurrentFormat(value);
    var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
    var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
    var result = "";
    for(var i=0; i<price.length; i++) {        
        str = "";
        han = hanA[price.charAt(price.length-(i+1))];
        if(han != "")
            str += han+danA[i];
        if(i == 4) str += "만";
        if(i == 8) str += "억";
        if(i == 12) str += "조";
       
        result = str + result;
    }
    if(price != 0 && price != null){
    	result = _stringReplaceAll(result, "억만","억");
    	result = _stringReplaceAll(result, "일만","만");
    	result = _stringReplaceAll(result, "일천","천");
    	result = _stringReplaceAll(result, "일백","백");
    	result = _stringReplaceAll(result, "일십","십");
    	//result = result.replace("억만","억").replace("조억","조").replace("일만","만").replace("일천","천").replace("일백","백").replace("일십","십");
    	result = result + " 원";
    }else{
    	$("#lunarPriceText").val("");
    }
    
    $("#lunarPriceText").val(result);
    $("#lunarPriceText").show();
}