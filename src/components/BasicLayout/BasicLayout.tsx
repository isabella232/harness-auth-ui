import React from "react";

import SignupIllustration from "./SignupIllustration.png";
import css from "./BasicLayout.module.css";

interface BasicLayoutProps {
  name?: string;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className={css.layout}>
      <div className={css.cardColumn}>
        <div className={css.card}>{children}</div>
      </div>
      <div className={css.imageColumn}>
        <img
          className={css.image}
          src={SignupIllustration}
          alt=""
          aria-hidden
        />
      </div>
    </div>
  );
};

export default BasicLayout;
