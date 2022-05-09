import express from 'express'
import nodemailer from 'nodemailer'

import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "3564123568f9ef",
		pass: "eb14d830f8859f"
	}
})

app.post('/feedbacks', async (req, res) => {
	const { type, comment, screenshot } = req.body

	const feedback = await prisma.feedback.create({
		data: {
			type,
			comment,
			screenshot
		}
	})

	await transport.sendMail({
		from: 'Equipe Feedget <no-reply@feedget.com>',
		to: 'Felipe Leite <felipe@robot.rio.br>',
		subject: 'Novo feedback',
		html: [
			'<div style="font-family: sans-serif; font-size: 16px">',
			`<p>Tipo: ${type}</p>`,
			`<p>Comentário: ${comment}</p>`,
			'</div>'
		].join('')
	})

	return res.status(201).json(feedback)
})

app.get('/feedbacks', async (req, res) => {
	const feedbacks = await prisma.feedback.findMany()

	return res.json(feedbacks)
})

app.listen(3333, () => {
	console.log('Executando...')
})