
const express = require('express');
const router = express.Router();

const noteCtrl = require('../controller/noteController')
// router.get('/notes',(req,res)=>{
//     res.send('get all posts');
// })

router.get('/notes',noteCtrl.getAllNotes)
router.post('/notes/save',noteCtrl.saveNote)
router.patch('/notes/update/:id',noteCtrl.updateNote)
router.delete('/notes/delete/:id',noteCtrl.deleteNote)

module.exports =  router;