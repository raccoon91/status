import semver from "semver";
import Toast from "react-native-toast-message";
import { removeStorage, getStorageUser, setStorageUser } from "@src/utils";

export const appVersionCheck = async () => {
  try {
    const storageUser = await getStorageUser();
    const userVersion = storageUser.version;

    if (semver.lt(userVersion, "0.2.1")) {
      await removeStorage(["@status", "@statistics", "@schdule"]);
      await setStorageUser({
        ...storageUser,
        version: "0.2.2",
      });
    } else if (semver.lt(userVersion, "0.2.2")) {
      await setStorageUser({
        ...storageUser,
        version: "0.2.2",
      });
    }
  } catch (error) {
    Toast.show({ type: "error", text1: "Version Check", text2: "failed app version check" });
  }
};
