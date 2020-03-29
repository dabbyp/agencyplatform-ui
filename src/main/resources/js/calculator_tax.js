$(function() {
	$('#tax').autoNumeric('init');

	$('#tax').click(function() {
		$('#tax').caretToStart();
	});
});

$(function(){
	$("#tax").keypress(function(){
		_taxChangeText();
	});
});

function taxCheck(value) {
	var value = $("#tax").val();
	var tax = _moneyNoCurrencyFormat(value);

	if (tax == 0 || tax == null || tax == "") {
		$("#taxText").val("");
		$("#taxText").hide();
	} else {
		_taxChangeText();
	}
}

function _taxChangeText() {
	var value = $("#tax").val();
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
		$("#taxText").val("");
	}

	$("#taxText").val(result);
	$("#taxText").show();
}