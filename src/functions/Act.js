let Act = class {
    constructor(collector,flowMaker){
        this.collector = collector;
        this.flowMaker = flowMaker;
    }
    //작업
    //login, search가 있는경우? =>
    async search(page,info,index){
        return await await page.evalutate((args)=>{
            document.querySelector('searchElm')['value'](keywords[index]);
            //search btn click 
        },{searchInfo : info.isSearch});
    }
    
    async setPageAsBase(page,info){
        return await page.goto(info.baseUrl,{waitUntil:"networkidle2"});
    }
    //조합
    async tryWork(page,info, saver){
        let works = this.flowMaker.returnWorks(info);
        let self = this;
        let workResult = works.map((ele) => {
            this.setPageAsBase(page,info).then(() => {
                return self[ele](page,info,saver);
            })
        });

        
        
    }
    //login
    async login(page,info){
        let loginObject =  info.isLogin;
        await page.goto(info.login.loginUrl,{waitUntil:'networkidle2'});
        return await page.evaluate((args) => {
            let info = args.loginInfo;
            document.querySelector(info.id.elm)['value'](info.id.value);
            document.querySelector(info.password.elm)['value'](info.value);
            //login btn click 
        },{loginInfo : loginObject});
    }
    //페이지네이션 + 수집
    async doWork(page,info,saver){
        let workingResult = [];
        
        
        for(var i = 1; i < info.maxPage ; i++){
            
            await this.move(page,info,i)
                      .then(async x=>{
                          await this.wait(page,info);
                          workingResult = workingResult.concat(await this.collect({page:page,info:info,saver:saver,idx:i}));
                      });
        }
        console.log(workingResult);
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
    //timeout 4sec;
    async wait(page,info){
        return info.pagination
                ? await page.waitForSelector(info.paginationButtons,{timeout:4000})
                : await page.waitForNavigation({waitUntil:'domcontentloaded',timeout:4000})
    }
    async collect({page,info,saver,idx}){
        let result = await this.collector.collectingStr(page,info);
        console.log(result);
        await saver.save(result,idx);
        return result;
    }
}
module.exports = Act;