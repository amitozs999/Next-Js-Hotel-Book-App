class APIFilters {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {   //room model  ,,, map querystr
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): APIFilters {  //function for this class

    const location = this.queryStr?.location  //find location from qstr, if not null 
      ? {
          address: {      //froom whose address contains this location .regex/contains
            
            $regex: this.queryStr.location,  
            $options: "i",  //case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...location });  //Room.find(..regexloc)
    return this;
  }




  filter(): APIFilters {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["location", "page"];  //dont need location in filter already searched based on it, so remove it from qstrt
    removeFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);  //now find Room.find( rem qstr)

    return this;
  }



  pagination(resPerPage: number): APIFilters {
    const currentPage = Number(this.queryStr?.page) || 1;
    const skip = resPerPage * (currentPage - 1);   //prev and next wale rooms skip

    this.query = this.query.limit(resPerPage).skip(skip);  //Room.limit

    return this;
  }

}

export default APIFilters;
