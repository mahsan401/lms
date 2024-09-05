const express = require('express');
const { Branch } = require('../models'); // Adjust the path as necessary
const router = express.Router();
const authenticateToken=require('../middleware/auth')

// GET /api/branches - Get the list of branches
router.get('/branches',authenticateToken, async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching branches' });
    }
});

module.exports = router;
