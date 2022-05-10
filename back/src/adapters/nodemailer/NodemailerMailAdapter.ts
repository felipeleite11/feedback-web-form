import nodemailer from 'nodemailer'

import { MailAdapter, MailAdapterData } from "../mail-adapter"

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "3564123568f9ef",
		pass: "eb14d830f8859f"
	}
})

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail(data: MailAdapterData) {
		const { subject, body } = data

		await transport.sendMail({
			from: 'Equipe Feedget <no-reply@feedget.com>',
			to: 'Felipe Leite <felipe@robot.rio.br>',
			subject,
			html: body
		})
	}
}

