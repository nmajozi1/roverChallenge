angular.module('appMod.controllers', [])
.controller('homeController', function($scope, $location, $http, $mdDialog, $rootScope) {
        $scope.header = 'Platform 45 Test Data Input'

        // ~~~~~~~~~~~~~Add Rover
        $scope.addRover = function() {
            $mdDialog.show({
                controller  : addRoverController,
                templateUrl : '../pages/dialogTemplates/addRoverTemplate.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                fullscreen  : $scope.customFullscreen 
            })
            .then(function(answer) {}, function() {});
        }

        function addRoverController($scope, $rootScope, $mdDialog) {
            $scope.answer = function(answer, addData) {
                $mdDialog.hide(answer)
                if(answer == 'addRover') {
                    $http.post('/addRover/' + JSON.stringify(addData)).then(function(response) {
                        if(response.data.code == '00') {
                            var confirm = $mdDialog.alert()
                            .title('Rover, ' + addData.roverName + ' has been added successfully. ')
                            .ok('Ok')
                
                            $mdDialog.show(confirm).then(function() {}, function() {})
                        } else {
                            var confirm = $mdDialog.alert()
                            .title(response.data.message)
                            .ok('Ok')
                
                            $mdDialog.show(confirm).then(function() {}, function() {})
                        }
                    })
                } else {
                    
                }
            }
        }

        // ~~~~~~~~~~~~~Move Rover
        $scope.moveRover = function() {
            $mdDialog.show({
                controller  : moveRoverController,
                templateUrl : '../pages/dialogTemplates/moveRoverTemplate.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                fullscreen  : $scope.customFullscreen 
            })
            .then(function(answer) {}, function() {});
        }

        function moveRoverController($scope, $rootScope, $mdDialog) {
            $scope.answer = function(answer, addData) {
                $mdDialog.hide(answer)
                if(answer == 'moveRover') {
                    console.log(addData)
                    $http.post('/moveRover/'+JSON.stringify(addData)).then(function(response) {
                        if(response.data.code == '00') {
                            console.log(response.data.data)
                            var confirm = $mdDialog.alert()
                            .title(response.data.data)
                            .ok('Ok')
                
                            $mdDialog.show(confirm).then(function() {}, function() {})
                        } else {
                            var confirm = $mdDialog.alert()
                            .title(response.data.message)
                            .ok('Ok')
                
                            $mdDialog.show(confirm).then(function() {}, function() {})
                        }
                    })
                } else {
                    
                }
            }
        }
})
