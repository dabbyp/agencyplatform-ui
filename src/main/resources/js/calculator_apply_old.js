function _cost_test(){
	var result = _getHousingBond("DG001", true, "RT001", 150000000, 1.5789);
	var keys = Object.keys( result );
	
	for(var i=0;i<keys.length;i++){
		alert(keys[i] +":"+result[keys[i]]);
	}
}

/*
대출이자 계산기
repayMethod(대출방법) : 원리금균등시납부:RM001, 원금균등시납부:RM002, 만기일시상환:RM003
interestPeriod(거치기간)
expiredPrice(만기시상환금)

 */
function _getLoanRate(repayMethod, price, period, rate, interestPeriod, expiredPrice){
	var repaySchedule = new Array(period);
	
	var ratePercent = rate / 100;
	
	//거치기간이자
	var firstInterest = price * ratePercent / 12;
	
	//원리금균등시납부원금
	var minusPeriod = period-interestPeriod;
	var repayPrice = (price*ratePercent/12*Math.pow((1+ratePercent/12),minusPeriod) )/( Math.pow((1+ratePercent/12),minusPeriod)-1);
			
	
	//원금균등시납부원금
	//var repayPriceType2 = (price*ratePercent/12+(price-expiredPrice)/(period-interestPeriod) );
	var repayPriceType2 = (price-expiredPrice)/(period-interestPeriod);
	repayPriceType2 = _transferInteger2(repayPriceType2);

	var totalPrice = price;
	
	if(repayMethod == "RM001"){
		for(var i=1;i<=period;i++){
			
			if(i < interestPeriod+1){
				repaySchedule[i-1] = _makeRepayContent(i, firstInterest, 0, firstInterest, totalPrice);
			}else{
				
				var seqInterest = _transferInteger2(totalPrice * ratePercent / 12);
				var seqRepayPrice = _transferInteger2(repayPrice) - seqInterest;
				var repayPrice2 = repayPrice;
				
				totalPrice = totalPrice - seqRepayPrice;

				if(totalPrice < 0 ){				
					repayPrice2 = repayPrice2 + totalPrice;
					seqRepayPrice = _transferInteger2(repayPrice2) - seqInterest;
					totalPrice = 0;
				}else{
					if(period == i && totalPrice > 0){
						repayPrice2 = repayPrice2 + totalPrice;
						seqRepayPrice = _transferInteger2(repayPrice2) - seqInterest;
						totalPrice = 0;
					}

				}

				repaySchedule[i-1] = _makeRepayContent(i, repayPrice2, seqRepayPrice, seqInterest, totalPrice, repayPrice);			
				
			}
			
		}
	}else{
		for(var i=1;i<=period;i++){
			
			if(i < interestPeriod+1){
				repaySchedule[i-1] = _makeRepayContent(i, firstInterest, 0, firstInterest, totalPrice);
			}else{
				
				var seqInterest = _transferInteger2(totalPrice * ratePercent / 12);
				var seqRepayPrice = repayPriceType2;
				var repayPrice2 = repayPriceType2 + seqInterest;
				
				totalPrice = totalPrice - repayPriceType2;

				if(totalPrice < 0 ){
					//마지막 달에 마이너스 값이 나온 경우
					repayPrice2 = repayPrice2 + totalPrice;
					seqRepayPrice = _transferInteger2(repayPrice2) - seqInterest;
					totalPrice = 0;
				}else{
					//마지막 달에 금액 남아있는 경우
					if(period == i && totalPrice > 0){
						repayPrice2 = repayPrice2 + totalPrice;
						seqRepayPrice = _transferInteger2(repayPrice2) - seqInterest;
						totalPrice = 0;
					}

				}

				repaySchedule[i-1] = _makeRepayContent(i, repayPrice2, seqRepayPrice, seqInterest, totalPrice, repayPriceType2);			
				
			}
			
		}
	}

	return repaySchedule;
	
}

function _makeRepayContent(seq, total, repay, interest,  balance, repayPrice){
	return repayContent = {
			"회차" : seq,			
			"총상환금" : _transferInteger2(total) ,
			"납입원금": _transferInteger2(repay) ,
			"이자" : _transferInteger2(interest) ,
			"대출잔액": _transferInteger2(balance),
			"매회납입액":_transferInteger2(repayPrice)
	};
}

