const express = require('express');
const router = express.Router();

const Tarea = require('../models/tareas');
router.get('/', async (req,res) => {
    const tareas = await Tarea.find();
    res.render('index', {tareas});
});

router.post('/add', async (req,res) => {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.redirect('/');
    
});
router.get('/editar/:id', async (req,res) =>{
    const id = req.params.id;
    await Tarea.findById(id, function (err, tarea) {
        if(err){res.redirect('/')};
        res.render('editar',{tarea});
    });
});
router.post('/editar/:id', async (req, res) =>{
    const id = req.params.id;
    await Tarea.findById(id, async function (err, tarea) {
        if(err){redirect('/')};
        tarea.titulo = req.body.titulo;
        tarea.descripcion = req.body.descripcion;
        await tarea.save();
        res.redirect('/');
    });
    
});

router.get('/hecho/:id', async(req,res) =>{
    const id = req.params.id;
    await Tarea.findById(id, async function (err, tarea) {
        if(err){redirect('/')};
        tarea.estado = !tarea.estado;
        await tarea.save();
        res.redirect('/');
    });
});

router.get('/eliminar/:id', async (req,res) => {
    const id = req.params.id;
    await Tarea.remove({_id: id});
    res.redirect('/');
});

module.exports = router;