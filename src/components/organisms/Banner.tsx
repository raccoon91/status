import React from "react";
import admob, {
  MaxAdContentRating,
  AdsConsent,
  AdsConsentStatus,
  BannerAd,
  BannerAdSize,
  TestIds,
} from "@react-native-firebase/admob";

const firebase = require("../../../firebase.json")["react-native"];
const publisherId = firebase.admob_publisher_id;
const adUnitId = __DEV__ ? TestIds.BANNER : firebase.admob_banner_unit_id;

export const initAdmobConsent = async () => {
  try {
    await admob().setRequestConfiguration({ maxAdContentRating: MaxAdContentRating.G });
    // await AdsConsent.setDebugGeography(AdsConsentDebugGeography.EEA);
    const consentInfo = await AdsConsent.requestInfoUpdate([publisherId]);

    if (consentInfo.isRequestLocationInEeaOrUnknown && consentInfo.status === AdsConsentStatus.UNKNOWN) {
      const formResult = await AdsConsent.showForm({
        privacyPolicy: "https://raccoon91.github.io",
        withPersonalizedAds: true,
        withNonPersonalizedAds: true,
      });

      if (formResult.status === AdsConsentStatus.NON_PERSONALIZED) {
        AdsConsent.setStatus(AdsConsentStatus.NON_PERSONALIZED);
      } else if (formResult.status === AdsConsentStatus.PERSONALIZED) {
        AdsConsent.setStatus(AdsConsentStatus.PERSONALIZED);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const Banner = () => {
  return <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER} />;
};
