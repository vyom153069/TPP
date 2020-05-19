let fs=require("fs")
let path=require("path");
function treefyLogic(src,dest,root){
    if(root.isFile==true){
        //src=>dest name data copy
        let srcPath=path.join(src,root.newName);
        let destPath=path.join(dest,root.oldName);
        fs.copyFileSync(srcPath,destPath); 
        console.log(`file copied from ${srcPath} to ${destPath}`);
    }else{
        //directory==>creat directory
        let dirPath=path.join(dest,root.name);
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        //for children loop
        for(let i=0;i<root.children.length;i++){
            let child=root.children[i]
            let pPath=dirPath;
            treefyLogic(src,pPath,child);
        }

    }
}
// let input=process.argv.slice(2);
// let src=input[0];
// let dest=input[1];
// let root=require(path.join(src,"metadata.json"));
// treefyLogic(src,dest,root);


module.exports.treefy=function tree(){
    let src=arguments[0];
    let dest=arguments[1];
    let root=require(path.join(src,"metadata.json"));
   // let root=require(path.join(src,"metadata.json"));
    treefyLogic(src,dest,root);
    //console.log("tree command is implemented");
}