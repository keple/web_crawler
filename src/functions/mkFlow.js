let MkFlow = class{

    returnWorks(info){
        let works = [];
        if(info.isLogin.flag) works.push('login');
        if(info.isSearch.flag) works.push('search');
        if(info.pagination) works.push('move');
        return works;
    }
    

}
module.exports = MkFlow;