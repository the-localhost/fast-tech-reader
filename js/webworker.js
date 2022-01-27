//var hac = document.getElementById("hac");


onmessage = function(e) {
    if( e.data !== undefined ){
        while(true){
            if( e.data !== 5) {
                console.log(e.data);
                break;
            }
        }
    }
}


/*angular.module('plunker', ['ui.bootstrap']);
function TypeaheadCtrl($scope, $http, limitToFilter) {

  $scope.cities = function(cityName) {
    console.log(cityName);
    if (cityName !== localStorage.getItem("pageno")) {
      console.log("Welcome to " + cityName);
    }
    return $http.jsonp("http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter=US&q="+cityName).then(function(response){
      return limitToFilter(response.data, 15);
    });
  };
  
  $scope.$watch('result', function(value) {
    $scope.output = $scope.cities(value);
    //console.log($scope.cities(value));
  }); 
}*/