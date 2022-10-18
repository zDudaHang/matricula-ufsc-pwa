import { useEffect, useState } from 'react'

type InstallPromptUserChoice = 'dismissed' | 'accepted'

interface UserChoiceModel {
  outcome: InstallPromptUserChoice
  platform: string
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<any>
  userChoice: Promise<UserChoiceModel>
}

interface UseInstallResult {
  deferredPrompt: BeforeInstallPromptEvent
  reset(): void
}

// https://www.amitmerchant.com/adding-custom-install-button-in-progressive-web-apps/
export function useInstall(): UseInstallResult {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>()

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Optionally, send analytics event that PWA install promo was shown.
      console.debug(`'beforeinstallprompt' event was fired.`)
      return () => {
        window.removeEventListener('beforeinstallprompt', () => {})
      }
    })
  }, [])

  return {
    deferredPrompt,
    reset: () => setDeferredPrompt(null),
  }
}
