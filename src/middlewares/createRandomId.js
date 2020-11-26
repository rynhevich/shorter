import db from '../models/index.js';
import crypto from 'crypto';


const Link = db.link;

function checkDuplicateId(id) {
    Link.findOne( { id: id } )
        .exec((err, id) => {
            if (err) {
                throw (err);
            }
            if (id) {
                return true;
            }
            else {
                return false;
            }
        })
};


const createRandomId = () => {
    let id;
    do {
        id = crypto.randomBytes(5).toString('hex')
    } while (checkDuplicateId(id));
    return id;
}

export default createRandomId;