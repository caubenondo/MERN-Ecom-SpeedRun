import express from 'express'
const router = express.Router()

import {
    addOrderItems,
   
  } from '../controllers/orderController.js'
import { protect } from '../util/authMiddleware.js'

router.route('/').post(protect, addOrderItems)


export default router