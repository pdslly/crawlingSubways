/** Created by 31325_000 on 2018/2/3...*/
const fetchAndRetContent = require('./utils/fetchAndRetContent')
const cheerio = require('cheerio')

fetchAndRetContent('http://bj.bendibao.com/ditie/plan.shtml')
    .then(function(content){
        const $ = cheerio.load(content)
        const qnode = $('div.s-main')
        const lineset = qnode.find('div.line-list')
        console.log(qnode.find('h2:first-of-type').text())
        lineset.each(function(index, node){
            let lines = ''
            console.log($(node).find('strong>a').text())
            $(node).find('a.link').each(function(index, node){
                lines += ($(node).text() + ' ')
            })
            console.log(lines)
        })
    })
    .catch(function(err){
        console.log(err)
    })