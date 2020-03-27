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