// 2016.05.25
// parameter : 등기종류, 부동산소재지, 부동산종류, 시가표준액
// 등기종류 type => 소유권이전 : DG001, 근저당권설정 : DG003, 상속 : DG004, 증여 : DG005
// 부동산종류 kind => RT001 : 주택, RT003 : 토지, RT004 : 주택,토지외 부동산
// 채권할인율 : bondDiscountRate 서버에서 조회 후 입력
function _getHousingBond(type, isSpecialCity, kind, price, bondDiscountRate){
	
	var amount="";
	var rate=0.0;

	switch(type){
	case "DG001":
		if(isSpecialCity){
			if(kind == "RT001"){
				//주택
				if(price >= 20000000 && price < 50000000){
					rate = 1.3;					
				}else if(price >= 50000000 && price < 100000000){
					rate = 1.9;
				}else if(price >= 100000000 && price < 160000000){
					rate = 2.1;
				}else if(price >= 160000000 && price < 260000000){
					rate = 2.3;
				}else if(price >= 260000000 && price < 600000000){
					rate = 2.6;
				}else if(price >= 600000000){
					rate = 3.1;
				}

			}else if(kind == "RT003"){
				//토지
				if(price >= 5000000 && price < 50000000){
					rate = 2.5;
				}else if(price >= 50000000 && price < 100000000){
					rate = 4.0;
				}else if(price >= 100000000){
					rate = 5.0;
				}

			}else{
				if(price >= 10000000 && price < 130000000){
					rate = 1.0;
				}else if(price >= 130000000 && price < 250000000){
					rate = 1.6;
				}else if(price >= 250000000){
					rate = 2.0;
				}

			}

		}else{
			if(kind == "RT001"){
				//주택
				if(price >= 20000000 && price < 50000000){
					rate = 1.3;
				}else if(price >= 50000000 && price < 100000000){
					rate = 1.4;
				}else if(price >= 100000000 && price < 160000000){
					rate = 1.6;
				}else if(price >= 160000000 && price < 260000000){
					rate = 1.8;
				}else if(price >= 260000000 && price < 600000000){
					rate = 2.1;
				}else if(price >= 600000000){
					rate = 2.6;
				}

			}else if(kind == "RT003"){
				//토지
				if(price >= 5000000 && price < 50000000){
					rate = 2.0;
				}else if(price >= 50000000 && price < 100000000){
					rate = 3.5;
				}else if(price >= 100000000){
					rate = 4.5;
				}

			}else{
				if(price >= 10000000 && price < 130000000){
					rate = 0.8;
				}else if(price >= 130000000 && price < 250000000){
					rate = 1.4;
				}else if(price >= 250000000){
					rate = 1.8;
				}

			}
		}
		break;
	case "DG003":
		if(isSpecialCity){
			if(price >= 10000000 && price < 50000000){
				rate = 1.8;
			}else if(price >= 50000000 && price < 150000000){
				rate = 2.8;
			}else if(price >= 150000000){
				rate = 4.2;
			}
		}else{
			if(price >= 10000000 && price < 50000000){
				rate = 1.4;
			}else if(price >= 50000000 && price < 150000000){
				rate = 2.5;
			}else if(price >= 150000000){
				rate = 3.9;
			}
		}
		break;

	case "DG005":
		if(price >= 20000000){
			rate = 1.0;
		}
		break;
	}
	
	var rate2 = rate / 100;
	var bondDiscountRate2 = bondDiscountRate / 100;
	
	var price2 = price;	
	if(type == "DG005"){
		if(price2 > 1000000000)
			price2 = 1000000000;
	}
	
	var calPrice = _transferInteger(price2 * rate2);
	
	calPrice = calPrice / 10000;
	calPrice = Math.round(calPrice) * 10000;
	
	var resultJsonStr = {
			"시가표준액" : _transferInteger(price2),			
			"채권매입율" : rate,
			"채권매입금액" : calPrice,
			"채권할인율" : bondDiscountRate,
			"채권매도액": _transferInteger2(calPrice * bondDiscountRate2)
	};
	
	if(type == "DG005"){
		var resultJsonStr = {
			"채권최고액" : _transferInteger(price2),			
			"채권매입율" : rate,
			"채권매입금액" : calPrice,
			"채권할인율" : bondDiscountRate,
			"채권매도액": _transferInteger2(calPrice * bondDiscountRate2)
		};
	}


	return resultJsonStr;


}

//법인관련 비용 계산 :: 법인설립등기
//capital:자본금, directorCount:이사수, auditorCount:감사수, kind:유형
function _getCorporateCostType1(capital, directorCount, auditorCount, kind ){
	
	var tax1;
	var tax2;
	var tax3;
	
	tax1 = _transferInteger( capital * 0.004 );
	if(tax1 <= 112500)
		tax1 = 112500;
	
	tax2 = _transferInteger( capital * 0.0008 );
	if(tax2 <= 22500)
		tax2 = 22500;
	
	var basicCost = 310000;
	tax3 = basicCost + _getProgressiveCost2(capital);
	
	var memberCount = parseInt(directorCount)+parseInt(auditorCount)-5;
	
	if( memberCount > 0){
		tax3 = tax3 + ( memberCount  * 10000 );
	}
	
	var resultJsonStr = {
			"등록면허세" : _transferInteger(tax1),			
			"지방교육세" : _transferInteger(tax2),
			"증지대" : _transferInteger(25000),
			"제비용": _transferInteger(30000),
			"등록대행": _transferInteger(30000),
			"기본보수": _transferInteger(tax3)
	};
		
	return resultJsonStr;
}

//법인 설립시 법무사 누진보수
function _getProgressiveCost2(amount){
	var basicCost = 0;
	var addCost = 0;
	
	if(amount > 50000000 && amount <= 100000000){
		addCost = (amount - 50000000) * 22/10000;
	}else if(amount > 100000000 && amount <= 300000000){
		addCost = 110000 + ( (amount - 100000000) * 9/10000 );
	}else if(amount > 300000000 && amount <= 500000000){
		addCost = 290000 + ( (amount - 300000000) * 8/10000 );
	}else if(amount > 500000000 && amount <= 1000000000){
		addCost = 450000 + ( (amount - 500000000) * 7/10000 );
	}else if(amount > 1000000000 && amount <= 2000000000){
		addCost = 800000 + ( (amount - 1000000000) * 6/10000 );
	}else if(amount > 2000000000 && amount <= 2000000000){
		addCost = 1400000 + ( (amount - 2000000000) * 4/10000 );
	}else if(amount > 20000000000){
		addCost = 8600000 + ( (amount - 20000000000) * 1/10000 );
	}
	
	return _transferInteger( basicCost + addCost );
}

