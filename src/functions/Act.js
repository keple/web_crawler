let Act = class {
    constructor(collector){
        this.collector = collector;
    }
    //작업
    //login, search가 있는경우? =>
    //function 조합?
    async tryCrawl(page,info){

    }
    async login(page,info){
        let loginObject =  info.isLogin;
        await page.goto(info.login.loginUrl,{waitUntil:'networkidle2'});
        return await page.evaluate((args) => {
            let info = args.loginInfo;
            document.querySelector(info.id.elm)['value'](info.id.value);
            document.querySelector(info.password.elm)['value'](info.value);
            
        },{loginInfo : loginObject});


    }
    //button click issue?
    async clickAction(page,buttonInfo){
       
    }
    async doWork(page,info){
        let workingResult = [];
        await page.goto(info.baseUrl,{waitUntil:"networkidle2"});
        for(var i = 1; i < info.maxPage ; i++){
            //move => 페이지이동
            //wait => 페이지 이동 후 컨텐츠가 로딩될때까지 기다림...
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