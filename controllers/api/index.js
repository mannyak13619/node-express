const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./handymanRoutes');
const fileRoutes = require('./fileRoutes');

router.use('/users', userRoutes);
router.use('/handyman', handymanRoutes); 
router.use('/files', fileRoutes);

module.exports = router;