//법인관련 비용 계산 :: 법인변경등기
//capital:자본금, directorCount:이사수, auditorCount:감사수, kind:유형
function _getCorporateCostType2(isName, isObject, isDirector, isCeo, isCeoAddress, isMove, isMoveExternal){
	
	var tax1 = 0;
	var tax2 = 0;
	var tax3 = 0;
	var tax4 = 0;
	var count = 0;
	
	if(isName){
		//tax3 = tax3 + 70000;
		tax3 = tax3 + 100000;
		count++;
	}
	
	if(isObject){
		//tax3 = tax3 + 70000;
		tax3 = tax3 + 100000;
		count++;
	}
	
	if(isDirector){
		//tax3 = tax3 + 65000;
		tax3 = tax3 + 80000;
		count++;
	}
	
	if(isCeo){
		//tax3 = tax3 + 65000;
		tax3 = tax3 + 80000;
		count++;
	}

	if(isCeoAddress){
		//tax3 = tax3 + 65000;		
		tax3 = tax3 + 100000;
		count++;
	}
	
	tax1 = count * 40200;
	tax2 = count * 8040;
	tax4 = count * 4000;
	
	
	if(isMove){
		tax3 = tax3 + 100000;
		tax1 = tax1 + 112500;
		tax2 = tax2 + 22500;
		tax4 = tax4 + 4000;
	}
	
	//tax1 = count * 112500;
	//tax2 = count * 22500;

	
	if(isMoveExternal){		
		tax1 = tax1 + 152700;
		tax2 = tax2 + 30540;
		tax4 = tax4 + 29000;
		
		tax3 = tax3 + 150000;
	}
	
	
	var resultJsonStr = {
			"등록면허세" : _transferInteger(tax1),			
			"지방교육세" : _transferInteger(tax2),
			"증지대" : _transferInteger(tax4),
			"제비용": _transferInteger(30000),
			"등록대행": _transferInteger(30000),
			"기본보수": _transferInteger(tax3)
	};
		
	return resultJsonStr;
}

//법인관련 비용 계산 :: 법인유상증자
//capital:자본금
function _getCorporateCostType3(capital, isModifyStock){
	
	var tax1;
	var tax2;
	var tax3;
	var tax4 = 4000;
	
	tax1 = _transferInteger( capital * 0.004 );
	if(tax1 <= 112500)
		tax1 = 112500;
	
	tax2 = _transferInteger( capital * 0.0008 );
	if(tax2 <= 22500)
		tax2 = 22500;
	
	var basicCost = 230000;
	tax3 = basicCost + _getProgressiveCost3(capital);
	
	if(isModifyStock)
		tax4 = 8000;
	
	var resultJsonStr = {
			"등록면허세" : _transferInteger(tax1),			
			"지방교육세" : _transferInteger(tax2),
			"증지대" : _transferInteger(tax4),
			"제비용": _transferInteger(30000),
			"등록대행": _transferInteger(30000),
			"기본보수": _transferInteger(tax3)
	};
		
	return resultJsonStr;
}

//법인 유상증자시 법무사 누진보수
function _getProgressiveCost3(amount){
	var basicCost = 0;
	var addCost = 0;
	
	if(amount > 50000000 && amount <= 100000000){
		addCost = (amount - 50000000) * 19/10000;
	}else if(amount > 100000000 && amount <= 300000000){
		addCost = 95000 + ( (amount - 100000000) * 8/10000 );
	}else if(amount > 300000000 && amount <= 500000000){
		addCost = 255000 + ( (amount - 300000000) * 7/10000 );
	}else if(amount > 500000000 && amount <= 1000000000){
		addCost = 395000 + ( (amount - 500000000) * 6/10000 );
	}else if(amount > 1000000000 && amount <= 2000000000){
		addCost = 695000 + ( (amount - 1000000000) * 5/10000 );
	}else if(amount > 2000000000 && amount <= 2000000000){
		addCost = 1195000 + ( (amount - 2000000000) * 4/10000 );
	}else if(amount > 20000000000){
		addCost = 8395000 + ( (amount - 20000000000) * 1/10000 );
	}
	
	return _transferInteger( basicCost + addCost );
}

//누진보수
function _getProgressiveCost(amount){
	
	var basicCost = 0;
	var addCost = 0;
	
	if(amount > 10000000 && amount <= 50000000){
		addCost = (amount - 10000000) * 11/10000;
	}else if(amount > 50000000 && amount <= 100000000){
		addCost = 44000 + ( (amount - 50000000) * 10/10000 );
	}else if(amount > 100000000 && amount <= 300000000){
		addCost = 94000 + ( (amount - 100000000) * 9/10000 );
	}else if(amount > 300000000 && amount <= 500000000){
		addCost = 274000 + ( (amount - 300000000) * 8/10000 );
	}else if(amount > 500000000 && amount <= 1000000000){
		addCost = 434000 + ( (amount - 500000000) * 7/10000 );
	}else if(amount > 1000000000 && amount <= 2000000000){
		addCost = 784000 + ( (amount - 1000000000) * 5/10000 );
	}else if(amount > 2000000000 && amount <= 20000000000){
		addCost = 1284000 + ( (amount - 2000000000) * 4/10000 );
	}else if(amount > 20000000000){
		addCost = 8484000 + ( (amount - 20000000000) * 1/10000 );
	}
	
	return _transferInteger( basicCost + addCost );
}

