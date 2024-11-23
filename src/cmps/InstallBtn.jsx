import useInstallPWA from "../hooks/install-pwa";
export function InstallBtn() {
    const { triggerInstallPrompt, isInstallAvailable } = useInstallPWA()



    return isInstallAvailable ? (
        <button className="install-btn" onClick={triggerInstallPrompt}>
            Install App
        </button>
    ) : null

}
