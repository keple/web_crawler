class Util{
    constructor(){

    }
    paramAppender(before,obj){
        return {...before,...obj}
    }
    pageFncProvider(condition){
        return function(){
            //find all page 'A'tag as array
            let previousValue = condition.prev;
            let pageButtons = document.querySelectorAll(condition.pagenationButtons);
            //find currentPage page value as number
            let currentValue = document.querySelector(condition.pagenationCurrent);
            let temp = Array.prototype.filter(pageButtons,(x)=>{
                if(!isNaN(parseInt(x.innerText)) && parseInt(currentValue)<parseInt(x.innerText)){
                    return x;
                }
            });
            if(temp.length!=0){
                temp[0].click();
            }else{
                return 1;
            }
        }
    }

}
module.exports = Util;