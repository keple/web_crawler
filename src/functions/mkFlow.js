let MkFlow = class{

    returnWorks(info){
        let works = [];
        if(info.isLogin.flag) works.push('login');
        if(info.isSearch.flag) works.push('search');
        
        works.push('doWork');

        return works;
    }
    setPriorityMap({map}){
        this.priorityMap = map;
        this.workNames = Object.keys(this.priorityMap);
    }
    

}
module.exports = MkFlow;