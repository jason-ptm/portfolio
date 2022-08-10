export interface Project{
    _id?:string,
    startDate:string,
    endDate:string,
    urlPage:string,
    urlRep:string,
    image:string,
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