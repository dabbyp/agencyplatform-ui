    var selectValue = "";
    var areaText = {
        "0": "서울특별시 및 광역시"
        ,"1" : "그 밖의 지역"
    };

    function setDeungGi(t) {
        // div class가 inputArea, resultArea로 지정된 것들을 hide
        $(".inputArea, .resultArea").hide();
        // div id가 contents로 지정된 것들 중 text type 인 것들의 값을 ""로 설정
        $("#contents input[type=text]").val("");
        // div id가 contents로 지정된 것들 중 select type 인 것들의 값이 0보다 큰 것들을 ""로 설정
        $("#contents select:gt(0)").val("");
        //$(".resultTextArea").text("");
        selectValue = "";

        var deungGi = t.value;
        if(deungGi != "") {
            // ul id가 inputArea_0으로 지정된 것들을 show
            //$("#inputArea_"+val).show();
            //$("#resultArea_"+val).show();
            $("#inputArea_0").show();
            $("#resultArea_0").show();

            selectValue = deungGi;
        }

        // 소유권이전
        if(deungGi == "DG001"){
          var realTypeHtml = new Array();
          realTypeHtml.push("<option value='' selected='selected'>선택하세요</option>");
          realTypeHtml.push("<option value='RT001'>아파트</option>");
          realTypeHtml.push("<option value='RT002'>주택(단독주택, 다가구주택 등)</option>");
          realTypeHtml.push("<option value='RT003'>상가(점포,사무실,오피스텔)</option>");
          realTypeHtml.push("<option value='RT004'>농지</option>");
          realTypeHtml.push("<option value='RT005'>농지외</option>");
          $("#realType").html(realTypeHtml.join(""));
        }

        // 전세권 설정
        if(deungGi == "DG002"){
          var realTypeHtml = new Array();
          realTypeHtml.push("<option value='' selected='selected'>선택하세요</option>");
          realTypeHtml.push("<option value='RT001'>아파트, 주택, 상가</option>");
          $("#realType").html(realTypeHtml.join(""));
        }

        // 근저당권 설정
        if(deungGi == "DG003"){
          var realTypeHtml = new Array();
          realTypeHtml.push("<option value='' selected='selected'>선택하세요</option>");
          realTypeHtml.push("<option value='RT001'>아파트</option>");
          realTypeHtml.push("<option value='RT002'>주택(단독주택, 다가구주택 등)</option>");
          realTypeHtml.push("<option value='RT003'>상가(점포,사무실,오피스텔)</option>");
          realTypeHtml.push("<option value='RT004'>농지</option>");
          realTypeHtml.push("<option value='RT005'>농지외</option>");
          $("#realType").html(realTypeHtml.join(""));
        }

        // 증여등기
        if(deungGi == "DG004"){
          var realTypeHtml = new Array();
          realTypeHtml.push("<option value='' selected='selected'>선택하세요</option>");
          realTypeHtml.push("<option value='RT001'>아파트</option>");
          realTypeHtml.push("<option value='RT002'>주택(단독주택, 다가구주택 등)</option>");
          realTypeHtml.push("<option value='RT003'>상가(점포,사무실,오피스텔)</option>");
          realTypeHtml.push("<option value='RT004'>농지</option>");
          realTypeHtml.push("<option value='RT005'>농지외</option>");
          $("#realType").html(realTypeHtml.join(""));
        }

        // 상속등기
        if(deungGi == "DG005"){
          var realTypeHtml = new Array();
          realTypeHtml.push("<option value='' selected='selected'>선택하세요</option>");
          realTypeHtml.push("<option value='RT001'>아파트</option>");
          realTypeHtml.push("<option value='RT002'>주택(단독주택, 다가구주택 등)</option>");
          realTypeHtml.push("<option value='RT003'>상가(점포,사무실,오피스텔)</option>");
          realTypeHtml.push("<option value='RT004'>농지</option>");
          realTypeHtml.push("<option value='RT005'>농지외</option>");
          $("#realType").html(realTypeHtml.join(""));
        }

        hideAll();
        $("#li_0").show();
    }

  function changeRealType(){
    hideAll();
    var realType = $("#realType").val();
    var deungGi = $("#deungGi").val();

    // 아파트
    if(realType == "RT001"){
        // 소유권이전
        if(deungGi == "DG001"){
            $("#moneySpan").text("거래금액");
            // 거래금액
            $("#li_1").show();
            // 시가표준액
            $("#li_2").show();
            // 대상물건지역
            $("#li_3").show();
            // 감면조항
            $("#li_4").show();
            // 보유주택수
            $("#li_5").show();
        }
        // 전세권설정
        else if(deungGi == "DG002"){
            $("#moneySpan").text("전세보증금");
            // 거래금액
            $("#li_1").show();
        }
        // 근저당권설정
        else if(deungGi == "DG003"){
            $("#moneySpan").text("채무금액");
            // 거래금액
            $("#li_1").show();













          // TODO  20200413



          //$("#bond_max_title").show();$("#bond_max_content").show();
          //$("#tax_title").show();$("#tax_content").show();
        }
        // 증여등기
        else if(deungGi == "DG004"){
          $("#del_cond_title").show();$("#del_cond_content").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();
          $("#area_title").show();$("#area_content").show();
        }
        // 상속등기
        else if(deungGi == "DG005"){
          $("#del_cond_title").show();$("#del_cond_content").show();
          $("#del_cond2_title").show();$("#del_cond2_content").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();
          $("#area_title").show();$("#area_content").show();
        }
    }
    // 주택
    if(realType == "RT002"){
        // 소유권이전
        if(deungGi == "DG001"){
          $("#moneySpan").text("거래금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();

          $("#own_house_title").show();$("#own_house_content").show();
          $("#del_cond_title").show();$("#del_cond_content").show();
          $("#square_title").show();$("#square_content").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();

          $("#area_title").show();$("#area_content").show();
        }
        // 전세권설정
        else if(deungGi == "DG002"){
          $("#moneySpan").text("전세보증금");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();
        }
        // 근저당권설정
        else if(deungGi == "DG003"){
          $("#moneySpan").text("채무금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();

          $("#bond_max_title").show();$("#bond_max_content").show();
          $("#square_title").show();$("#square_content").show();
        }
        // 증여등기
        else if(deungGi == "DG004"){
          $("#del_cond_title").show();$("#del_cond_content").show();
          $("#square_title").show();$("#square_content").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();

          $("#area_title").show();$("#area_content").show();
        }
        // 상속등기
        else if(deungGi == "DG005"){
          $("#del_cond_title").show();$("#del_cond_content").show();
          $("#del_cond2_title").show();$("#del_cond2_content").show();
          $("#square_title").show();$("#square_content").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();

          $("#area_title").show();$("#area_content").show();
        }
    }
    // 상가
    if(realType == "RT003"){
        // 소유권이전
        if(deungGi == "DG001"){
          $("#moneySpan").text("거래금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();

          $("#area_title").show();$("#area_content").show();
        }
        // 전세권설정
        else if(deungGi == "DG002"){
          $("#moneySpan").text("전세보증금");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();
        }
        // 근저당권설정
        else if(deungGi == "DG003"){
          $("#moneySpan").text("채무금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();

          $("#bond_max_title").show();$("#bond_max_content").show();
          $("#square_title").show();$("#square_content").show();
        }
        // 증여등기
        else if(deungGi == "DG004"){
          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();

          $("#area_title").show();$("#area_content").show();
        }
        // 상속등기
        else if(deungGi == "DG005"){
          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();

          $("#area_title").show();$("#area_content").show();
        }
    }
    // 농지
    if(realType == "RT004"){
        // 소유권이전
        if(deungGi == "DG001"){
          $("#moneySpan").text("거래금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();
          $("#square_title").show();$("#square_content").show();
          $("#del_cond3_title").show();$("#del_cond3_content").show();

          $("#taxSpan").text("시가표준액");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();

          $("#area_title").show();$("#area_content").show();
        }
        // 전세권설정
        else if(deungGi == "DG002"){
          $("#moneySpan").text("전세보증금");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();
        }
        // 근저당권설정
        else if(deungGi == "DG003"){
          $("#moneySpan").text("채무금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();
          $("#bond_max_title").show();$("#bond_max_content").show();
          $("#square_title").show();$("#square_content").show();
        }
        // 증여등기
        else if(deungGi == "DG004"){
          $("#square_title").show();$("#square_content").show();
          $("#del_cond3_title").show();$("#del_cond3_content").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();
          $("#area_title").show();$("#area_content").show();
        }
        // 상속등기
        else if(deungGi == "DG005"){
          $("#square_title").show();$("#square_content").show();
          $("#del_cond3_title").show();$("#del_cond3_content").show();

          $("#tax_title").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();
          $("#area_title").show();$("#area_content").show();
        }
    }
    // 농지외
    if(realType == "RT005"){
        // 소유권이전
        if(deungGi == "DG001"){
          $("#moneySpan").text("거래금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();

          $("#square_title").show();$("#square_content").show();

          $("#taxSpan").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").show();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").show();
          $("#area_title").show();$("#area_content").show();
        }
        // 전세권설정
        else if(deungGi == "DG002"){
          $("#moneySpan").text("전세보증금");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();
        }
        // 근저당권설정
        else if(deungGi == "DG003"){
          $("#moneySpan").text("채무금액");
          $("#moneySpan").show();$("#money").show();$("#moneyText").show();
          $("#bond_max_title").show();$("#bond_max_content").show();
          $("#square_title").show();$("#square_content").show();
        }
        // 증여등기
        else if(deungGi == "DG004"){
          $("#square_title").show();$("#square_content").show();

          $("#tax_title").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").hide();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").hide();
          $("#area_title").show();$("#area_content").show();
        }
        // 상속등기
        else if(deungGi == "DG005"){
          $("#square_title").show();$("#square_content").show();

          $("#tax_title").text("시가표준액(건물분)");
          $("#tax_title").show();$("#tax_content").show();$("#taxText").hide();
          $("#tax_title2").show();$("#tax_content2").show();$("#tax2Text").hide();
          $("#area_title").show();$("#area_content").show();
        }
    }
  }

  function hideAll(){
    for(var i=1; i <= 5; i++){
        $("#li_" + i).hide();
    }
  }

  function doCalculate(){
    var deungGi = $("#deungGi").val();
    var realType = $("#realType").val();
    var money = $("#money").val();

    var delCond = $('input[name="del_cond"]:checked').val();
    var bondMax = $("#bond_max").val();
    var square = $("#square").val();
    var delCond3 = $('input[name="del_cond3"]:checked').val();
    var delCond2 = $('input[name="del_cond2"]:checked').val();
    var ownHouse = $('input[name="own_house"]:checked').val();

//    alert(deungGi + ' | ' + realType + ' | ' + money + ' | ' + delCond + ' | ' + ' | ' + bondMax + ' | ' + square + ' | ' + delCond3 + ' | ' + delCond2 + ' | ' + ownHouse);

    if(money == null || money == ""){
      alert("거래금액을 입력하세요.");
      return;
    }

    // 전세권 설정이 아닌 경우
    if(realType != "RT002"){
        if(tax == null || tax == ""){
          alert("시가표준액(공시지가)을 입력하세요.");
          return;
        }
    }

    if(realType == "RT001" || realType == "RT002"){
      if(deungGi != "DG002" && deungGi != "DG003"){
        if(_isNull(delCond)){
          alert("전용면적을 선택하세요.");
          return;
        }
      }

      if(deungGi == "DG001"){
        if(_isNull(ownHouse)){
          alert("보유주택 수를 선택하세요.");
          return;
        }
      }

    }

    if(!_isNull(money))
      money = _moneyNoCurrencyFormat(money);

    resultHtml(deungGi, realType, money, delCond, bondMax, square, delCond3, delCond2, ownHouse);
  }

  function resultHtml(deungGi, realType, money, delCond, bondMax, square, delCond3, delCond2, ownHouse){
    var totalmoney = 0;
    var rType = "";

    /*
    // 무주택자 감면
    delCond2 - 무주택 : 1, 1주택 이상 : 2
    // 감면조항
    delCond3 - 농지부2년이상보유 : 2, 감면사항없음 : 1
    // 채권최고액 (%)
    bondMax - 100 ~ 150
    */

    if(deungGi == "DG001" && realType == "RT004"){
      rType = delCond3;
    }
    if(deungGi == "DG004" && realType == "RT004"){
      rType = delCond3;
    }
    if(deungGi == "DG003"){
      rType = bondMax;
    }
    if(deungGi == "DG005"){
      if(realType == "RT001" || realType == "RT002"){
        rType = delCond2;
      }
      if(realType == "RT004"){
        rType = delCond3;
      }
    }

    var pOver85 = true;
    if(delCond == "false")
      pOver85 = false;

    var pOver4 = true;
    if(ownHouse == "false")
      pOver4 = false;

    var result = _getTaxInfo(deungGi, realType, square, pOver85, rType, money, pOver4);
    var keys = Object.keys( result );

    var htmlArray = new Array();
    htmlArray.push("<colgroup>");
    htmlArray.push("	<col width='30%'/>");
    htmlArray.push("	<col width='*'/>");
    htmlArray.push("	<col width='30%'/>");
    htmlArray.push("</colgroup>");
    htmlArray.push("<thead class='thead-dark'>");
    htmlArray.push("	<tr align='center'>");
    htmlArray.push("		<th scope='col'><font size='3' color='white'>항 목</font></th>");
    htmlArray.push("		<th scope='col'><font size='3' color='white'>금 액</font></th>");
    htmlArray.push("		<th cope='col'><font size='3' color='white'>비 고</font></th>");
    htmlArray.push("	</tr>");
    htmlArray.push("</thead>");
    htmlArray.push("<tbody>");

    for(var i=0; i < keys.length; i++){

      if(keys[i].indexOf("율") >= 0){
        continue;
      }

      htmlArray.push("<tr>");
      htmlArray.push("	<td>"+keys[i]+"</td>");
      htmlArray.push("	<td align='right'>");
      htmlArray.push("			"+_setCurrency(result[keys[i]])+"원");
      htmlArray.push("	</td>");
      if(!_isNull(result[keys[i]+"율"])){
        htmlArray.push("	<td align='right'>"+result[keys[i]+'율']+"%</td>");
      }else{
        htmlArray.push("	<td></td>");
      }
      htmlArray.push("</tr>");

      totalmoney += Number(result[keys[i]]);
    }

    var fee_1 = _getJudicialServiceCost(money, deungGi);
    var fee_2 =  fee_1 * 0.1;

    totalmoney += fee_1 + fee_2;

    htmlArray.push("<tr>");
    htmlArray.push("	<td>법정수수료</td>");
    htmlArray.push("	<td align='right'>");
    htmlArray.push("			"+_setCurrency(fee_1)+"원");
    htmlArray.push("	</td>");
    htmlArray.push("	<td></td>");
    htmlArray.push("</tr>");
    htmlArray.push("<tr>");
    htmlArray.push("	<td>부가세</td>");
    htmlArray.push("	<td align='right'>");
    htmlArray.push("			"+_setCurrency(fee_2)+"원");
    htmlArray.push("	</td>");
    htmlArray.push("	<td align='right'>법정수수료의 10%</td>");
    htmlArray.push("</tr>");
    htmlArray.push("</tbody>");

    htmlArray.push("<tfoot>");
    htmlArray.push("	<tr>");
    htmlArray.push("		<td bgcolor='gray' align='center'><font size='3' color='white'><b>합 계</b></font></td>");
    htmlArray.push("		<td bgcolor='gray' align='right'><font size='3' color='white'><b>");
    htmlArray.push("				"+_setCurrency(totalmoney)+"원</b></font>");
    htmlArray.push("		</td>");
    htmlArray.push("		<td bgcolor='gray'></td>");
    htmlArray.push("	</tr>");
    htmlArray.push("</tfoot>");

    $("#result_contents").html(htmlArray.join(""));

    $("#resultTable").show();
    $("#requestButton").show();
  }
