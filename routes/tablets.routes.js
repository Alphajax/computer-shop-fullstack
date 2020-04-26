const express = require('express');
const router = express.Router();
const Tablet = require('../models/Tablet');


router.get('/' , async (req, resp) => {
    const tablets = await Tablet.find({});
    resp.send(JSON.stringify( tablets));
})

module.exports = router;