let Act = class {
    constructor(collector){
        this.collector = collector;
    }
    //작업
    //login, search가 있는경우? =>
    //function 조합?
    async doWork(page,info){
        let workingResult = [];
        await page.goto(info.baseUrl,{waitUntil:"networkidle2"});
        for(var i = 1; i < info.maxPage ; i++){
            await this.move(page,info,i)
                      .then(async x=>{
                          await this.wait(page,info);
                          workingResult = workingResult.concat(await this.collect({page:page,info:info}));
                      });
        }
        return workingResult;
    }
    async move(page,info,index){
        if(info.pagination && index!=1){
            const pageBtn = await page.$x(info.paginationButtonsXPath.replace("{chgposition}",index));
            if(pageBtn.length>0){
                await pageBtn[0].click();
            }
        }
    }
    async wait(page,info){
        return info.pagination
                ? await page.waitForSelector(info.paginationButtons,{timeout:4000})
                : await page.waitForNavigation({waitUntil:'domcontentloaded',timeout:4000})
    }
    async collect({page,info}){
        let result = await this.collector.collectingStr(page,info);
        console.log(result);
        return result;
    }
}
module.exports = Act;