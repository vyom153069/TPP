let fs=require("fs");
let path=require("path");
let uniqid=require("uniqid");
function checkWhetherFile(path_string){
    return fs.lstatSync(path_string).isFile();
}

function childReader(src){
    let children=fs.readdirSync(src);
    return children;
}
function untreefyLogic(src,dest,obj){
    let isFile=checkWhetherFile(src);
    if(isFile==true){
        //console.log((src)+"*");
        let newName=uniqid();
        let oldName=path.basename(src);
        fs.copyFileSync(src,path.join(dest,newName));
        console.log(`data copied from ${oldName} to ${newName}`);
        //let obj={};
        obj.newName=newName;
        obj.oldName=oldName;
        obj.isFile=true;
        
    }else{
         let dirName=path.basename(src);
         //let obj={};
         obj.isFile=false;
         obj.name=dirName;
         obj.children=[];
        //console.log((src));
        let children=childReader(src);
        for(let i=0;i<children.length;i++){
            let childPath=path.join(src,children[i]);
            let chobj={}
            untreefyLogic(childPath,dest,chobj);
            obj.children.push(chobj);
        }
    }
}
//input=process.argv.slice(2);


module.exports.untreefy=function(){
    let root={};
    src=arguments[0];
    dest=arguments[1];
    untreefyLogic(src,dest,root);
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root));
    console.log(root);
}