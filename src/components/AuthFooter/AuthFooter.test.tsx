import React from "react";
import { render } from "@testing-library/react";
import AuthFooter, { AuthPage } from "./AuthFooter";

describe("AuthFooter", () => {
  test("it should render oauth buttons in a row when more than 4 providers", () => {
    const { container } = render(<AuthFooter page={AuthPage.SignIn} />);
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll(".iconContainer").length).toBe(6);
    expect(container.querySelector(".layout-horizontal")).toBeTruthy();
  });

  test("it should render oauth buttons in a column when less than 5 providers", () => {
    const { container } = render(
      <AuthFooter page={AuthPage.SignIn} enabledOauthProviders={["GITHUB"]} />
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll(".iconContainer").length).toBe(1);
    expect(container.querySelector(".layout-vertical")).toBeTruthy();
  });

  test("it should show disclaimer only on signup page", () => {
    const { container } = render(<AuthFooter page={AuthPage.SignUp} />);
    expect(container.querySelector(".disclaimer")).toBeTruthy();

    const { container: container2 } = render(
      <AuthFooter page={AuthPage.SignIn} />
    );
    expect(container2.querySelector(".disclaimer")).toBeFalsy();
  });

  test("it should hide login options based on props", () => {
    const { container } = render(
      <AuthFooter page={AuthPage.SignIn} hideSSO={true} />
    );
    expect(container.querySelector(".ssoButton")).toBeFalsy();
    expect(container.querySelector(".oAuthIcons")).toBeTruthy();

    const { container: container2 } = render(
      <AuthFooter page={AuthPage.SignIn} hideOAuth={true} />
    );
    expect(container2.querySelector(".oAuthIcons")).toBeFalsy();
    expect(container2.querySelector(".ssoButton")).toBeTruthy();
  });
});
