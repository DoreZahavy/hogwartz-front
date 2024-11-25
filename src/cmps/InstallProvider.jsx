import useInstallPWA from "../hooks/install-pwa";
import { InstallContext } from "./InstallContext";

export const InstallProvider = ({ children }) => {
    const { triggerInstallPrompt, isInstallAvailable } = useInstallPWA();
  
    return (
      <InstallContext.Provider value={{ triggerInstallPrompt, isInstallAvailable }}>
        {children}
      </InstallContext.Provider>
    );
  };