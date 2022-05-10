import { Request, Response } from "express"

import { NodemailerMailAdapter } from "../adapters/nodemailer/NodemailerMailAdapter"
import { PrismaFeedbackRepository } from "../repositories/prisma/PrismaFeedbackRepository"
import { ListFeedbacks } from "../use-cases/list-feedbacks"
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback"

class FeedbackController {
	async index(req: Request, res: Response) {
		const prismaFeedbackRepository = new PrismaFeedbackRepository()

		const listFeedbacksUC = new ListFeedbacks(prismaFeedbackRepository)
	
		const feedbacks = await listFeedbacksUC.execute()
	
		return res.json(feedbacks)
	}

	async store(req: Request, res: Response) {
		const { type, comment, screenshot } = req.body

		const prismaFeedbackRepository = new PrismaFeedbackRepository()
		const mailAdpter = new NodemailerMailAdapter()
	
		const submitFeedbackUC = new SubmitFeedbackUseCase(prismaFeedbackRepository, mailAdpter)
	
		const feedback = await submitFeedbackUC.execute({
			type,
			comment,
			screenshot
		})
	
		return res.status(201).json(feedback)
	}
}

export const feedbackController = new FeedbackController()