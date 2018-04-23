'use strict'

var app = angular.module('appMod', ['ngRoute', 'ngAnimate', 'appMod.controllers', 'ngMaterial','ngAria', 'ngMessages', 'chart.js'])

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'../pages/homePage.html',
            controller:'homeController'
        })
        .otherwise({
            redirectTo: '/'
        });
})

