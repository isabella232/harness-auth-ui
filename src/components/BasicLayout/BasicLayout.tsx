/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
