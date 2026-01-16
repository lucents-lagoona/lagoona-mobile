import { UserType } from "@/types/user";

import communityBadge from "../../assets/home/user-card/community-badge.png";
import communityBg from "../../assets/home/user-card/community-bg.png";
import guestBadge from "../../assets/home/user-card/guest-badge.png";
import guestBg from "../../assets/home/user-card/guest-bg.png";
import privateBadge from "../../assets/home/user-card/private-badge.png";
import privateBg from "../../assets/home/user-card/private-bg.png";

export const getUserBadge = (type: UserType) => {
  switch (type) {
    case UserType.community:
      return {
        badge: communityBadge,
        bg: communityBg,
      };
    case UserType.private:
      return {
        badge: privateBadge,
        bg: privateBg,
      };
    default:
      return {
        badge: guestBadge,
        bg: guestBg,
      };
  }
};
