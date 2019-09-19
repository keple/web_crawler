

let Act = class {
    constructor(collector){
        this.collector = collector;
    }
    async act(page,info){
        //need loop and merging data
        //browser close when end of merging
        return this.loopWork(page,info);
    }
    async loopWork(page,info,prev){
        let data = prev||[];
        return new Promise((resolve)=>{
            this.collector.move(page,info)
                .then((x)=>{
                    data.concat(this.collector.collectingStr(page,info.getProp('identifiers'),info.getProp('detailIdentifiers')));
                    console.log(data);
                    x!==1?resolve(this.loopWork(page,info,data)):resolve({data:data,info:info});
                })
                .catch((e)=>{
                    console.warn(e,"\n",info.browser);
                    info.browser.close()
                });
        }).catch(x=>info.browser.close());
    }
    
}
module.exports = Act;