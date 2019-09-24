let Collector = class{
    constructor(utils){
        this.utils = utils;
    }
    async move(page,info){
        //move page    
        //evaluate script
        if(info.getProp("pageNation") && info.getProp('currentPage')!==undefined){
            info.setProp({currentPage:info.getProp('currentPage')+1});
            let obj = {
                currentPage : info.getProp('currentPage'),
                pagenationButtons : info.getProp('pagenationButtons'),
                pagenationCurrent : info.getProp('pagenationCurrent')
            }
            return page.evaluate(this.utils.pageFnc,{obj}).then(x=>page.waitFor(info.getProp('pagenationCurrent')));
        }else{
            info.setProp({currentPage:1});
            return page.goto(info.getProp('baseUrl'),{waitUntil:"networkidle2"});    
        }
        

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