import semver from "semver";
import { removeStorage, getStorageUser, setStorageUser } from "@src/utils";

export const appVersionCheck = async () => {
  const storageUser = await getStorageUser();
  const userVersion = storageUser.version;

  if (semver.lt(userVersion, "0.2.0")) {
    await removeStorage();
  }

  if (semver.lt(userVersion, "0.2.1")) {
    await setStorageUser({
      ...storageUser,
      version: "0.2.1",
    });
  }
};
