import React, { createContext, useState } from 'react'

import { feedbackTypes } from '../utils/feedbackTypes'

type FeedbackType = keyof typeof feedbackTypes

interface GlobalContextProps {
	selectedFeedbackType: FeedbackType | null
	feedbackSent: boolean
	onFeedbackTypeSelect: () => void
	onScreenshotCapture: () => void
	onScreenshotRemove: () => void
}

// interface GlobalProviderProps {
// 	children: React.ReactNode
// }

export const GlobalContext = createContext<GlobalContextProps | null>(null)

export function GlobalProvider({ children }: any) {
	const [selectedFeedbackType, setSelectedFeedbackType] = useState<FeedbackType | null>(null)
	const [feedbackSent, setFeedbackSent] = useState(false)

	function onFeedbackTypeSelect() {

	}

	function onScreenshotCapture() {

	}

	function onScreenshotRemove() {

	}
	
	return (
		<GlobalContext.Provider value={{
			selectedFeedbackType,
			feedbackSent,
			onFeedbackTypeSelect,
			onScreenshotCapture,
			onScreenshotRemove
		}}>
			{children}
		</GlobalContext.Provider>
	)
}