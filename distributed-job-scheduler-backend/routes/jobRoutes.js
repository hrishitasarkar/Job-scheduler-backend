
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/create', jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
