import { PrismaFeedbackRepository } from "../repositories/prisma/PrismaFeedbackRepository";


export class ListFeedbacks {
	constructor(
		private feebackRepository: PrismaFeedbackRepository
	) {}

	async execute() {
		const feedbacks = await this.feebackRepository.list()

		return feedbacks
	}
}