

let Act = class {
    constructor(collector){
        this.collector = collector;
    }
    async act(page,info){
        //setup userAgent
        //need loop and merging data
        //browser close when end of merging
        return await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
                  .then((x)=>this.loopWork(page,info));
        
        
    }
    async loopWork(page,info,prev){
        if(prev===undefined) prev=[];
        let data = prev||[];
        return new Promise((resolve)=>{
            this.collector.move(page,info)
                .then((x)=>{
                    this.collector.collectingStr(page,info.getProp('identifiers'),info.getProp('detailIdentifiers'))
                                  .then((x) => { console.log("cR",x);data = prev.concat(x)})
                                  .then(()=>{
                                      console.log("second",info);
                                      info.getProp('currentPage')!==info.getProp('maxPage')
                                            ?resolve(this.loopWork(page,info,data))
                                            :resolve({data:data,info:info})
                                    });
                    console.log(data);  
                })
                .catch((e)=>{
                    console.warn(e,"\n",info.browser);
                    info.browser.close();
                });
        }).catch(x=>info.browser.close());
    }
    
}
module.exports = Act;