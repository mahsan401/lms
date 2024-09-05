const express=require('express');
const authRoutes = require("./auth");
const branchRoutes = require("./branch");
const userRoutes = require("./user");
const roleAndPermissionRoutes = require("./roleAndPermissions");
const FrontOfficePurposeRoutes = require("./FrontOffice/purpose");
const FrontOfficeClassRoutes = require("./FrontOffice/class");
const FrontOfficeComplaintTypeRoutes = require("./FrontOffice/complaintType");
const FrontOfficeRefrenceRoutes = require("./FrontOffice/refrence");
const FrontOfficeSourceRoutes = require("./FrontOffice/source");
const router=express.Router();
const Prefix='/api';

router.use(Prefix, authRoutes);
router.use(Prefix, branchRoutes);
router.use(Prefix, userRoutes);
router.use(Prefix, roleAndPermissionRoutes);
//front office routs
router.use(Prefix, FrontOfficePurposeRoutes);
router.use(Prefix, FrontOfficeClassRoutes);
router.use(Prefix, FrontOfficeComplaintTypeRoutes);
router.use(Prefix, FrontOfficeRefrenceRoutes);
router.use(Prefix, FrontOfficeSourceRoutes);
router.get('/', (req, res) => {
    res.send('Hello, welcome to NODE.js!');
});
module.exports = router;
