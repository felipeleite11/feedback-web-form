import React, { useState } from 'react'
import { ArrowLeft } from 'phosphor-react-native'
import { captureScreen } from 'react-native-view-shot'
import * as fileSystem from 'expo-file-system'

import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native'

import { styles } from './styles'
import { theme } from '../../theme'

import { FeedbackType } from '../Widget'
import { Screenshot } from '../Screenshot'
import { Button } from '../Button'

import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../services/api'

interface FormProps {
	feedbackType: FeedbackType
	onGoBack: () => void
	onFeedbackSent: () => void
}

interface FeedbackStoreRequest {
	type: string
	screenshot?: string
	comment: string
	device: string
}

async function getScreenshotBase64(path: string | null) {
	if(!path) {
		return undefined
	}

	const base64String = await fileSystem.readAsStringAsync(path, { encoding: fileSystem.EncodingType.Base64 })

	return `data:image/png;base64, ${base64String}`
}

export function Form({ feedbackType, onGoBack, onFeedbackSent }: FormProps) {
	const feedbackTypeInfo = feedbackTypes[feedbackType]

	const [screenshot, setScreenshot] = useState<string | null>(null)
	const [comment, setComment] = useState('')
	const [isSending, setIsSending] = useState(false)

	async function handleScreenshotCapture() {
		try {
			const uri = await captureScreen({
				format: 'jpg',
				quality: 0.8
			})

			setScreenshot(uri)
		} catch(e) {
			console.log(e)
		}
	}

	function handleScreenshotRemove() {
		setScreenshot(null)
	}

	async function handleSend() {
		setIsSending(true)

		try {
			const body: FeedbackStoreRequest = {
				type: feedbackType,
				comment,
				screenshot: await getScreenshotBase64(screenshot), 
				device: 'mobile'
			}

			await api.post<FeedbackStoreRequest>('feedbacks', body)
			
			setIsSending(false)

			onFeedbackSent()
		} catch(e) {
			console.log(e)

			setIsSending(false)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={onGoBack}>
					<ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} />
				</TouchableOpacity>

				<View style={styles.titleContainer}>
					<Image source={feedbackTypeInfo.image} style={styles.image} />

					<Text style={styles.titleText}>
						{feedbackTypeInfo.title}
					</Text>
				</View>
			</View>

			<TextInput 
				multiline
				style={styles.input}
				placeholder="Escreva seu feedback..."
				placeholderTextColor={theme.colors.text_secondary}
				autoCorrect={false}
				onChangeText={setComment}
			/>

			<View style={styles.footer}>
				<Screenshot 
					screenshot={screenshot}
					onTakeShot={handleScreenshotCapture}
					onRemoveShot={handleScreenshotRemove}
				/>

				<Button 
					isLoading={isSending} 
					onPress={handleSend} 
					disabled={isSending}
				/>
			</View>
		</View>
	)
}