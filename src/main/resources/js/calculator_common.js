$(function() {
	$('#q0_1').autoNumeric('init');
	$('#q0_1').click(function() {
		$('#q0_1').caretToStart();
	});
});

$(function(){
	$("#q0_1").keypress(function(){
		_moneyChangeText("#q0_1");
	});
});

$(function() {
	$('#q0_2').autoNumeric('init');
	$('#q0_2').click(function() {
		$('#q0_2').caretToStart();
	});
});

$(function(){
	$("#q0_2").keypress(function(){
		_moneyChangeText("#q0_2");
	});
});

function moneyCheck(name) {
	var value = $(name).val();
	var money = _moneyNoCurrencyFormat(value);

	if (money == 0 || money == null || money == "") {
		$(name + "_text").val("");
		$(name + "_text").hide();
	} else {
		_moneyChangeText(name);
	}
}

function _setCurrency(n) {

	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');

	return n;
}

function _moneyNoCurrencyFormat(money) {
	if (_isNull(money))
		return "";

	var value = _stringReplaceAll(money, ",", "");
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

function _moneyChangeText(txtNm) {
	var value = $(txtNm).val();
	var money = _moneyNoCurrencyFormat(value);
	var hanA = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십");
	var danA = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백",
			"천", "", "십", "백", "천");
	var result = "";
	for (var i = 0; i < money.length; i++) {
		str = "";
		han = hanA[money.charAt(money.length - (i + 1))];
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
	if (money != 0 && money != null) {
		result = _stringReplaceAll(result, "억만", "억");
		result = result + " 원";
	} else {
		$(txtNm + "_text").val("");
	}

	$(txtNm + "_text").val(result);
	$(txtNm + "_text").show();
}
