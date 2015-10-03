angular.module('myapp', ['onsen'])

            .controller('CustomerController', function ($scope, $http) {
               
                var memberCode = window.localStorage.getItem("memberCode");
                memberCode = '790523085533';
                if (memberCode != undefined) {
                    $http.get("http://mobilewebapi.avermax.com.my/api/WebClient/")
                    .success(function (response) { $scope.names = response; });
                }
                else {
                    menu.setMainPage('login.html', { closeMenu: true });
                }
                 
            })

            .controller('LoginController', function ($scope, $http) {
                window.localStorage.removeItem("memberCode");
                this.mcode;
                this.password;
                this.pay = function pay() {
                    //alert("Hello");
                    
                    $http.get("http://mobilewebapi.avermax.com.my/api/WebClient/" + this.mcode + "/" + this.password)
                    .success(function (response) {
                           menu.setMainPage('customers.html', { closeMenu: true });
                       }
                       ).error(function (data, status) {
                           window.localStorage.removeItem("memberCode");
                           window.alert("Error");
                       });

                };
            })

         //.controller('InvoiceController2', function () {
         //    this.qty = 1;
         //    this.cost = 2;
         //    this.inCurr = 'EUR';
         //    this.currencies = ['USD', 'EUR', 'CNY'];
         //    this.usdToForeignRates = {
         //        USD: 1,
         //        EUR: 0.74,
         //        CNY: 6.09
         //    };

         //    this.total = function total(outCurr) {
         //        return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
         //    };
         //    this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
         //        return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
         //    };
         //    this.pay = function pay() {
         //        window.alert("Quantity = " + this.qty);
         //    };
         //})

;
;