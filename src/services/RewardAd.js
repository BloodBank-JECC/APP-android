import { useEffect, useState } from "react";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = TestIds.REWARDED;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

export default function RewardAd({ onRewardEarned }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        rewarded.show();
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        onRewardEarned(reward.amount);
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return null;
}
