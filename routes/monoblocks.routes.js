const express = require('express');
const router = express.Router();
const Monoblock = require('../models/Monoblock');


router.get('/' , async (req, resp) => {
    const monoblocks = await Monoblock.find({});
    resp.send(JSON.stringify( monoblocks));
});

module.exports = router;