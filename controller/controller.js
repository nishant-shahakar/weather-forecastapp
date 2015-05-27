 function Weather_app($scope, $http ,$log) {
  $scope.temp=[];
  $scope.flag=true;
  var mysrclat= 0; var mysrclong = 0;
  var onload = function(){
        if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(function (position) {
                      $scope.cities = [];
                      mysrclat = position.coords.latitude; 
                      mysrclong = position.coords.longitude;
                      var url="http://api.openweathermap.org/data/2.5/forecast/daily";
                                        $http.jsonp(url, { params : {
                                                lat : mysrclat,
                                                lon : mysrclong,
                                                mode :"json",
                                                cnt:"14",
                                                units:"metric",
                                                callback: 'JSON_CALLBACK'
                                              }}).success(function(response){
                                             $scope.cities.push(response);
                                            }).error(function(data, status, headers, config) {
                                        });
                        });
                    
        }
  }
  onload();
var search= function(input,name){
  var i=0, len=input.length;
  for (; i<len; i++) {
      if (input[i].name == name) {
      return input[i];
      }
  }
  return null;
}
$scope.search = function(){
         $scope.flag = false;
         $scope.cities = [];
         angular.forEach($scope.temp, function(value, key) {
                            var url="http://api.openweathermap.org/data/2.5/forecast/daily";
                            $http.jsonp(url, { params : {
                                    q : value.name,
                                    mode :"json",
                                    cnt:"14",
                                    units:"metric",
                                    callback: 'JSON_CALLBACK'
                                  }}).success(function(response){
                                 $scope.cities.push(response);
                                 $scope.flag = true;
                            }).error(function(data, status, headers, config) {
                                // Log an error in the browser's console.
                                alert("Invalid City "+ value.name);
                                $scope.temp.splice(key, 1);   
                                $scope.flag = true;
                                });
         });                    
    }
$scope.add = function(){
    if(!search($scope.temp,$scope.ct))
        $scope.temp.push({name:$scope.ct});
     $scope.ct="";
}
$scope.clear = function(){                    
    $scope.temp=[];
    $scope.cities=[];

}
};