const puppet = require("puppeteer");
const MkFlow = require("./functions/mkFlow.js");
let Collector = require("./functions/Collector.js");
let Act = require("./functions/Act.js");
let DataStorage = require('./functions/DataStorage.js');
let PageMap = require("./pageInfomation/roadMaps/pageMap.js");
const fs = require("file-system");
let ResultSaver = require('./functions/ResultSaver.js')
let actFunction = new Act(new Collector(),new MkFlow());

let defaultLaunchSetting = {headless:false};
async function test(page,actObject,node,saver){
    //page object
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    return await actObject.tryWork(page,node,saver);
}
async function launch(puppet,lauchSetting,node){
    const browser = await puppet.launch(lauchSetting);
    node.browser = browser;
    return browser;
}

let keys = Object.keys(PageMap);
keys.forEach(async(ele)=>{
    let browser = await launch(puppet,defaultLaunchSetting,PageMap[ele]);
    let page =  await browser.newPage();
    let saver = new ResultSaver(fs)
    await test(page,actFunction,PageMap[ele], saver);
    
    console.log("check end");
});



