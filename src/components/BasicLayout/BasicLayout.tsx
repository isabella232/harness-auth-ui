import React from "react";

import { isCommunityPlan } from "utils/DeploymentTypeUtil";
import generalBgImg from "./AuthIllustration.svg";
import communityImg from "./community-bg.png";
import css from "./BasicLayout.module.css";

interface BasicLayoutProps {
  name?: string;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const bgImg = isCommunityPlan() ? communityImg : generalBgImg;
  return (
    <div className={css.layout}>
      <div className={css.cardColumn}>
        <div className={css.card}>{children}</div>
      </div>
      <div className={css.imageColumn}>
        <img className={css.image} src={bgImg} alt="" aria-hidden />
      </div>
    </div>
  );
};

export default BasicLayout;
