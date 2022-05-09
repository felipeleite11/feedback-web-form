import { useContext } from 'react'

import { CloseButon } from '../../CloseButton'

import { GlobalContext } from '../../../contexts/GlobalContext'

import success from '../../../assets/success.svg'

export function FeedbackSuccessStep() {
	const { resetFeedbackForm } = useContext(GlobalContext)

	return (
		<>
			<header>
				<CloseButon />
			</header>

			<div className="flex flex-col items-center pb-4 pt-8 w-[304px]">
				<img src={success} />

				<span className="text-xl mt-6 mb-1">Agradecemos o feedback!</span>

				<button
					className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
					onClick={resetFeedbackForm}
				>
					Quero enviar outro
				</button>
			</div>
		</>
	)
}