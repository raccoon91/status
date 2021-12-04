import semver from "semver";
import { removeStorage, getStorageUser, setStorageUser } from "@src/utils";
import { USER } from "@src/configs";

export const appVersionCheck = async () => {
  const storageUser = await getStorageUser();

  const NEW_APP_VERSION = "0.2.0";
  const userVersion = storageUser.version;

  if (semver.lt(userVersion, NEW_APP_VERSION)) {
    await removeStorage();

    await setStorageUser({
      ...USER,
      name: storageUser.name,
      version: NEW_APP_VERSION,
    });
  }
};