//법무사 법정 수수료 계산
function _getJudicialServiceCost(amount, type){
	
	var basicCost = 100000;
	
	if(type == "DG005")
		basicCost = 140000;
	
	var addCost = _getProgressiveCost(amount);
	/*
	if(amount > 10000000 && amount <= 50000000){
		addCost = (amount - 10000000) * 10/10000;
	}else if(amount > 50000000 && amount <= 100000000){
		addCost = 40000 + ( (amount - 50000000) * 9/10000 );
	}else if(amount > 100000000 && amount <= 300000000){
		addCost = 85000 + ( (amount - 100000000) * 8/10000 );
	}else if(amount > 300000000 && amount <= 500000000){
		addCost = 245000 + ( (amount - 300000000) * 7/10000 );
	}else if(amount > 500000000 && amount <= 1000000000){
		addCost = 385000 + ( (amount - 500000000) * 6/10000 );
	}else if(amount > 1000000000 && amount <= 2000000000){
		addCost = 685000 + ( (amount - 1000000000) * 5/10000 );
	}else if(amount > 2000000000 && amount <= 20000000000){
		addCost = 1185000 + ( (amount - 2000000000) * 4/10000 );
	}else if(amount > 20000000000){
		addCost = 8385000 + ( (amount - 20000000000) * 1/10000 );
	}*/
	
	return _transferInteger( basicCost + addCost );
}

//부동산 법정 수수료 계산
function _getRealEstateAgentCost(type, kind, amount, rentAmount, isOver85){
	var tax = 0;
	var tax2 = 0;
	var tax3 = 0;
	switch(type){
	case "DG001":
		//부동산소유권 등기 , RT001 : 아파트(주택), RER002 : 주거형오피스텔, RER003 : 아마트(주택)외 부동산
		if(kind == "RT001"){
			if(amount < 50000000){
				tax = _transferInteger( amount * 0.006 );
				tax2 = 0.6;
				
				/*if(tax > 250000)
					return 250000;
				return tax;*/
				
				if(tax > 250000)
					tax = 250000;
				
			}else if(amount >= 50000000 && amount < 200000000){
				tax = _transferInteger( amount * 0.005 );
				tax2 = 0.5;
				/*if(tax > 800000)
					return 800000;
				return tax;*/
				
				if(tax > 800000)
					tax = 800000;
				
			}else if(amount >= 200000000 && amount < 600000000){
				tax = _transferInteger( amount * 0.004 );
				tax2 = 0.4;
				//return tax;
			}else if(amount >= 600000000 && amount < 900000000){
				tax = _transferInteger( amount * 0.005 );
				tax2 = 0.5;
				tax = "+"+String(tax);
				//return "+"+String(tax);
			}else if(amount >= 900000000){
				tax = _transferInteger( amount * 0.009 );
				tax2 = 0.9;
				tax = "+"+String(tax);
				//return "+"+String(tax);
			}
			
		}else if(kind == "RT002"){
			if(isOver85){
				tax = _transferInteger( amount * 0.009 );
				tax = "+"+String(tax);
				tax2 = 0.9;
			}else{
				tax = _transferInteger( amount * 0.005 );
				tax2 = 0.5;
			}
			//return "+"+String(tax);			
			
		}else{
			tax = _transferInteger( amount * 0.009 );
			tax2 = 0.9;
			//return "+"+String(tax);
			tax = "+"+String(tax);
		}
		break;
	case "DG002":
		//전세권설정 등기
		if(kind == "RT001"){
			if(amount < 50000000){
				tax = _transferInteger( amount * 0.005 );
				tax2 = 0.5;
				
				/*if(tax > 200000)
					return 200000;
				return tax;*/
				if(tax > 200000)
					tax = 200000;
				
			}else if(amount >= 50000000 && amount < 100000000){
				tax = _transferInteger( amount * 0.004 );
				tax2 = 0.4;
				/*if(tax > 300000)
					return 300000;
				return tax;*/
				
				if(tax > 300000)
					tax = 300000;
				
			}else if(amount >= 100000000 && amount < 300000000){
				tax = _transferInteger( amount * 0.003 );
				tax2 = 0.3;
				//return tax;
			}else if(amount >= 300000000 && amount < 600000000){
				tax = _transferInteger( amount * 0.004 );
				tax2 = 0.4;
				//return tax;
			}else if(amount >= 600000000){
				tax = _transferInteger( amount * 0.008 );
				tax2 = 0.8;
				//return "+"+String(tax);
				
				tax = "+"+String(tax);
			}
		}else if(kind == "RT002"){
			if(isOver85){
				tax = _transferInteger( amount * 0.009 );
				tax = "+"+String(tax);
				
				tax2 = 0.9;				
			}else{
				tax = _transferInteger( amount * 0.004 );
				tax2 = 0.4;
			}
			
		}else{
			tax = _transferInteger( amount * 0.009 );
			tax2 = 0.9;
			//return "+"+String(tax);
			tax = "+"+String(tax);
		}
		
		break;
		
	case "QRT999":
		//월임대차
		
		var totalAmount = _transferInteger( Number(amount) + (rentAmount * 100) );
		if(totalAmount < 50000000){
			totalAmount = _transferInteger( Number(amount) + (rentAmount * 70) );
		}
		
		if(kind == "RT001"){
			if(totalAmount < 50000000){
				tax = _transferInteger( totalAmount * 0.005 );
				tax2 = 0.5;
				/*if(tax > 200000)
					return 200000;
				return tax;*/
				
				if(tax > 200000)
					tax = 200000;
				
			}else if(totalAmount >= 50000000 && totalAmount < 100000000){
				tax = _transferInteger( totalAmount * 0.004 );
				tax2 = 0.4;
				/*if(tax > 300000)
					return 300000;
				return tax;*/
				if(tax > 300000)
					tax = 300000;
				
			}else if(totalAmount >= 100000000 && totalAmount < 300000000){
				tax = _transferInteger( totalAmount * 0.003 );
				tax2 = 0.3;
				//return tax;
			}else if(totalAmount >= 300000000 && totalAmount < 600000000){
				tax = _transferInteger( totalAmount * 0.004 );
				tax2 = 0.4;
				//return tax;
			}else if(totalAmount >= 600000000){
				tax = _transferInteger( totalAmount * 0.008 );
				tax2 = 0.8;
				//return "+"+String(tax);
				tax = "+"+String(tax);
			}
		}else if(kind == "RT002"){
			if(isOver85){
				tax = _transferInteger( totalAmount * 0.009 );
				tax = "+"+String(tax);
				tax2 = 0.9;
			}else{
				tax = _transferInteger( totalAmount * 0.004 );
				tax2 = 0.4;
			}
			//return "+"+String(tax);
		}else{
			tax = _transferInteger( totalAmount * 0.009 );
			tax2 = 0.9;
			//return "+"+String(tax);
			tax = "+"+String(tax);
		}
		
		break;	
	default:		
		break;	
	}	
	
	//return 0;
	tax2 = String(tax2) + "%"; 
	var resultJsonStr = {
			"매매금액(전세금액)" : amount,
			"수수료 요율" : tax2,	
			"중계수수료" : tax,			
			"월차임": rentAmount
	};
		
	return resultJsonStr;
}

