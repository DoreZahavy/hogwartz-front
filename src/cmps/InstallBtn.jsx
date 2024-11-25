import { useContext } from "react";
import { InstallContext } from "./InstallContext";
// import useInstallPWA from "../hooks/install-pwa";
export function InstallBtn() {
    // const { triggerInstallPrompt, isInstallAvailable } = useInstallPWA()
    const { triggerInstallPrompt, isInstallAvailable } = useContext(InstallContext)



    return isInstallAvailable ? (
        <button className="install-btn" onClick={triggerInstallPrompt}>
            Install App
        </button>
    ) : null

}
