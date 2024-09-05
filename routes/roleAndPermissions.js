const express = require('express');
const { Role,Permission,RolHasPermission } = require('../models'); // Adjust the path as necessary
const router = express.Router();
const authenticateToken=require('../middleware/auth');
const { Op } = require('sequelize'); // Import Op from Sequelize


// GET /api/roles
router.get('/roles', authenticateToken, async (req, res) => {
    try {
        const roles = await Role.findAll({
            include: [
                {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['name'], // Fetch only the permission name
                    through: { attributes: [] } // Exclude the RoleHasPermission fields
                }
            ]
        });
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching roles' });
    }
});


// GET /api/role/:id
router.get('/role/:id', authenticateToken, async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id, {
            include: [
                {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['name'], // Fetch only the permission name
                    through: { attributes: [] } // Exclude the RoleHasPermission fields
                }
            ]
        });

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        res.json(role);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching role' });
    }
});


// GET /api/permissions
router.get('/permissions', authenticateToken,async (req, res) => {
    try {
        // Fetch all permissions
        const permissions = await Permission.findAll();

        // Group permissions by module and feature
        const groupedPermissions = {};

        permissions.forEach(permission => {
            const { module, feature } = permission;

            if (!groupedPermissions[module]) {
                groupedPermissions[module] = {};
            }

            if (!groupedPermissions[module][feature]) {
                groupedPermissions[module][feature] = [];
            }

            groupedPermissions[module][feature].push(permission);
        });

        res.json(groupedPermissions);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching permissions' });
    }
});

//POST /api/role-create
router.post('/role-create',authenticateToken,async (req,res)=>{

    const {name,permissions}=req.body;

    try{
        const existingRole = await Role.findOne({ where: { name } });
        if (existingRole) {
            return res.status(400).json({ message: 'Role name already exists' });
        }
        const role = await Role.create({ name });
        if (permissions && permissions.length > 0) {
            const rolePermissions = permissions.map(permissionId => ({
                role_id: role.id,
                permission_id: permissionId
            }));

            await RolHasPermission.bulkCreate(rolePermissions);
        }

        return res.status(201).json({ message: 'Role created successfully',data:role });

    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred while creating the role' });
    }

})

//PUT //role-update/:id
router.put('/role-update/:id',async (req,res)=>{
    const role=await Role.findByPk(req.params.id);
    const {name,permissions}=req.body;
    if(!role){
        return res.status(400).json({message:"Role not found"});
    }
    const existingRole = await Role.findOne({
        where: {
            name: name,
            id: { [Op.ne]: req.params.id } // Exclude the current role
    }
   });
    if (existingRole) {
        return res.status(400).json({ message: 'Role name already exists' });
    }
   await role.update({name});
   await RolHasPermission.destroy({
        where: {role_id:role.id}
    })
    // Insert new permissions
    if (permissions && permissions.length>0) {
        const newPermissions = permissions.map(permission_id => ({
            role_id: role.id,
            permission_id: permission_id
        }));
        await RolHasPermission.bulkCreate(newPermissions);
    }

    res.json({ message: "Role updated successfully",data:role });


})
//DELETE /role-delete/:id
router.delete('/role-delete/:id',async (req,res)=>{
    const role=await Role.findByPk(req.params.id);
    if(!role){
        return res.status(400).json({message:"Role not found"});
    }
    await role.destroy();
    return res.json({message:"Role deleted Successfully"});
});

module.exports = router;