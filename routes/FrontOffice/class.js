const express = require('express');
const { Class } = require('../../models');
const router = express.Router();
const authenticateToken=require('../../middleware/auth');

// GET /api/classes
router.get('/classes',authenticateToken, async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching' });
    }
});

// GET /api/class/:id
router.get('/class/:id',authenticateToken, async (req, res) => {
    try {
        const classGet = await Class.findByPk(req.params.id);
        res.json(classGet);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching record' });
    }
});

//POST /api/create-class
router.post('/create-class',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const classGet = await Class.create({ name, description,branch_id });
        res.json({message:"Record Created Successfully",data:classGet});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating record' });
    }
});

//PUT /api/update-class/:id
router.put('/update-class/:id',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const classGet = await Class.findOne({
            where:{id:req.params.id,branch_id:branch_id}
        });
        if (!classGet) {
            return res.status(404).json({ message: "Record not found" });
        }
        await classGet.update({name,description});
        res.json({message:"Record updated Successfully",data:classGet});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating record' });
    }
});

// Delete /api/delete-class/:id
router.delete('/delete-class/:id',authenticateToken, async (req, res) => {
    try {
        const classGet = await Class.findByPk(req.params.id);
        await classGet.destroy();
        res.json({message:"Record deleted Successfully"});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting record' });
    }
});

module.exports = router;