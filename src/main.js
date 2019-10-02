const puppet = require("puppeteer");
let Collector = require("./functions/Collector.js");
let Act = require("./functions/Act.js");
let PageMap = require("./pageInfomation/roadMaps/pageMap.js");
let RoadMapLoader = require("./pageInfomation/roadMaps/RoadMapLoader.js");
let loader = new RoadMapLoader();

let actFunction = new Act(new Collector());

function test(puppet,actObject,roadMaps){
    let launchSetting = {headless:false};
    let launchPromise = launch(puppet,launchSetting,roadMaps);
    roadMaps.setProp({pageAble:false});
    //page Object
    return launchPromise.then((x)=>{return actObject.act(x,roadMaps)})
                 .catch((e)=> {console.warn(e);});
}
function launch(puppet,lauchSetting,roadMaps){
    return puppet.launch(lauchSetting)
                 .then((browser) =>{roadMaps.setProp({browser:browser});return browser;})
                 .then(browser => browser.newPage())
                 .catch((x)=>{console.error(x);browser.close()});
}
let keys = Object.keys(PageMap);
let promises = [];
keys.forEach((x)=>{
    promises.push(test(puppet,actFunction,loader.LoadNodeObject(PageMap[x])));
});
Promise.all(promises).then((x)=>{console.log(x);})

