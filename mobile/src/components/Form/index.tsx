import React from 'react'
import { ArrowLeft } from 'phosphor-react-native'

import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native'

import { styles } from './styles'
import { theme } from '../../theme'

import { FeedbackType } from '../Widget'

import { feedbackTypes } from '../../utils/feedbackTypes'

interface FormProps {
	feedbackType: FeedbackType
}

export function Form({ feedbackType }: FormProps) {
	const feedbackTypeInfo = feedbackTypes[feedbackType]

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity>
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
			/>
		</View>
	)
}