import { useVanityExperience } from "./useVanityExperience";
import { renderHook } from "@testing-library/react-hooks";
import mocks from "./authInfoMock.json";
import { TestWrapper } from "utils/TestUtils";
import React from "react";

const returnUrl =
  "https://qb.harness.io/#/account/zEaak-FLS425IEO7OLzMUg/deployments";

const getMockData = jest.fn();
const getAuthenticationInfo = jest.fn();

jest.useFakeTimers();
jest.mock("services/gateway", () => {
  return {
    useGetAuthenticationInfo: () => {
      return {
        data: getMockData(),
        refetch: getAuthenticationInfo,
        loading: false,
        error: null
      };
    }
  };
});

describe("useVanityExperience", () => {
  const wrapper: React.FC<unknown> = ({ children }) => {
    return (
      <TestWrapper path="/signin" queryParams={{ returnUrl }}>
        {children}
      </TestWrapper>
    );
  };

  beforeEach(() => {
    getAuthenticationInfo.mockReset();
  });

  test("returnUrl + email-password with oauth", () => {
    getMockData.mockReturnValue(mocks.one);

    const { result } = renderHook(() => useVanityExperience(), { wrapper });

    jest.runAllTimers();

    expect(getAuthenticationInfo).toBeCalled();
    expect(result.current).toMatchObject({
      accountId: "zEaak-FLS425IEO7OLzMUg",
      isVanity: false,
      hideUsernamePasswordForm: false,
      hideOauth: false,
      hideSSO: true
    });
  });

  test("returnUrl + email-password only", () => {
    getMockData.mockReturnValue(mocks.two);

    const { result } = renderHook(() => useVanityExperience(), { wrapper });

    jest.runAllTimers();

    expect(result.current).toMatchObject({
      accountId: "zEaak-FLS425IEO7OLzMUg",
      isVanity: false,
      hideUsernamePasswordForm: false,
      hideOauth: true,
      hideSSO: true
    });
  });

  test("returnUrl + oauth only", () => {
    getMockData.mockReturnValue(mocks.three);

    const { result } = renderHook(() => useVanityExperience(), { wrapper });

    jest.runAllTimers();

    expect(getAuthenticationInfo).toBeCalled();
    expect(result.current).toMatchObject({
      accountId: "zEaak-FLS425IEO7OLzMUg",
      isVanity: false,
      hideUsernamePasswordForm: true,
      hideOauth: false,
      hideSSO: true
    });
  });

  test("returnUrl + saml only", () => {
    getMockData.mockReturnValue(mocks.four);

    const { result } = renderHook(() => useVanityExperience(), { wrapper });

    jest.runAllTimers();

    expect(getAuthenticationInfo).toBeCalled();
    expect(result.current).toMatchObject({
      accountId: "zEaak-FLS425IEO7OLzMUg",
      isVanity: false,
      hideUsernamePasswordForm: true,
      hideOauth: true,
      hideSSO: false
    });
  });

  test("vanity url only", () => {
    getMockData.mockReturnValue(mocks.five);

    window.expectedHostname = "app.harness.io";
    window.location.hostname = "vanity.harness.io";

    const wrapper: React.FC<unknown> = ({ children }) => {
      return <TestWrapper path="/signin">{children}</TestWrapper>;
    };

    const { result } = renderHook(() => useVanityExperience(), { wrapper });

    jest.runAllTimers();

    expect(getAuthenticationInfo).toBeCalled();
    expect(result.current).toMatchObject({
      accountId: undefined,
      isVanity: true,
      hideUsernamePasswordForm: false,
      hideOauth: false,
      hideSSO: true
    });
  });

  test("no vanity or return url", () => {
    getMockData.mockReturnValue(mocks.five);

    window.expectedHostname = "localhost";
    const wrapper: React.FC<unknown> = ({ children }) => {
      return <TestWrapper path="/signin">{children}</TestWrapper>;
    };

    const { result } = renderHook(() => useVanityExperience(), { wrapper });

    jest.runAllTimers();

    expect(getAuthenticationInfo).not.toBeCalled();
    expect(result.current).toMatchObject({
      accountId: undefined,
      isVanity: false,
      hideUsernamePasswordForm: false,
      hideOauth: false,
      hideSSO: false
    });
  });
});
