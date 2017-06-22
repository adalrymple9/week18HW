const express = require("express");
const router = express.Router();
const scrape = require("../scripts/scrape.js")
const ArticleController = require("../controllers/ArticleController.js");
const NoteController = require("../controllers/NotesController.js");

//routes
router.get('/scrape', function(req, res) {
    scrape((data) => {
        let content = { articles: data }
        res.json(data);
    })
})

router.get('/saved', function(req, res) {
    let data = { hello: "world" }
    res.render('saved', data)

})
router.get('/', function(req, res) {
    res.render("homePage")
})
router.get('/findSaved', function(req, res) {
    ArticleController.findAllArticles(function(data) {
        res.send(data)
    })

})

router.post('/findNote', function(req, res) {

        console.log(req.body._ArticleId)
        let params = {}
        params.id = req.body._ArticleId
        NoteController.findNotes(params, function(data) {
            console.log(data)
            res.send(data)
        })

    })
    
//postes
router.post('/saveArticle', function(req, res) {
    // console.log(req.body)
    ArticleController.saveThearticle(req.body, function(data) {
        // console.log(data)
    })

})

router.post('/addNote', function(req, res) {

    console.log(req.body)

    NoteController.saveNote(req.body, function(data) {
        //sending an id of new article to be generated on HTML !
        res.send(data)
    })
})

//delete routs
router.delete('/saved/:id', function(req, res) {
    // console.log(req.body._id)
    ArticleController.deleteArticle(req.body._id);
})


router.delete('/addNote', function(req, res) {
    console.log(req.body._id)
    NoteController.deleteNote(req.body._id);

})

router.patch('/addNote', function(req, res) {
    // console.log(req.body)
    // NoteController.deleteNote(req.body._id);
    NoteController.updateNote(req.body)
})

module.exports = router;
