import { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'

import { theme } from './src/theme'

import { Widget } from './src/components/Widget'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_500Medium
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady || !fontsLoaded) {
    return null
  }

  return (
    <View 
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <Widget />

      <StatusBar 
        style="light" 
        backgroundColor="transparent"
        translucent
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
})
