class Util{
    constructor(){

    }
    paramAppender(before,obj){
        return {...before,...obj}
    }
    pageFnc(info){
        let previousValue = info.currentPage;
        let pageButtons = document.querySelectorAll(info.pagenationButtons);
        let temp = Array.prototype.filter.call(pageButtons,(x)=>{
            if(!isNaN(parseInt(x.innerText)) && previousValue<parseInt(x.innerText)){
                return x;
            }
        });
        let test = Array.prototype.filter.call(pageButtons,(x)=>{
            if(!isNaN(parseInt(x.innerText))){
                return x;
            }
        });
        
        let test3 = Array.prototype.filter.call(pageButtons,(x)=>{
            if(previousValue<parseInt(x.innerText)){
                return x;
            }
        });
        console.log("ss",info);
        console.log("remain",temp);
        console.log("test1",test);
        console.log("test2",test3);
        if(temp.length!=0){
            temp[0].click();
        }
    }

}
module.exports = Util;