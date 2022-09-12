import express from 'express'
const router = express.Router()

import { addUser, authUser ,getUserProfile, updateUserProfile} from '../controllers/userController.js'
import {protect} from '../util/authMiddleware.js'


router.route('/').post(addUser)
router.post('/login', authUser)
router.route('/profile').get( protect, getUserProfile).put(protect,updateUserProfile)

export default router