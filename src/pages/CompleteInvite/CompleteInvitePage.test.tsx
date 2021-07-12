import React from "react";
import { render, act } from "@testing-library/react";

import { TestWrapper } from "utils/TestUtils";
import { useCompleteSignupInvite } from "services/ng";
import CompleteInvitePage from "./CompleteInvitePage";
import { EMAIL_VERIFY_STATUS } from "utils/StringUtils";

jest.mock("services/ng");
const useCompleteSignupInviteMock = useCompleteSignupInvite as jest.MockedFunction<any>;

describe("Verify Email", () => {
  test("should display an email verification success message", async () => {
    useCompleteSignupInviteMock.mockImplementation(() => {
      return {
        loading: false,
        mutate: jest.fn().mockImplementation(() => {
          return {
            resource: {
              accountIdentifier: "accnt1"
            }
          };
        })
      };
    });

    const email = "test@test.com";

    await act(async () => {
      const { getByText } = render(
        <TestWrapper path="/register/verify/token123" queryParams={{ email }}>
          <CompleteInvitePage />
        </TestWrapper>
      );

      expect(getByText(EMAIL_VERIFY_STATUS.SUCCESS)).toBeDefined();
    });
  });

  test("should display an email verification in progress message", async () => {
    useCompleteSignupInviteMock.mockImplementation(() => {
      return {
        loading: true,
        mutate: jest.fn().mockImplementation(() => {
          return {
            resource: {
              accountIdentifier: "accnt1"
            }
          };
        })
      };
    });

    const email = "test@test.com";

    await act(async () => {
      const { getByText } = render(
        <TestWrapper path="/register/verify/token123" queryParams={{ email }}>
          <CompleteInvitePage />
        </TestWrapper>
      );

      expect(getByText(EMAIL_VERIFY_STATUS.IN_PROGRESS)).toBeDefined();
    });
  });

  test("should display an email verification failed message", async () => {
    useCompleteSignupInviteMock.mockImplementation(() => {
      return {
        loading: false,
        mutate: jest.fn().mockImplementation(() => {
          return {
            resource: {
              accountIdentifier: "accnt1"
            }
          };
        }),
        error: {}
      };
    });

    const email = "test@test.com";

    await act(async () => {
      const { getByText } = render(
        <TestWrapper path="/register/verify/token123" queryParams={{ email }}>
          <CompleteInvitePage />
        </TestWrapper>
      );

      expect(getByText(EMAIL_VERIFY_STATUS.FAILED)).toBeDefined();
    });
  });

  test("should display an email verification failed message without the resend button if no email is present", async () => {
    useCompleteSignupInviteMock.mockImplementation(() => {
      return {
        loading: false,
        mutate: jest.fn().mockImplementation(() => {
          return {
            resource: {
              accountIdentifier: "accnt1"
            }
          };
        }),
        error: {}
      };
    });

    await act(async () => {
      const { getByText } = render(
        <TestWrapper path="/register/verify/token123">
          <CompleteInvitePage />
        </TestWrapper>
      );

      expect(getByText(EMAIL_VERIFY_STATUS.FAILED)).toBeDefined();
    });
  });
});
