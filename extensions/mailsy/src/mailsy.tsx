import { useEffect, useState } from "react";
import { createAccount } from "./libs/api";
import { isLoggedIn, withToast } from "./libs/utils";
import { Mail } from "./components/Mail";

export default function Command() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        setIsReady(true);
      } else {
        void withToast({
          action: () => createAccount(),
          onSuccess: () => {
            setIsReady(true);
            return "Account created successfully";
          },
          onFailure: () => "Account creation failed",
          loadingMessage: "Creating account...",
        })();
      }
    };

    void bootstrap();
  }, []);

  if (!isReady) {
    return <></>;
  }

  return <Mail />;
}
