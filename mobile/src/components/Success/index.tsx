import React from 'react'

import { View, Image, Text, TouchableOpacity } from 'react-native'

import successIcon from '../../assets/success.png'
import { Copyright } from '../Copyright'

import { styles } from './styles'

interface SuccessProps {
	handleNewFeedback: () => void
}

export function Success({ handleNewFeedback }: SuccessProps){
  return (
	<View style={styles.container}>
		<Image source={successIcon} style={styles.image} />

		<Text style={styles.title}>
			Agradecemos o feedback!
		</Text>

		<TouchableOpacity style={styles.button} onPress={handleNewFeedback}>
			<Text style={styles.buttonText}>
				Quero enviar outro
			</Text>
		</TouchableOpacity>

		<Copyright />
	</View>
  )
}