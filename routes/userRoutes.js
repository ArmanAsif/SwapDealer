import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUsersReview,
  addFeedback,
  getAllUsers,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router.post('/login', authUser)
router.get('/reviews', protect, getUsersReview)
router.put('/:id/feedback', protect, addFeedback)


export default router


