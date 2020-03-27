$(function() {
	$('#money').autoNumeric('init');

	$('#money').click(function() {
		$('#money').caretToStart();
	});
});

$(function(){
	$("#money").keypress(function(){
		_moneyChangeText();
	});
});

function moneyCheck(value) {
	var value = $("#money").val();
	var money = _moneyNoCurrencyFormat(value);

	if (money == 0 || money == null || money == "") {
		$("#moneyText").val("");
		$("#moneyText").hide();
	} else {
		_moneyChangeText();
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

function _moneyChangeText() {
	var value = $("#money").val();
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
		$("#moneyText").val("");
	}

	$("#moneyText").val(result);
	$("#moneyText").show();
}
