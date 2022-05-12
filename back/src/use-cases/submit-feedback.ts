import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbackRepository } from "../repositories/feedbackRepository"

interface SubmitFeedbackUseCaseRequest {
	type: string
	comment: string
	screenshot?: string
}

function validateScreenshotURI(uri: string) {
	return uri.startsWith('file:///') || uri.startsWith('data:image/png;base64')
}

export class SubmitFeedbackUseCase {
	constructor(
		private feedbackRepository: FeedbackRepository,
		private mailAdapter: MailAdapter
	) {}

	async execute(request: SubmitFeedbackUseCaseRequest) {
		const { type, comment, screenshot } = request

		if(!type) {
			throw new Error('Type is required.')
		}

		if(!comment) {
			throw new Error('Comment is required.')
		}

		if(screenshot && !validateScreenshotURI(screenshot)) {
			throw new Error('Invalid screenshot format.')
		}

		const response = await this.feedbackRepository.create({
			type,
			comment,
			screenshot 
		})

		await this.mailAdapter.sendMail({
			subject: 'Novo feedback',
			body: [
				'<div style="font-family: sans-serif; font-size: 16px">',
				`<p>Tipo: ${type}</p>`,
				`<p>Comentário: ${comment}</p>`,
				'</div>'
			].join('')
		})

		return response
	}
}