//부동산 등기 세금 계산
function _getTaxInfo(type, kind, landCount, isOver85, reductType, amount, isOverFour){
	//alert("type:"+type+",kind:"+kind+",landCount:"+landCount+",isOver85:"+isOver85+",reductType:"+reductType+",amount:"+amount);

	switch(type){
	case "DG001":
		//부동산소유권 등기
		var tmp = _calculateTaxTransferRight(kind, landCount, isOver85, reductType, amount, isOverFour);

		return tmp;
		//break;
	case "DG002":
		//전세권설정 등기
		var tax1 = _transferInteger(amount * 0.002);
		var tax2 = _transferInteger(amount * 0.0004);
		var tax3 = 13000;
		
		var resultJsonStr = {
			"등록면허세" : tax1,
			"지방교육세" : tax2,
			"증지대" : tax3,
			"등록면허세율" : 0.2,
			"지방교육세율" : 0.04
		};		
		return resultJsonStr;
		
		//break;
	case "DG003":
		//근저당권설정 등기
		return _calculateMortgageRight(kind, landCount, reductType, amount);
		//break;
	case "DG004":
		//부동산증여 등기
		return _calculateGive(kind, landCount, isOver85, reductType, amount);
		//break;
	case "DG005":
		//상속 등기
		return _calculateInheritance(kind, landCount, isOver85, reductType, amount);
		//break;
	default:		
		break;	
	}
	
	return 0;
}


//상속등기
// reduceType 1 : 무주택, 2 : 1주택이상 
function _calculateInheritance(kind, landCount, isOver85, reduceType, amount){
	
	//RT001:아파트, RER002:주택, RER003:상가, RER004:농지, RER005:농지외
	
	var tax1 = 0; //취득세
	var tax2 = 0; //지방교육세
	var tax3 = 0;	//농어촌특별세
	var tax4 = 0; //증지대
	
	var tax1Rate = 0;
	var tax2Rate = 0;
	var tax3Rate = 0;

	if(kind == "RT001"){
		
		if(reduceType == "1"){
			tax1 = _transferInteger( amount * 0.008 );
			tax1Rate = 0.8;
		}else{
			tax1 = _transferInteger( amount * 0.028 );
			tax1Rate = 2.8;
		}		
		tax2 = _transferInteger( amount * 0.0016 );
		tax2Rate = 0.16;

		if(isOver85){
			tax3 = _transferInteger( amount * 0.002 );
			tax3Rate = 0.2;
		}
		tax4 = 13000;
		
	}else if(kind == "RT002"){
		
		if(reduceType == "1"){
			tax1 = _transferInteger( amount * 0.008 );
			tax1Rate = 0.8;
		}else{
			tax1 = _transferInteger( amount * 0.028 );
			tax1Rate = 2.8;
		}		
		tax2 = _transferInteger( amount * 0.0016 );
		tax2Rate = 0.16;

		if(isOver85){
			tax3 = _transferInteger( amount * 0.002 );
			tax3Rate = 0.2;
		}

		tax4 = 26000;

		if(landCount > 1)
			tax4 = tax4 + (13000 * (landCount-1) );	
		
	}else if(kind == "RT003"){
		tax1 = _transferInteger( amount * 0.028 );
		tax2 = _transferInteger( amount * 0.0016 );
		tax3 = _transferInteger( amount * 0.002 );

		tax1Rate = 2.8;
		tax2Rate = 0.16;
		tax3Rate = 0.2;

		tax4 = 13000;
		
	}else if(kind == "RT004"){
		if(reduceType == "1"){
			tax1 = _transferInteger( amount * 0.023 );
			tax2 = _transferInteger( amount * 0.0006 );
			tax3 = _transferInteger( amount * 0.002 );

			tax1Rate = 2.3;
			tax2Rate = 0.06;
			tax3Rate = 0.2;

		}else{
			tax1 = 0;
			tax2 = _transferInteger( amount * 0.0018 );
			tax3 = 0;

			tax2Rate = 0.18;
		}
		tax4 = 13000;
		
		if(landCount > 1)
			tax4 = tax4 + (13000 * (landCount-1) );
		
	}else{
		tax1 = _transferInteger( amount * 0.028 );
		tax2 = _transferInteger( amount * 0.0016 );
		tax3 = _transferInteger( amount * 0.002 );
		tax4 = 13000;
		
		tax1Rate = 2.8;
		tax2Rate = 0.16;
		tax3Rate = 0.2;

		if(landCount > 1)
			tax4 = tax4 + (13000 * (landCount-1) );	
		
	}
	
	var resultJsonStr = {
			"취득세" : tax1,
			"지방교육세" : tax2,
			"농어촌특별세" : tax3,
			"증지대" : tax4,
			"취득세율" : tax1Rate,
			"지방교육세율" : tax2Rate,
			"농어촌특별세율" : tax3Rate
	};
		
	return resultJsonStr;
	
} 


