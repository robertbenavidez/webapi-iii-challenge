const express = require('express');

const router = express.Router();

const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/',validateUser, (req, res) => {
    const newUser = req.body

    Users.insert(newUser)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: "unable create new user"})
        });
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

    Users.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to retrieve user"})
        });
});

router.get('/:id',validateUserId, (req, res) => {
    const id = req.params.id;
    Users.getById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to retrieve user"})
        })
        
});

router.get('/:id/posts',validateUserId, (req, res) => {
    const userId = req.params.id

    Users.getUserPosts(userId)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to retrieve user"})
        })
});

router.delete('/:id',validateUserId, (req, res) => {
    const id = req.params.id;

    Users.remove(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(error => { 
            res.status(500).json({ message: 'unable to delete user'})
        })
});

router.put('/:id',validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Users.update(id, changes)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to update user"})
        })

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
