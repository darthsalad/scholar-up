export const checkImage = (file)=>{
    let err="";
    console.log(file)
    if(!file) return (err="File does not exist")


    if(file.size > 1024*1024) err="The largest file size is 1mb";

    if (file.type !== "application/pdf")
    err = "Pdf format is incorrect";


    return err;
}