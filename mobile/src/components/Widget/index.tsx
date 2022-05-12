import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'

import { styles } from './styles'
import { theme } from '../../theme'

import { Options } from '../Options'
import { Form } from '../Form'
import { Success } from '../Success'

import { feedbackTypes } from '../../utils/feedbackTypes'

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {
	const bottomSheetRef = useRef<BottomSheet>(null)

	const [selectedFeedbackType, setSelectedFeedbackType] = useState<FeedbackType | null>(null)
	const [feedbackSent, setFeedbackSent] = useState(false)

	function resetFeedback() {
		setSelectedFeedbackType(null)
		setFeedbackSent(false)
	}

	function handleOpen() {
		bottomSheetRef.current?.expand()
	}

	function handleBottomSheetChange() {
		if(feedbackSent) {
			resetFeedback()
		}
	}

	function handleGoBack() {
		resetFeedback()
	}

	function handleSent() {
		console.log('Feedback enviado')

		setFeedbackSent(true)
	}

	return (
		<>
			<TouchableOpacity
				style={styles.button}
				onPress={handleOpen}
			>
				<ChatTeardropDots
					size={24}
					color={theme.colors.text_on_brand_color}
					weight="bold"
				/>
			</TouchableOpacity>

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[1, 280]}
				backgroundStyle={styles.modal}
				handleIndicatorStyle={styles.indicator}
				onChange={handleBottomSheetChange}
			>
				{feedbackSent ? (
					<Success handleNewFeedback={handleGoBack} />
				) : selectedFeedbackType ? (
					<Form 
						feedbackType={selectedFeedbackType} 
						onGoBack={handleGoBack} 
						onFeedbackSent={handleSent}
					/>
				) : (
					<Options onSelectFeedbackType={setSelectedFeedbackType} />
				)}
			</BottomSheet>
		</>
	)
}

export default gestureHandlerRootHOC(Widget)
