const express = require('express');
const { Purpose } = require('../../models');
const router = express.Router();
const authenticateToken=require('../../middleware/auth');

// GET /api/purposes
router.get('/purposes',authenticateToken, async (req, res) => {
    try {
        const purposes = await Purpose.findAll();
        res.json(purposes);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching' });
    }
});

// GET /api/purpose/:id
router.get('/purpose/:id',authenticateToken, async (req, res) => {
    try {
        const purpose = await Purpose.findByPk(req.params.id);
        res.json(purpose);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching record' });
    }
});

//POST /api/create-purpose
router.post('/create-purpose',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const purpose = await Purpose.create({ name, description,branch_id });
        res.json({message:"Record Created Successfully",data:purpose});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating record' });
    }
});

//PUT /api/update-purpose/:id
router.put('/update-purpose/:id',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const purpose = await Purpose.findOne({
            where:{id:req.params.id,branch_id:branch_id}
        });
        if (!purpose) {
            return res.status(404).json({ message: "Record not found" });
        }
        await purpose.update({name,description});
        res.json({message:"Record updated Successfully",data:purpose});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating record' });
    }
});

// Delete /api/delete-purpose/:id
router.delete('/delete-purpose/:id',authenticateToken, async (req, res) => {
    try {
        const purpose = await Purpose.findByPk(req.params.id);
        await purpose.destroy();
        res.json({message:"Record deleted Successfully"});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting record' });
    }
});

module.exports = router;