//증여등기
function _calculateGive(kind, landCount, isOver85, reductType, amount){
	
	//RT001:아파트, RER002:주택, RER003:상가, RER004:농지, RER005:농지외
	
	var tax1 = 0;
	var tax2 = 0;
	var tax3 = 0;	
	var tax4 = 0;
	
	var tax1Rate = 0;
	var tax2Rate = 0;
	var tax3Rate = 0;

	if(kind == "RT001"){
		
		tax1 = _transferInteger( amount * 0.035 );
		tax2 = _transferInteger( amount * 0.003 );

		tax1Rate = 3.5;
		tax2Rate = 0.3;

		if(isOver85){
			tax3 = _transferInteger( amount * 0.002 );
			tax3Rate = 0.2;
		}
		tax4 = 13000;
		
	}else if(kind == "RT002"){
		tax1 = _transferInteger( amount * 0.035 );
		tax2 = _transferInteger( amount * 0.003 );

		tax1Rate = 3.5;
		tax2Rate = 0.3;

		if(isOver85){
			tax3 = _transferInteger( amount * 0.002 );
			tax3Rate = 0.2;
		}

		tax4 = 26000;
		if(landCount > 1)
			tax4 = tax4 + (13000 * (landCount-1) );	
		
	}else if(kind == "RT003"){
		tax1 = _transferInteger( amount * 0.035 );
		tax2 = _transferInteger( amount * 0.003 );
		tax3 = _transferInteger( amount * 0.002 );
		tax4 = 13000;

		tax1Rate = 3.5;
		tax2Rate = 0.3;
		tax3Rate = 0.2;

	}else if(kind == "RT004"){
		
		if(reductType == "1"){
			tax1 = _transferInteger( amount * 0.035 );
			tax2 = _transferInteger( amount * 0.003 );
			tax3 = _transferInteger( amount * 0.002 );

			tax1Rate = 3.5;
			tax2Rate = 0.3;
			tax3Rate = 0.2;

		}else{
			tax1 = _transferInteger( amount * 0.0175 );
			tax2 = _transferInteger( amount * 0.0015 );
			tax3 = 0;

			tax1Rate = 1.75;
			tax2Rate = 0.15;
		}		
		tax4 = 13000;
		if(landCount > 1)
			tax4 = tax4 + (13000 * (landCount-1) );	
	}else{
		tax1 = _transferInteger( amount * 0.035 );
		tax2 = _transferInteger( amount * 0.003 );

		tax1Rate = 3.5;
		tax2Rate = 0.3;
		
		if(isOver85){
			tax3 = _transferInteger( amount * 0.002 );
			tax3Rate = 0.2;
		}

		tax4 = 13000;
		if(landCount > 1)
			tax4 = tax4 + (13000 * (landCount-1) );	
	}
	
	var resultJsonStr = {
			"취득세" : tax1,
			"지방교육세" : tax2,
			"농어촌특별세" : tax3,
			"증지대" : tax4,
			"취득세율" : tax1Rate,
			"지방교육세율" : tax2Rate,
			"농어촌특별세율" : tax3Rate
	};
		
	return resultJsonStr;
	
} 

//근저당권설정
function _calculateMortgageRight(kind, landCount, reductType, amount){
	
	var tax1 = 0;
	var tax2 = 0;
	var tax3 = 0;	
	
	var tax1Rate = 0;
	var tax2Rate = 0;

	var totalAmount = amount * (reductType * 0.01)
	
	if(kind == "RT001"){
		tax1 = _transferInteger( totalAmount * 0.002 );
		tax2 = _transferInteger( totalAmount * 0.0004 );

		tax1Rate = 0.2;
		tax2Rate = 0.04;

		tax3 = 13000;
	}else if(kind == "RT002"){
		tax1 = _transferInteger( totalAmount * 0.002 );
		tax2 = _transferInteger( totalAmount * 0.0004 );

		tax1Rate = 0.2;
		tax2Rate = 0.04;

		tax3 = 26000;
		if(landCount > 1)
			tax3 = tax3 + (13000 * (landCount-1) );	
	}else{
		tax1 = _transferInteger( totalAmount * 0.002 );
		tax2 = _transferInteger( totalAmount * 0.0004 );

		tax1Rate = 0.2;
		tax2Rate = 0.04;

		tax3 = 13000;
		if(landCount > 1)
			tax3 = tax3 + (13000 * (landCount-1) );
	}
	
	var resultJsonStr = {
			"등록면허세" : tax1,
			"지방교육세" : tax2,
			"증지대" : tax3,
			"등록면허세율" : tax1Rate,
			"지방교육세율" : tax2Rate
	};
		
	return resultJsonStr;
	
} 

