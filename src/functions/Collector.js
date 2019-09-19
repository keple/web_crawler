let Collector = class{
    constructor(utils){
        this.utils = utils;
    }
    async move(page,info){
        //set user agent as desktop
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
        let mvPro = undefined;
        //move page
        
        if(info.getProp('currentPage')===undefined){
            info.setProp({currentPage:1});
            mvPro = page.goto(info.getProp('baseUrl'),{waitUntil:"networkidle2"});
            if(!info.getProp('pageNation')){
                return new Promise(resolve => 1)
            }
        }else{
            info.setProp({currentPage:info.getProp('currentPage')+1});
            //evaluate script
            let func  = this.utils.pageFncProvider(info);
            mvPro = page.evaluate((args)=>{console.log(args);args.func();},{func:func})
        }
        return mvPro;
    }
    
    collectingStr(page,select,detailing){
        //collect
        let contentPro = page.evaluate((args)=>{
            let contents = document.querySelectorAll(args.select);
            let remakedContents = Array.prototype.map.call(contents,(x)=>{
                let obj =  {};
                args.detailing.forEach((y)=>{obj[y] =x.querySelector(y).innerText;});
                return obj;
            });
            return remakedContents;
        },{select:select,detailing:detailing});
        return contentPro;
    }
}
module.exports = Collector;