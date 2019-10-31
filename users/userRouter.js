const express = ('express');

const router = express.Router();

const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    Users.getById(id)
        .then(user => {
            if(!user) {
                return  res.status(400).json({ message: "invalid user id"})
            }
        next()
        })
        .catch(error => {
            res.status(500).json(error)
        })
};

function validateUser(req, res, next) {
    const name = req.body.name;
    const body = req.body;
    
    if(!name){
        return res.status(400).json({ message: "name required"})
    }
    if(!body){
        return res.status(400).json({ message: "You're missing some info"})
    }
    next()
};

function validatePost(req, res, next) {
    const body = req.body;
    const text = req.body.text;
    if(!body) {
        return res.status(400).json({ message: "Body required"})
    }
    if(!text) {
        return res.status(400).json({ message: "text required"})
    }
    next()    
};

module.exports = router;
