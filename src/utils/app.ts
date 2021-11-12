import semver from "semver";
import { storage } from "@src/utils";
import type { USER } from "@src/configs";

const { version: appVersion } = require("../../package.json");

export const appVersionCheck = async () => {
  const storageUser = await storage.getItem<typeof USER | null>("@user", null);

  if (!storageUser) {
    return;
  }

  const userVersion = storageUser.version;

  if (semver.eq(appVersion, "0.1.4") && semver.gt(userVersion, "0.1.4")) {
    storageUser.version = "0.1.4";

    await storage.setItem("@user", storageUser);
  }
};
