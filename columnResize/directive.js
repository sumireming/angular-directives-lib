angular.module("table", [])
.controller("ctrl", function($scope) {
	var testData = '[{"isHotDeployable":"false","propname":"com.tibco.cim.database.name","dataType":"string","default":"cimdev","visibility":"Basic","sinceVersion":"7.0","description":"The name of the database containing the MDM data. Note that value should be the same than used in the data source definition in the application server configration. Typically this value is specified by the DBA","name":"Database Name","value":"cimdev","valueType":"string","readonly":false},{"isHotDeployable":"false","propname":"com.tibco.cim.database.user","dataType":"string","default":"cimdev","visibility":"Basic","sinceVersion":"7.0","description":"The user name used for the connection to the database. Note that value should be the same than used in the data source definition in the Application Server configuration. Typically this value is specified by the DBA","name":"Database User Name","value":"cimdev","valueType":"string","readonly":false},{"isHotDeployable":"false","propname":"com.tibco.cim.database.password","dataType":"password","default":"cimdev","visibility":"Basic","sinceVersion":"7.0","description":"The password used for the connection to the database. Note that value should be the same than used in the data source definition in the Application Server configration. Typically this value is specified by the DBA.","name":"Database User Password","value":"cimdev","valueType":"password","readonly":false}]';
		
	$scope.tableData = angular.fromJson(testData);

})
.directive("editTable", function() {
	return {
		restrict : "A",
		templateUrl : "table.html",
		replace : true,
		scope : {
            tableData : "=tableData" 
        },
        controller : function($scope, $element, $attrs) {

        	$scope.selected = {
                isHotDeployable : false,
                name : true,
                value : true,
                description : true,
                sinceVersion : false
            };
        }
	};
})
.directive("ngColunmResize", function() {   
    return {
      restrict: "A",
      controller : function($scope, $element, $attrs) {
        var resizeFlag = false;
        var index = -1;
        var resizebarPosition;
        var offset;
        var prevEleTH;
        var prevEleTD;
        var prevEleWidth;

        var tableContainer = $($attrs.ngColunmResize);

        var freeColumn = $($attrs.freeColumn);
        var widthSum = 0;
        // tableContainer.find("th:visible").not(freeColumn).each(function(i,e) {
        //   widthSum += $(e).width();
        // });
        // var freeColumnWidth = tableContainer.width() - widthSum - 10;
        // freeColumn.width(freeColumnWidth);
        
        
        $element.bind("mousedown", function(event) {
          resizeFlag = true;
          resizebarPosition = event.clientX;
          index = $($element).parent().index();
          prevEleTH = tableContainer.find("th").eq(index);
          prevEleTD = tableContainer.find("tr").find("td:eq("+ index +")");
          prevEleWidth = prevEleTH.width();
          freeColumnWidth = freeColumn.width();
          prevEleTH.addClass("colunm-active");
          prevEleTD.addClass("colunm-active");
          
        });

        angular.element(document).bind("mousemove", function(event) {
          if(resizeFlag){
            var xCoordinate = event.clientX;
            offset = xCoordinate - resizebarPosition;

            
            prevEleTH.css("width", (prevEleWidth + offset) + "px");
            prevEleTD.css("width", (prevEleWidth + offset) + "px");
            freeColumn.css("width", (freeColumnWidth - offset) + "px");
          }

        });

        angular.element(document).bind("mouseup", function(event) {
          if(!prevEleTH || !prevEleTD){
            return;
          }

          resizeFlag = false;
          prevEleTH.removeClass("colunm-active");
          prevEleTD.removeClass("colunm-active");
        });

      }
    };
    
});