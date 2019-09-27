import yargs from "yargs";
import fs from "fs";
import uuid from 'uuid';


let obj;

const list = function(){
  obj.notes.forEach( (note, i) => {
    console.log(`${i}: ${note.title}`);
  })
}

const add = function(argv){
  const nota = {
    uuid: uuid.v4(),
    title: argv.title,
    body: argv.body,
    author: argv.author,
  };

  obj.notes.push(nota);
  console.log("added: " + argv.title);
}

const deletes = function(argv){
    obj.notes.splice(argv.index, 1);
}
const read = function(argv){
    console.log(obj.notes[argv.index]);
}


yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Title of the note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "body of the note",
      demandOption: true,
      type: "string",
    },
    author: {
      describe: "body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: add,
});


yargs.command({
  command: "list",
  describe: "list notes",
  handler: list,
});


const path = "./notas.txt";
fs.access(path, fs.F_OK, (err) => {
  if (err) {
    fs.writeFileSync("notas.txt","");
  }

  const data = fs.readFileSync("notas.txt").toString();

  if(data !== ""){
    obj = JSON.parse(data);
  }else{
    obj = {
      notes: [

      ]
    };
  }

  yargs.parse();
  fs.writeFileSync("notas.txt", JSON.stringify(obj));
});



yargs.command({
    command: "deletes",
    describe: "delete notes",
    builder: {
        index: {
            define: "index of the note",
            demandOption: true,
            type: "int",
        },
    },
    handler: deletes,
});
yargs.command({
    command: "read",
    descibe: "show information of the note",
    builder: {
        index: {
            define: "index of the note",
            demandOption: true,
            type: "int",
        },
    },
    handler: read,
});



