import semver from "semver";
import Toast from "react-native-toast-message";
import { getStorageUser, setStorageUser } from "@src/utils";
import { APP_VERSION } from "@src/configs";

export const appVersionCheck = async () => {
  try {
    const storageUser = await getStorageUser();
    const userVersion = storageUser.version;

    if (semver.lt(userVersion, APP_VERSION)) {
      await setStorageUser({
        ...storageUser,
        version: APP_VERSION,
      });
    }
  } catch (error) {
    Toast.show({ type: "error", text1: "Version Check", text2: "failed app version check" });
  }
};
