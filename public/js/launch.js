'use strict'

let myApp = angular.module('willsnakechart', ['ui.router', 'app.controllers', 'highcharts-ng'])

let appControllers = angular.module('app.controllers', [])

myApp.controller('myFirstCtrl', function($scope) {

    $scope.chartConfig = {
      chart: {
        type: 'bar'
      },
      series: [{
        data: [10, 15, 12, 8, 7],
        id: 'series1'
      }],
      title: {
        text: 'Hello'
      }
    }

  })

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/test")

    $stateProvider
        .state('test', {
            url: "/test",
            template: '<highchart id="chart1" config="chartConfig"></highchart>',
            resolve: {
                items: ['$http', function ($http) {
                    return $http({
                        method: 'GET',
                        url: '/data'
                    })
                }]
            },
            controller: ['$scope', '$state', 'items', function ($scope, $state, items) {
                let arrayMonths = new Array()
                arrayMonths['january'] = new Array()
                arrayMonths['february'] = new Array()
                arrayMonths['march'] = new Array()
                arrayMonths['april'] = new Array()
                arrayMonths['may'] = new Array()
                arrayMonths['june'] = new Array()
                arrayMonths['july'] = new Array()
                arrayMonths['august'] = new Array()
                arrayMonths['september'] = new Array()
                arrayMonths['october'] = new Array()
                arrayMonths['november'] = new Array()
                arrayMonths['december'] = new Array()

                items.data.data.forEach((value) => {
                    let month = moment(value.date).format('MMMM').toLowerCase()
                    arrayMonths[month].push({ x: value.x, date: moment(value.date).format('YYYY-MM-DD HH:mm:ss') })
                })

                let finalCal = []
                Object.values(arrayMonths).forEach((month, i) => {
                    let count = 0
                    let monthName = ''
                    Object.values(month).forEach((value) => {
                        count += value.x
                        monthName = moment(value.date).format('MMMM').toLowerCase()
                    })
                    finalCal.push({
                        name: monthName,
                        data: [count]
                    })
                })

                $scope.chartConfig = {
                    chart: {
                        type: 'bar'
                    },
                    series: finalCal,
                    title: {
                        text: 'Example WillSnake'
                    }
                }
            }]
        })
})
