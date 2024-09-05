const express = require('express');
const { Refrence } = require('../../models');
const router = express.Router();
const authenticateToken=require('../../middleware/auth');

// GET /api/refrences
router.get('/refrences',authenticateToken, async (req, res) => {
    try {
        const refrences = await Refrence.findAll();
        res.json(refrences);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching' });
    }
});

// GET /api/refrence/:id
router.get('/refrence/:id',authenticateToken, async (req, res) => {
    try {
        const refrence = await Refrence.findByPk(req.params.id);
        res.json(refrence);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching record' });
    }
});

//POST /api/create-refrence
router.post('/create-refrence',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const refrence = await Refrence.create({ name, description,branch_id });
        res.json({message:"Record Created Successfully",data:refrence});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating record' });
    }
});

//PUT /api/update-refrence/:id
router.put('/update-refrence/:id',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const refrence = await Refrence.findOne({
            where:{id:req.params.id,branch_id:branch_id}
        });
        if (!refrence) {
            return res.status(404).json({ message: "Record not found" });
        }
        await refrence.update({name,description});
        res.json({message:"Record updated Successfully",data:refrence});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating record' });
    }
});

// Delete /api/delete-refrence/:id
router.delete('/delete-refrence/:id',authenticateToken, async (req, res) => {
    try {
        const refrence = await Refrence.findByPk(req.params.id);
        await refrence.destroy();
        res.json({message:"Record deleted Successfully"});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting record' });
    }
});

module.exports = router;