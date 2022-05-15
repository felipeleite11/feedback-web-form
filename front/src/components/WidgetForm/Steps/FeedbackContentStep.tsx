import { FormEvent, useContext, useState } from 'react'
import { ArrowLeft } from 'phosphor-react'

import { feedbackTypes, GlobalContext, FeedbackType } from '../../../contexts/GlobalContext'

import { CloseButon } from '../../CloseButton'
import { ScreenshotButton } from '../ScreenshotButton'
import { Loader } from '../Loader'

import { api } from '../../../services/api'

export function FeedbackContentStep() {
	const { feedbackType, handleBackToTypeStep, setFeedbackSent, screenshot } = useContext(GlobalContext)

	const [comment, setComment] = useState('')
	const [isSendingFeedback, setIsSendingFeeedback] = useState(false)

	const feedbackTypeInfo = feedbackTypes[feedbackType as FeedbackType]

	async function handleSubmitFeedback(event: FormEvent) {
		event.preventDefault()

		setIsSendingFeeedback(true)

		try {
			await api.post('feedbacks', {
				type: feedbackType,
				comment,
				screenshot
			})
		} catch(e) {
			console.log('Ocorreu um erro ao enviar o feedback.')
		}

		setIsSendingFeeedback(false)

		setFeedbackSent(true)
	}

	return (
		<>
			<header>
				<button 
					type="button" 
					className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
					onClick={handleBackToTypeStep}
				>
					<ArrowLeft weight="bold" className="w-4 h-4" />
				</button>

				<span className="text-xl leading-6 flex items-center gap-2	">
					<img 
						src={feedbackTypeInfo.image.source} 
						alt={feedbackTypeInfo.image.alt} 
						className="w-6 h-6"
					/>

					{feedbackTypeInfo.title}
				</span>

				<CloseButon />
			</header>

			<form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
				<textarea 
					className="min-w-[304px] w-full min-h-[96px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
					placeholder="Conte com detalhes o que está acontecendo..."
					value={comment}
					onChange={e => { setComment(e.target.value) }}
				/>

				<footer className="flex gap-2 mt-2">
					<ScreenshotButton />

					<button
						type="submit"
						className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
						disabled={!comment || isSendingFeedback}
					>
						{isSendingFeedback ? <Loader /> : 'Enviar feedback'}
					</button>
				</footer>
			</form>
		</>
	)
}