exports.Note = class Note{
    constructor(notId,title,content,createdBy,createdOn){
        this.notId = notId;
        this.title=title;
        this.content=content;
        this.createdBy=createdBy;
        this.createdOn=createdOn;
    }
}