import { useState, useEffect } from 'react'
import HeadphoneDetection from 'react-native-headphone-detection'

export default function useHeadphone() {
  const [isHeadphoneConnected, setIsHeadphoneConnected] = useState<
    boolean | undefined
  >(false)

  useEffect(() => {
    HeadphoneDetection.addListener((result) => {
      setIsHeadphoneConnected(result.audioJack || result.bluetooth)
    })
    return () => {

      if (HeadphoneDetection.remove) HeadphoneDetection.remove()
    }
  }, [])

  return { isHeadphoneConnected }
}