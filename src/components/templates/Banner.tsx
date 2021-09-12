import React, { useEffect } from "react";
import { Flex } from "@src/components/atoms";
import {
  AdsConsent,
  AdsConsentStatus,
  AdsConsentDebugGeography,
  BannerAd,
  BannerAdSize,
  TestIds,
} from "@react-native-firebase/admob";

const firebase = require("../../../firebase.json")["react-native"];
const adUnitId = __DEV__ ? TestIds.BANNER : firebase.admob_android_app_id;

const getAdmobConsent = async () => {
  try {
    const publisherId = firebase.admob_publisher_id;
    await AdsConsent.setDebugGeography(AdsConsentDebugGeography.EEA);
    const consentInfo = await AdsConsent.requestInfoUpdate([publisherId]);

    console.log("consentInfo", consentInfo);

    if (consentInfo.isRequestLocationInEeaOrUnknown && consentInfo.status === AdsConsentStatus.UNKNOWN) {
      const formResult = await AdsConsent.showForm({
        privacyPolicy: "https://invertase.io/privacy-policy",
        withPersonalizedAds: true,
        withNonPersonalizedAds: true,
        withAdFree: true,
      });

      if (formResult.userPrefersAdFree) {
        // Handle the users request, e.g. redirect to a paid for version of the app
        console.log("ad free");
      }

      // The user requested non-personalized or personalized ads
      const status = formResult.status;
      console.log("status", status);

      // await AdsConsent.setStatus(AdsConsentStatus.PERSONALIZED);
    }
  } catch (err) {
    console.error(err);
  }
};

export const Banner = () => {
  useEffect(() => {
    getAdmobConsent();
  }, []);

  return (
    <Flex w="100%" h="50px" bgColor="#f8f8f8" mb="16px" radius="3px">
      <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER} />
    </Flex>
  );
};
