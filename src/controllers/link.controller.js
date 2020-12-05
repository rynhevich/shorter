import db from '../models/index.js';
import createRandomId from '../middlewares/createRandomId.js'
import separateTags from '../middlewares/separateTags.js'

const Link = db.link;

export const createLink = (req, res) => {
    const link = new Link({
        id: createRandomId(),
        original: req.body.link,
        username: req.body.username,
        description: req.body.description,
        tags: separateTags(req.body.tags),
        counter: 0
    });

    link.save((err, link) => {
        if(err) {
            res.status(500).json({ message: err });
            return;
        }

        res.status(201).json({ message: 'Link was created', id: link.id });
    })  
}

export const showLink = (req, res) => {
    Link.findOne({
        id: req.body.id
    })
    .exec((err, link) => {
        if (err) {
            res.status(500).json({ message: err });
            return
        }

        if(!link) {
            return res.status(404).json({ message : 'The link does not exist' });
        }

        res.status(200).json({
            original: link.original,
            description: link.description,
            tags: link.tags
        });
    });
}

export const updateCounter = (req, res) => {
    Link.findOneAndUpdate(
        {id: req.body.id},
        {$inc: {counter: 1}}
    )
    .exec((err, link) => {
        if (err) {
            res.status(500).json({ message: err });
            return
        }
        res.status(204).json();
    })
}

export const showLinksByUsername = (req, res) => {
    Link.find({
        username: req.body.username
    })
    .exec((err, links) => {
        if (err) {
            res.status(500).json({ message: err });
            return
        }

        if(links.length == 0) {
            return res.status(404).json({ message : 'You have not created a single link!' });
        }
        const readyLinks = links.map((link) => {
            return { 
                original: link.original,
                counter: link.counter, 
                id: link.id }
        })
        res.status(200).json(readyLinks);
    });
}

export const showLinksByTag = (req, res) => {
    Link.find({
        tags: req.body.tag
    })
    .exec((err, links) => {
        if (err) {
            res.status(500).json({ message: err });
            return
        }

        if(links.length == 0) {
            return res.status(404).json({ message : 'Link with the tag does not exist!' });
        }

        const readyLinks = links.map((link) => {
            return {
                username: link.username,
                original: link.original,
                id: link.id
            }
        })
        res.status(200).json(readyLinks);
    })
}