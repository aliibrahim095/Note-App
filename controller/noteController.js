const { json } = require('body-parser');
const generator = require('../Util/generator')
const memStorage = require('../Util/memory.storage')
const noteModel = require('../model/note.model')

exports.getAllNotes = (req,res)=>{

    // var seqId_1 =  generator.generate()
    // memStorage.store.setItem(seqId_1,'1st_key');
    
    // var seqId_2 =  generator.generate()
    // memStorage.store.setItem(seqId_2,'2st_key');
    
    // var seqId_3 =  generator.generate()
    // memStorage.store.setItem(seqId_3,'3st_key');

    // var keys =  memStorage.getkeys(memStorage.store)
    // var values =  memStorage.getValues(memStorage.store)
    // console.log("values: "+JSON.stringify(values))
    // var Note = noteModel.Note;
    // var notObj = new Note(seqId_1,"note_1","this is content of note_1","lool",new Date());

    var values =  memStorage.getValues(memStorage.store)
    console.log("values: "+JSON.stringify(values))
    return res.status(200).send(JSON.stringify(values)); 
}

exports.saveNote = (req,res)=>{
    var seq_id = generator.generate();
    var createdBy = "admin";
    var createdOn = new Date();
    var title = req.body.title;
    var content = req.body.content;
    if(!title || !content){
       if(!title){
        return res.status(500).send({error:"title shouldn't be empty"})
       }else{
        return res.status(500).send({error:"content shouldn't be empty"})
       }
    }
    var Note = noteModel.Note;
    var noteObj = new Note(seq_id,title,content,createdBy,createdOn);
    memStorage.store.setItem(seq_id, noteObj);
    return res.status(201).send('saved successfully . . . .'+noteObj.title)
}

exports.updateNote = (req,res)=>{
    var createdBy = "admin";
    var createdOn = new Date();
    var title = req.body.title;
    var content = req.body.content;
    var noteId = req.params.id;
    if(!noteId || !title || !content){
        if(!noteId){
        return res.status(500).send({error:"id shouldn't be empty"})
        }
       if(!title){
        return res.status(500).send({error:"title shouldn't be empty"})
       }else{
        return res.status(500).send({error:"content shouldn't be empty"})
       }
    }

    var noteItem = memStorage.store.getItem(noteId)
    if(!noteItem){
        return res.status(500).send({error:"not exists id"})
    }

    var Note = noteModel.Note;
    var noteObj = new Note(noteId,title,content,createdBy,createdOn);
    memStorage.store.setItem(noteId, noteObj);
    return res.status(201).send('updated successfully . . . .'+noteObj.title)
}
exports.deleteNote = (req,res)=>{

    var noteId = req.params.id;
    if(!noteId){
        return res.status(500).send({error:"notID isn't specified"})
    }
    var noteItem= memStorage.store.getItem(noteId);
    if(!noteItem){
        return res.status(500).send({error:"notID isn't exist"})
    }
    memStorage.store.removeItem(noteId);
    return res.send('deleted successfully . . . .')
}