function _calculateTaxTransferRight(kind, landCount, isOver85, reductType, amount, isOverFour){
	var tax1 = 0; //취득세
	var tax2 = 0; //농어촌특별세
	var tax3 = 0; //지방교육세
	var tax4 = 0; //인지대
	var tax5 = 0; //증지대
	var tax6 = 0; //채권(자기부담금)

	var tax1Rate = 0;
	var tax2Rate = 0;
	var tax3Rate = 0;

	var tax123;
	
	switch(kind){
	case "RT001":
		//아파트
		if(isOver85){
			tax123 = _calculateTaxOver85(amount, isOverFour);
		}else{
			tax123 = _calculateTaxBelow85(amount, isOverFour);
		}
		tax1 = tax123.tax1;
		tax2 = tax123.tax2;
		tax3 = tax123.tax3;
		
		tax1Rate = tax123.tax1Rate;
		tax2Rate = tax123.tax2Rate;
		tax3Rate = tax123.tax3Rate;

		if(amount > 100000000 && amount <= 1000000000)
			tax4 = 150000;
		else if(amount > 1000000000)
			tax4 = 350000;
		
		tax5 = 13000;

		//채권
		tax6 = cal_0();
        alert('아파트 채권 : ' + tax6);
		break;
	case "RT002":
		//주택
		if(isOver85){
			tax123 = _calculateTaxOver85(amount, isOverFour);
		}else{
			tax123 = _calculateTaxBelow85(amount, isOverFour);
		}
		tax1 = tax123.tax1;
		tax2 = tax123.tax2;
		tax3 = tax123.tax3;

		tax1Rate = tax123.tax1Rate;
		tax2Rate = tax123.tax2Rate;
		tax3Rate = tax123.tax3Rate;
		
		if(amount > 100000000 && amount <= 1000000000)
			tax4 = 150000;
		else if(amount > 1000000000)
			tax4 = 350000;
		
		tax5 = 26000;
		if(landCount > 1)
			tax5 = tax5 + (13000 * (landCount-1) );		

		//채권
		tax6 = cal_0();
        alert('주택 채권 : ' + tax6);

		break;
	case "RT003":
		//상가
		tax1 = _transferInteger( amount * 0.04 );
		tax2 = _transferInteger( amount * 0.002 );
		tax3 = _transferInteger( amount * 0.004 );
		
		tax1Rate = 4;
		tax2Rate = 0.2;
		tax3Rate = 0.4;

		tax4 = _calculateTax4(amount);
		
		tax5 = 13000;

		//채권
		tax6 = cal_2();
        alert('상가 채권 : ' + tax6);

		break;
	case "RT004":
		//농지
		if(reductType == "1"){
			tax1 = _transferInteger( amount * 0.03 );
			tax2 = _transferInteger( amount * 0.002 );
			tax3 = _transferInteger( amount * 0.002 );

			tax1Rate = 3;
			tax2Rate = 0.2;
			tax3Rate = 0.2;

		}else if(reductType == "2"){
			tax1 = _transferInteger( amount * 0.015 );
			tax2 = 0;
			tax3 = _transferInteger( amount * 0.001 );

			tax1Rate = 1.5;
			tax2Rate = 0;
			tax3Rate = 0.1;

		}else if(reductType == "3"){
			tax1 = _transferInteger( amount * 0.023 );
			tax2 = _transferInteger( amount * 0.002 );
			tax3 = _transferInteger( amount * 0.0006 );

			tax1Rate = 2.3;
			tax2Rate = 0.2;
			tax3Rate = 0.06;

		}
		
		tax4 = _calculateTax4(amount);
		
		tax5 = 13000;
		if(landCount > 1)
			tax5 = tax5 + (13000 * (landCount-1) );		

		//농지
		tax6 = cal_1();
		alert('농지 : ' + tax6);

		break;
	case "RT005":
		//농지외
		tax1 = _transferInteger( amount * 0.04 );
		tax2 = _transferInteger( amount * 0.002 );
		tax3 = _transferInteger( amount * 0.004 );
		
		tax1Rate = 4;
		tax2Rate = 0.2;
		tax3Rate = 0.4;

		tax4 = _calculateTax4(amount);
		
		tax5 = 13000;
		if(landCount > 1)
			tax5 = tax5 + (13000 * (landCount-1) );		

		//채권
		tax6 = cal_2();
		alert('상가 or 농지 외 : ' + tax6);

		break;
	default:
		break;
	}
	
	var resultJsonStr = {
			"취득세" : _transferInteger(tax1),			
			"지방교육세" : _transferInteger(tax3),
			"농어촌특별세" : _transferInteger(tax2),
			"인지대": _transferInteger(tax4),
			"증지대": _transferInteger(tax5),				
			"취득세율" : tax1Rate,
			"지방교육세율" : tax3Rate,
			"농어촌특별세율" : tax2Rate,
			"채권(자기부담금)" : _transferInteger(tax6 * 0.03)
	};
		
	return resultJsonStr;
	
}

//인지대계산
function _calculateTax4(amount){
	var tax4 = 0;
	if(amount > 10000000 && amount <= 30000000)
		tax4 = 20000;
	else if(amount > 30000000 && amount <= 50000000)
		tax4 = 40000;
	else if(amount > 50000000 && amount <= 100000000)
		tax4 = 70000;
	else if(amount > 100000000 && amount <= 1000000000)
		tax4 = 150000;
	else if(amount > 1000000000)
		tax4 = 350000;
	
	return tax4;
}

