let Collector = class{
    constructor(){
    }
    async move(page,info){
        //move page
        if(info.getProp("pageNation") && info.getProp('currentPage')!==undefined){
            info.setProp({currentPage:info.getProp('currentPage')+1});
           
            await page.waitForSelector(".search-pagination",{timeout:2000});

            return page.click('.search-pagination a:nth-child('+info.getProp('currentPage')+')');
        }else{
            info.setProp({currentPage:1});
            return page.goto(info.getProp('baseUrl'),{waitUntil:"networkidle2"});    
        }
        

    }
    async collectingStr(page,select,detailing){
        //collect
        await page.waitForSelector(select,{timeout:2000});
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