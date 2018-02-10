
export interface Post {
    uid?:string,
    userId:string;
    title:string;
    content:string;
    postData?:Date;
    public:boolean;
    owner?:string;
}