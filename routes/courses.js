
const express = require('express');

const Router = express.Router()


const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]

Router.get('/', (req, res) => {
    res.send(courses)
});

Router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)return res.send('not found!');
    res.send(course);
});

Router.post('/', (req, res) => {

   const {error } =validateInput(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const course = {
        id: courses.length+1,
        name:req.body.name
    }
    courses.push(course)
    res.send(course);
});

Router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.send('not found!');

    const {error } =validateInput(req.body)
    if(error){
        return res.status(404).send(error.details[0].message)
    }

    course.name = req.body.name
    // courses.push(course)
    res.send(course);
});


function validateInput(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema)

}

module.exports = Router;