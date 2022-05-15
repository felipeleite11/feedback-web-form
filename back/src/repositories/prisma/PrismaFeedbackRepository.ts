import { prisma } from '../../prisma'

import { FeedbackCreateData, FeedbackRepository, FeedbackReturnData } from '../feedbackRepository'

export class PrismaFeedbackRepository implements FeedbackRepository {
	async create(data: FeedbackCreateData) {
		const { type, comment, screenshot } = data

		if(screenshot) {
			console.log('screenshot length', screenshot.length)
		}

		const createdFeedback = await prisma.feedback.create({
			data: {
				type,
				comment,
				screenshot
			}
		})

		return {
			id: createdFeedback.id,
			type: createdFeedback.type,
			comment: createdFeedback.comment,
			screenshot: createdFeedback.screenshot
		} as FeedbackReturnData
	}

	async list() {
		const feedbacks = await prisma.feedback.findMany()

		return feedbacks as FeedbackReturnData[]
	}
}