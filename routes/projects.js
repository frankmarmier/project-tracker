const express = require('express');
const router = express.Router();
//const Project = require('../models/todo.txt')

//GET

router.get('/', (req, res, next) => {
    res.render('projects/list-projects')
})

router.get('/project/create', (req, res, next) => {
    res.render('projects/project-create')
})

router.get('/project/:id', async (req, res, next) => {
    try{
        const projectId = req.params.id
        const myProject = await Project.findById(projectId)
        res.render('projects/one-project', {myProject})
    }
    catch(err){
        console.log("Couldn't get the project")
        next(err)
    }  
})

router.get('/project/:id/update', async (req, res, next) => {
    try{
        const projectId = req.params.id
        const myProject = await Project.findById(projectId)
        res.render('projects/update-project', {myProject})
    }
    catch(err){
        console.log("Couldn't get the project")
        next(err)
    }  
})

//POST

router.post('/project/create', async (req, res, next) => {
    try{
        const data = req.body
        await Project.create(data)
    }
    catch(err){
        console.log('Err creating new project')
        next(err)
    }
})

router.post('/project/:id/update', async (req, res, next) => {
    try{
        const projectId = req.params.id
        const data = req.body
        const myProject = await Project.findByIdAndUpdate(projectId, data)
        res.redirect('/project/:id')
    }
    catch(err){
        console.log("Err updating project")
        next(err)
    }  
})



module.exports = router