const express = require('express');
const router = express.Router();
const Laptop = require('../models/Laptop')

router.get('/' , async (req, resp) => {
    const laptops = await Laptop.find({});
    resp.send(JSON.stringify( laptops));
});

module.exports = router;
