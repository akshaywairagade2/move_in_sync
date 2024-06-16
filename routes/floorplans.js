const express = require('express')
const { get_floor_plans,get_floor_plans_by_id,
    get_product_id,update_product_by_id,
    delete_floor_plan,search_key, add_floorplan, 
    update_floorplan_by_id } = require('../controllers/floor_plans')

const router = express.Router();

router.get('/:id/v1',get_floor_plans_by_id);
router.get('/v1', get_floor_plans);
router.delete('/delete/:id/v1',delete_floor_plan);
router.get('/search_key/:id/v1',search_key)
router.post('/add/v1', add_floorplan)
router.put('/updateplan/:id/v1', update_floorplan_by_id)



module.exports = router;