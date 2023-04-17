
const express = require('express');
const Router = express.Router()

Router.get('', (req, res) => {
    res.render('index',{title:'mostafa',message:'ello'})
});

module.exports = Router;