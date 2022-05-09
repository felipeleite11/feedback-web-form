import { useContext } from 'react'

import { FeedbackType, GlobalContext } from "../../../contexts/GlobalContext"

import { CloseButon } from '../../CloseButton'

export function FeedbackTypeStep() {
	const { feedbackTypes, setFeedbackType } = useContext(GlobalContext)

	return (
		<>
			<header>
				<span className="text-xl leading-6">Deixe seu feedback</span>

				<CloseButon />
			</header>

			<div className="flex py-8 gap-2 w-full">
				{Object.entries(feedbackTypes).map(([key, value]) => (
					<button 
						key={key}
						className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
						onClick={() => { setFeedbackType(key as FeedbackType) }}
					>
						<img src={value.image.source} alt={value.image.alt} />

						<span>{value.title}</span>
					</button>
				))}
			</div>
		</>
	)
}