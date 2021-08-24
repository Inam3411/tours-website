const express = require('express');
const controller = require(`${__dirname}/../controllers/tourController`)

const router = express.Router();

router.route('/tours-stats').get(controller.getToursStats)
router.route('/top-5-cheap').get(controller.alliasTopTours, controller.showTours);
// router.param('id', controller.checkID)
router.route('/').get(controller.showTours).post(controller.createTour);
router.route('/:id').get(controller.showTour).patch(controller.updateTour).delete(controller.deleteTour);

module.exports = router;
