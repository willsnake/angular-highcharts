'use strict'

angular.module('willsnakechart').service('GetData', function($http) {
  let service = {
    getAllData: function() {
        let first = $http.get('/data', { cache: true }).then(function (resp) {
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

            resp.data.data.forEach((value) => {
                let month = moment(value.date).format('MMMM').toLowerCase()
                arrayMonths[month].push({ x: value.x, date: moment(value.date).format('YYYY-MM-DD HH:mm:ss') })
            })

            return arrayMonths
        })
        let second = first.then((months) => {
            let finalCal = []
            Object.values(months).forEach((month, i) => {
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
                return finalCal
            })
        })
        return second
    }
  }
  
  return service
})