/** Created by 31325_000 on 2018/2/1...*/
const Http = require('http')
const {URL} = require('url')
const Vm = require('vm')

module.exports = function(url) {
    return new Promise(function(resolve, reject){
        let _url = null
        try {
            _url = new URL(url)
        } catch(e) {
            reject(e.message)
        }

        Http.get(url, function(res){
            let data = ''

            if (200 !== res.statusCode) {
                reject('network error!')
            }

            res.on('data', function(chunk){
                data += chunk
            })

            res.on('end', function(){
                let sandbox = {}
                Vm.runInNewContext(data, sandbox)
                resolve(sandbox)
            })
        })
    })
}