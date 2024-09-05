const express = require('express');
const { Source } = require('../../models');
const router = express.Router();
const authenticateToken=require('../../middleware/auth');

// GET /api/sources
router.get('/sources',authenticateToken, async (req, res) => {
    try {
        const source = await Source.findAll();
        res.json(source);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching' });
    }
});

// GET /api/source/:id
router.get('/source/:id',authenticateToken, async (req, res) => {
    try {
        const source = await Source.findByPk(req.params.id);
        res.json(source);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching record' });
    }
});

//POST /api/create-source
router.post('/create-source',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const source = await Source.create({ name, description,branch_id });
        res.json({message:"Record Created Successfully",data:source});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating record' });
    }
});

//PUT /api/update-source/:id
router.put('/update-source/:id',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const source = await Source.findOne({
            where:{id:req.params.id,branch_id:branch_id}
        });
        if (!source) {
            return res.status(404).json({ message: "Record not found" });
        }
        await source.update({name,description});
        res.json({message:"Record updated Successfully",data:source});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating record' });
    }
});

// Delete /api/source/:id
router.delete('/delete-source/:id',authenticateToken, async (req, res) => {
    try {
        const source = await Source.findByPk(req.params.id);
        await source.destroy();
        res.json({message:"Record deleted Successfully"});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting record' });
    }
});

module.exports = router;