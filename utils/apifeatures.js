class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i',  // case insensitive
            }
        } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    // quesystr ko modify krna padega toh we will make copy of it so that we can have main keyword differently
    //  in javascript all the objects are passed by refernce so we use spread operator
    filter() {
        const queryCopy = { ...this.queryStr }
        // Remove some fields for category

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        // when we put price as query in gt and lt format then we get object so we convert it to string
        // Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        //  Now we again consert it to object
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage*(currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;