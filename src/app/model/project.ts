export interface Project{
    _id?:string,
    urlPage:string,
    urlRep:string,
    languajes:Array<string>,
    en:{
        title:string,
        description:string
    },
    es:{
        title:string,
        description:string
    }
}