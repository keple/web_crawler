const puppet = require("puppeteer");
let Collector = require("./functions/Collector.js");
let Act = require("./functions/Act.js");
let DataStorage = require('./functions/DataStorage.js');
let PageMap = require("./pageInfomation/roadMaps/pageMap.js");

const fs = require("file-system");

let actFunction = new Act(new Collector());
let defaultLaunchSetting = {headless:false};
async function test(page,actObject,node){
    //page object
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    return actObject.doWork(page,node);
}
async function launch(puppet,lauchSetting,node){
    const browser = await puppet.launch(lauchSetting);
    node.browser = browser;
    return browser.newPage();
}

let keys = Object.keys(PageMap);
keys.forEach(async(ele)=>{
    let page = await launch(puppet,defaultLaunchSetting,PageMap[ele]);
    test(page,actFunction,PageMap[ele]).then(x=>{
        let stringContent = JSON.stringify(x);
        fs.mkdir('../result-data',function(err){
            if(err) throw err;
           
        });
        fs.writeFile('../result-data/result'+ele,stringContent,function(err){
            if(err) throw err;
           
        })
    });
});



