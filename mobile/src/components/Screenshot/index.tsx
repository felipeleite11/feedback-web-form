import React from 'react'
import { Trash, Camera } from 'phosphor-react-native'

import { View, TouchableOpacity, Image } from 'react-native'

import { styles } from './styles'
import { theme } from '../../theme'

interface ScreenshotProps {
	screenshot: string | null
	onTakeShot: () => void
	onRemoveShot: () => void
}

export function Screenshot({ screenshot, onTakeShot, onRemoveShot }: ScreenshotProps){
  return (
	<TouchableOpacity 
		style={styles.container}
		onPress={screenshot ? onRemoveShot : onTakeShot}
	>
		{screenshot ? (
			<View>
				<Image source={{ uri: screenshot }} style={styles.image} />

				<Trash size={22} color={theme.colors.text_secondary} weight="fill" style={styles.removeIcon} />
			</View>
		) : (
			<Camera size={24} color={theme.colors.text_secondary} weight="bold" />
		)}
	</TouchableOpacity>
  )
}