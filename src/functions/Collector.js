let Collector = class{
    constructor(){
        
    }
    async collectingStr(page,{identifiers,extIdentifiers,extMatch}){
        //collect
        return await page.evaluate((args)=>{
            let contents = document.querySelectorAll(args.select);
            let remakedContents = Array.prototype.map.call(contents,(x)=>{
                let obj =  {};
                args.ext.forEach((y,index)=>{obj[args.extMatch[index]] =x.querySelector(y).innerText;});
                return obj;
            });
            return remakedContents;
        },{select:identifiers,ext:extIdentifiers,extMatch:extMatch});
    }
}
module.exports = Collector;