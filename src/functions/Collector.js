let Collector = class{
    constructor(){
        
    }
    async collectingStr(page,{identifiers,extIdentifiers,extMatch}){
        //collect
        return await page.evaluate((args)=>{
            let contents = document.querySelectorAll(args.select);
            let remakedContents = Array.prototype.map.call(contents,(x)=>{
                let obj =  {};
                args.ext.forEach((y,index)=>{
                    console.log('fromElement',x);
                    let target = x.querySelector(y);
                    obj[args.extMatch[index]] = target===null?'failure':target.innerText;
                });
                return obj;
            });
            return remakedContents;
        },{select:identifiers,ext:extIdentifiers,extMatch:extMatch});
    }
}
module.exports = Collector;