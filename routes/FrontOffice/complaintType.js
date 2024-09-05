const express = require('express');
const { ComplaintType } = require('../../models');
const router = express.Router();
const authenticateToken=require('../../middleware/auth');

// GET /api/complaintTypes
router.get('/complaintTypes',authenticateToken, async (req, res) => {
    try {
        const complaintType = await ComplaintType.findAll();
        res.json(complaintType);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching' });
    }
});

// GET /api/complaintType/:id
router.get('/complaintType/:id',authenticateToken, async (req, res) => {
    try {
        const complaintType = await ComplaintType.findByPk(req.params.id);
        res.json(complaintType);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching record' });
    }
});

//POST /api/create-complaintType
router.post('/create-complaintType',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const complaintType = await ComplaintType.create({ name, description,branch_id });
        res.json({message:"Record Created Successfully",data:complaintType});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating record' });
    }
});

//PUT /api/update-complaintType/:id
router.put('/update-complaintType/:id',authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const {branch_id}=req.user;
        const complaintType = await ComplaintType.findOne({
            where:{id:req.params.id,branch_id:branch_id}
        });
        if (!complaintType) {
            return res.status(404).json({ message: "Record not found" });
        }
        await complaintType.update({name,description});
        res.json({message:"Record updated Successfully",data:complaintType});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating record' });
    }
});

// Delete /api/delete-complaintType/:id
router.delete('/delete-complaintType/:id',authenticateToken, async (req, res) => {
    try {
        const complaintType = await ComplaintType.findByPk(req.params.id);
        await complaintType.destroy();
        res.json({message:"Record deleted Successfully"});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting record' });
    }
});

module.exports = router;