
angular.module('myapp', ['onsen'])

            //shared services
            .service('sharedProperties', function () {
                    var monthsValue = 0;

                    return {
                        getProperty: function () {
                            return monthsValue;
                        },
                        setProperty: function(value) {
                            monthsValue = value;
                        }
                    }})

/////////////////////////////////////////////////////////////////////////////////
            .controller('CustomerController', function ($scope, $http, sharedProperties) {
               
                var memberCode = window.localStorage.getItem("memberCode");
                //memberCode = '790523085533';
                if (memberCode != undefined) {
                    //$http.get("http://mobilewebapi.avermax.com.my/api/WebClient/" + memberCode)
                    //$http.get("http://mobilewebapi.avermax.com.my/api/WebAgent")
                    $http.get("http://localhost:47503/api/WebClientStatementList/" + memberCode)
                    .success(function (response) { $scope.names = response; });       
                    
                     $scope.customNavigate=function(msg){
                    //$location.path("/view2"+msg)
                            //alert(msg);
                            //$scope.Data = Data;
                            sharedProperties.setProperty(msg);
                            menu.setMainPage('myreminders.html', { closeMenu: true });
                    }
                    
                }
                else {
                    menu.setMainPage('login.html', { closeMenu: true });
                }
                 
            })

/////////////////////////////////////////////////////////////////////////////////
                .controller('ClientServiceReport', function ($scope, $http) {
               
                var memberCode = window.localStorage.getItem("memberCode");
                //memberCode = '790523085533';
                if (memberCode != undefined) {
                    $http.get("http://localhost:47503/api/WebClientServiceReport/" + memberCode)
                    .success(function (response) { $scope.names = response; }); 
                }
                else {
                    menu.setMainPage('login.html', { closeMenu: true });
                }
                 
            })

/////////////////////////////////////////////////////////////////////////////////
            .controller('StatementController', function ($scope, $http, sharedProperties) {
               
               //alert(sharedProperties.getProperty());
                var memberCode = window.localStorage.getItem("memberCode");
                if (memberCode != undefined) {
                    //$http.get("http://mobilewebapi.avermax.com.my/api/WebClient/" + memberCode)
                    $http.get("http://localhost:47503/api/WebAgent/GetByMonth/" + memberCode + "/" + sharedProperties.getProperty())
                    
                    .success(function (response) { $scope.names = response; });       
                }
                else {
                    menu.setMainPage('login.html', { closeMenu: true });
                }
                 
            })

/////////////////////////////////////////////////////////////////////////////////
            .controller('LoginController', function ($scope, $http) {
                window.localStorage.removeItem("memberCode");
                this.mcode;
                this.password;
                this.pay = function pay() {
                    //alert("Hello");
                    window.localStorage.setItem("memberCode", this.mcode);
                    $http.get("http://mobilewebapi.avermax.com.my/api/WebClient/" + this.mcode + "/" + this.password)
                    //$http.get("http://localhost:47503/api/WebClient/" + this.mcode + "/" + this.password)
                    .success(function (response) {
                           //alert(response.status) 
                           menu.setMainPage('customers.html', { closeMenu: true });
                       }
                       ).error(function (data, status) {
                           window.localStorage.removeItem("memberCode");
                           window.alert("Error");
                       });

                };
            })

;;