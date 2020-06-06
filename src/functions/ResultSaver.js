let ResultSaver = class{
    constructor(fs){
        this.fs = fs;
    }
    async save(result,idx){
        let stringContents = JSON.stringify(result);
        this.fs.mkdir('../result-data',function(err){
            if(err) throw err;
           
        })
        this.fs.writeFile('../result-data/result'+idx +".txt",stringContents,function(err){
            if(err) throw err;
           
        })
    }

}
module.exports = ResultSaver;