//85 초과 취득세 계산 (아파트, 주택)
function _calculateTaxOver85(amount, isOverFour){
	var tax123 = {
		tax1 : 0,
		tax2 : 0,
		tax3 : 0,
        tax1Rate : 0,
		tax2Rate : 0,
		tax3Rate : 0
	};
	
	if(amount <= 600000000){
		
		var tax1Rate_2020 = standard_2020(amount, isOverFour, true);
		var tax3Rate_2020 = roundThreeoPoint(tax1Rate_2020 * 0.1);
		
		tax123.tax1 = _transferInteger(amount * tax1Rate_2020 * 0.01);
		tax123.tax2 = _transferInteger(amount * 0.002);
		tax123.tax3 = _transferInteger(amount * tax3Rate_2020 * 0.01);

		tax123.tax1Rate = tax1Rate_2020;
		tax123.tax2Rate = 0.2;
		tax123.tax3Rate = tax3Rate_2020;

	}else if(amount > 600000000 && amount <= 900000000){
		var tax1Rate_2020 = standard_2020(amount, isOverFour, true);
		var tax3Rate_2020 = roundThreeoPoint(tax1Rate_2020 * 0.1);
		
		tax123.tax1 = _transferInteger(amount * tax1Rate_2020 * 0.01);		
		tax123.tax2 = _transferInteger(amount * 0.002);
		tax123.tax3 = _transferInteger(amount * tax3Rate_2020 * 0.01);

		tax123.tax1Rate = tax1Rate_2020;
		tax123.tax2Rate = 0.2;
		tax123.tax3Rate = tax3Rate_2020;

	}else if(amount > 900000000){
		var tax1Rate_2020 = standard_2020(amount, isOverFour, true);
		var tax3Rate_2020 = roundThreeoPoint(tax1Rate_2020 * 0.1);
		
		tax123.tax1 = _transferInteger(amount * tax1Rate_2020 * 0.01);		
		tax123.tax2 = _transferInteger(amount * 0.002);
		tax123.tax3 = _transferInteger(amount * tax3Rate_2020 * 0.01);

		tax123.tax1Rate = tax1Rate_2020;
		tax123.tax2Rate = 0.2;
		tax123.tax3Rate = tax3Rate_2020;

	}

	return tax123;
}

//85이하 취득세 계산 (아파트, 주택)
function _calculateTaxBelow85(amount, isOverFour){
	var tax123 = {
			tax1 : 0,
			tax2 : 0,
			tax3 : 0,
			tax1Rate : 0,
			tax2Rate : 0,
			tax3Rate : 0
		};

	if(amount <= 600000000){
		var tax1Rate_2020 = standard_2020(amount, isOverFour, false);
		var tax3Rate_2020 = roundThreeoPoint(tax1Rate_2020 * 0.1);

		tax123.tax1 = _transferInteger(amount * tax1Rate_2020 * 0.01);
		tax123.tax2 = 0;
		tax123.tax3 = _transferInteger(amount * tax3Rate_2020 * 0.01);

		tax123.tax1Rate = tax1Rate_2020;
		tax123.tax2Rate = 0;
		tax123.tax3Rate = tax3Rate_2020;

	}else if(amount > 600000000 && amount <= 900000000){
		var tax1Rate_2020 = standard_2020(amount, isOverFour, false);
		var tax3Rate_2020 = roundThreeoPoint(tax1Rate_2020 * 0.1);

		tax123.tax1 = _transferInteger(amount * tax1Rate_2020 * 0.01);
		tax123.tax2 = 0;
		tax123.tax3 = _transferInteger(amount * tax3Rate_2020 * 0.01);

		tax123.tax1Rate = tax1Rate_2020;
		tax123.tax2Rate = 0;
		tax123.tax3Rate = tax3Rate_2020;

	}else if(amount > 900000000){
		var tax1Rate_2020 = standard_2020(amount, isOverFour, false);
		var tax3Rate_2020 = roundThreeoPoint(tax1Rate_2020 * 0.1);

		tax123.tax1 = _transferInteger(amount * tax1Rate_2020 * 0.01);
		tax123.tax2 = 0;
		tax123.tax3 = _transferInteger(amount * tax3Rate_2020 * 0.01);

		tax123.tax1Rate = tax1Rate_2020;
		tax123.tax2Rate = 0;
		tax123.tax3Rate = tax3Rate_2020;

	}

	return tax123;
}

function standard_2020(amount, isOverFour, isOver85){

    if(isOverFour){
        if(isOver85){
            return 4;
        }else{
            return 4;
        }
    }

    if(amount <= 600000000){
        return 1;
    }

    if(amount > 900000000){
        return 3;
    }


    if(amount == 900000000){
        return 2.99;
    }

    var x = roundTwoPoint(amount / 100000000);
    var x2 = 2 / 3 * x;
    var x3 = roundTwoPoint(x2 - 3);
    return x3;
}

function roundTwoPoint(val){
    var ret = val;
    return ret.toFixed(2);
}

function roundThreeoPoint(val){
    var ret = val;
    return ret.toFixed(3);
}

function _transferInteger(value){
	var result =  Math.ceil(value);
	
	if( (result % 10)  == 1 )
		result = result - 1;
	//Math.floor(value);
	
	return result;
}

function _transferInteger2(value){
	var result =  Math.floor(value);
	
	//if( (result % 10)  == 1 )
	//	result = result - 1;
	//Math.floor(value);
	
	return result;
}

