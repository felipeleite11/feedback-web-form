import { useContext } from 'react'

import { GlobalContext } from '../../contexts/GlobalContext'

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'

export function WidgetForm() {
	const { feedbackType, feedbackSent } = useContext(GlobalContext)

	return (
		<div className="bg-zinc-900 p-4 position-relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
			{feedbackSent ? (
				<FeedbackSuccessStep />
			) : feedbackType ? (
				<FeedbackContentStep />
			) : (
				<FeedbackTypeStep />
			)}

			<footer className="text-xs text-neutral-400">
				Feito com ♥ pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
			</footer>
		</div>
	)
}