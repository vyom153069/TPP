let viewFile = require("./commands/viewFile");
let treefyFile = require("./commands/treeFile");
let untreefyFile = require("./commands/untreeFile");
let helpFile = require("./commands/helpFile");

let input = process.argv.slice(2);

let cmd = input[0];

switch (cmd) {
  case "view":
    viewFile.view(input[1], input[2]);
    break;
  case "treefy":
    treefyFile.treefy(input[1],input[2]);
    break;
  case "untreefy":
    untreefyFile.untreefy(input[1], input[2]);
    break;
  case "help":
    helpFile.help();
    break;
  default:
    console.log("enter a valid command");
}
