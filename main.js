/** Created by 31325_000 on 2018/2/1...*/
const fetchAndRunJS = require('./utils/fetchAndRunJS')
const Opt = require('./options')
const Async = require('async')
const Fs = require('fs')
const {Readable} = require('stream')

let file = Fs.createWriteStream('./result.txt')
let stream = new Readable({
    read(hwm) {},
    objectMode: false
})

let citys = Opt.citys.map(function(city){
    return `http://jt.sz.bendibao.com/ditie/js/price/${city}.js`
})

stream.pipe(file)

function fetch(url, callback) {
    fetchAndRunJS(url)
        .then(function({subwayData}){
            let data = Object.getOwnPropertyNames(subwayData).reduce(function(pre, name){
                return `${pre}${name}\r\n${subwayData[name].map(station => station)}\r\n`
            }, '')
            stream.push(data)
        })
        .catch(function(err){
            callback(err)
            console.log(err)
        })
}

Async.map(citys, fetch, function(err, res){
    console.log(res.length)
})

