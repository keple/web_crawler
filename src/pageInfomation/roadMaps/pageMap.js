module.exports = {
    "coupang" : {
        baseUrl:"https://www.coupang.com/np/search?q=cpu&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=&backgroundColor=",
        identifiers:"#productList .search-product-wrap",
        detailIdentifiers:['.name','.price-value','.arrival-info','.used-product-info'],
        pageNation:true,
        pagenationButtons:'.search-pagination a',
        pagenationCurrent:'.selected',
        pagenationProcessFunction:'dynamic'

    }
    /*"dcinside1" : {
        baseUrl:'https://gall.dcinside.com/board/lists?id=warframe',
        identifiers:'.ub-content',
        detailIdentifiers:['.gall_num','.gall_tit','.gall_writer','.gall_tit a']
    }*/
};
