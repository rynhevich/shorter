import db from '../models/index.js';
import createRandomId from '../middlewares/createRandomId.js'

const Link = db.link;

export const createLink = (req, res) => {

    const link = new Link({
        id: createRandomId(),
        original: req.body.link,
        username: req.body.username,
        description: req.body.description,
        tags: req.body.tags,
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