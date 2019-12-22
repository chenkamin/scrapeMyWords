const express    = require('express')
const bodyParser = require('body-parser')
const puppeteer  = require('puppeteer')
let  _ = require('underscore');
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});




//bodyParser Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.post('/fetchData', function  (req,res){
    let data = req.body
    let words = data.words.split(",").map(w => w[0]== " "? w.split(" ")[1]: w)
    // console.log(words)
    scrape(words)
    .then(function(value){
        res.send(value)
    })
})


let scrape =async function(words){
    let wordsData = []
    const browser = await puppeteer.launch({
        headless:false,
    });
    const page = await browser.newPage();
    let websites = ['https://www.ynet.co.il/home/0,7340,L-8,00.html']
    //,"https://www.walla.co.il/","https://www.makorrishon.co.il/"
    await page.setViewport({ width: 1800, height: 900});
    for(let website of websites){
        await page.goto(website);
        await page.waitForSelector("body")
        let body = await page.$eval('body', element => element.innerText)
        let data = body.split(" ")
        for(let word of words){
            let countPerSite = 0
                for(let d of data){
                    d.slice(1, d.length-1)
                    if(d.toLowerCase().includes(word.toLowerCase())){
                        // console.log(word)
                        countPerSite++
                    }
                }
            wordsData.push({name:word,site:website.split(".")[1],count:countPerSite})
        }
    }
    console.log(wordsData)
  let site = await  calculteTotalCountBySite(wordsData)
    console.log(site)
    let totalData = await calculteTotalCountsByName(wordsData)
            await browser.close();
    return (totalData)
}

let calculteTotalCountBySite  = function (wordsData){
    let data = wordsData.sort((a,b) => b.name- a.name)
    // let obj = {}
    // let arr = []
    // data.forEach(d => obj[d.name] ?  obj[d.name]++  : obj[d.name] = d.count)
    return data
}

let calculteTotalCountsByName  = function (wordsData){
    let data = wordsData
    let obj = {}
    let arr = []
    data.forEach(d => obj[d.name] ?  obj[d.name]++  : obj[d.name] = d.count)
    Object.keys(obj).forEach(d => arr.push({ name: d, count: obj[d] }))
    // console.log(arr)
    return arr
}

const port =3001
app.listen(process.env.PORT || port, function () {
    console.log(`Server running on ${port}`)
})
