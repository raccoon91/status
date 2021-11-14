import semver from "semver";
import { storage } from "@src/utils";
import type { USER } from "@src/configs";

export const appVersionCheck = async () => {
  const storageUser = await storage.getItem<typeof USER | null>("@user", null);

  if (!storageUser) {
    return;
  }

  const userVersion = storageUser.version;

  if (!semver.eq(userVersion, "0.1.5")) {
    storageUser.version = "0.1.5";

    await storage.setItem("@user", storageUser);
  }
};
