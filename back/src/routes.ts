import express from 'express'

import { feedbackController } from './controllers/FeedbackController'

export const router = express.Router()

router.get('/feedbacks', feedbackController.index)

router.post('/feedbacks', feedbackController.store)
