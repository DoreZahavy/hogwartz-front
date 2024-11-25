import { createContext, useEffect, useState } from 'react'

const useInstallPWA = () => {
  const [installEvent, setInstallEvent] = useState(null)

  useEffect(() => {
    // Add the event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  function handleBeforeInstallPrompt(e) {
    // Prevent the default mini-infobar prompt
    e.preventDefault()

    // Save the event for later use
    setInstallEvent(e)
  }

  function triggerInstallPrompt() {
    if (installEvent) {
      installEvent.prompt() // Show the install prompt

      installEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setInstallEvent(null) // Clear the event after use
      })
    }
  }
  return { triggerInstallPrompt, isInstallAvailable: !!installEvent }
}

export default useInstallPWA



