import { createContext, useState } from 'react'

import bug from '../assets/bug.svg'
import idea from '../assets/idea.svg'
import thought from '../assets/thought.svg'

export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: {
			source: bug,
			alt: 'Imagem de um inseto'
		}
	},
	IDEA: {
		title: 'Ideia',
		image: {
			source: idea,
			alt: 'Imagem de uma lâmpada'
		}
	},
	OTHER: {
		title: 'Outro',
		image: {
			source: thought,
			alt: 'Imagem de um balão de pensamento'
		}
	}
}

interface GlobalProviderProps {
	children: JSX.Element
}

interface GlobalContextProps {
	feedbackTypes: {
		[Property in FeedbackType]: {
			title: string
			image: {
				source: string
				alt: string
			}
		}
	}
	feedbackType: FeedbackType | null
	screenshot: string | null
	setFeedbackType: React.Dispatch<React.SetStateAction<FeedbackType | null>>
	handleBackToTypeStep: () => void
	setScreenshot: React.Dispatch<React.SetStateAction<string | null>>
	feedbackSent: boolean
	setFeedbackSent: React.Dispatch<React.SetStateAction<boolean>>
	resetFeedbackForm: () => void
}

export type FeedbackType = keyof typeof feedbackTypes

export const GlobalContext = createContext<GlobalContextProps>(null as any)

export function GlobalProvider({ children }: GlobalProviderProps) {
	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
	const [screenshot, setScreenshot] = useState<string | null>(null)
	const [feedbackSent, setFeedbackSent] = useState(false)

	function handleBackToTypeStep() {
		setFeedbackType(null)
	}

	function resetFeedbackForm() {
		setFeedbackType(null)
		setScreenshot(null)
		setFeedbackSent(false)
	}

	return (
		<GlobalContext.Provider 
			value={{
				feedbackTypes,

				handleBackToTypeStep,
				
				feedbackType,
				setFeedbackType,

				screenshot,
				setScreenshot,

				feedbackSent,
				setFeedbackSent,

				resetFeedbackForm
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}