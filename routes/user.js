const express = require('express');
const { User } = require('../models'); // Adjust the path as necessary
const router = express.Router();
const authenticateToken=require('../middleware/auth')


// GET /api/user auth user
router.get('/user', authenticateToken,async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user' });
    }
});

// GET /api/user:id
router.get('/user/:id', authenticateToken,async (req, res) => {
    try {
        const user = await User.findOne({where: {
                id: req.params.id,  // The primary key condition
                branch_id: req.user.branch_id  // Additional condition for branch_id
            }});
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user' });
    }
});

// GET /api/users
router.get('/users', authenticateToken,async (req, res) => {
    try {

        const users = await User.findAll({
            where: {
                branch_id: req.user.branch_id  // Additional condition for branch_id
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
});

module.exports = router;
