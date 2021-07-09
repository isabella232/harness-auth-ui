import React from "react";
import { render, waitFor, act } from "@testing-library/react";

import { TestWrapper } from "utils/TestUtils";
import { EMAIL_VERIFY_STATUS } from "utils/StringUtils";
import { useCompleteSignupInvite } from "services/ng";
import { VerifyEmail } from "./VerifyEmail";

jest.mock("services/ng");
const useCompleteSignupInviteMock = useCompleteSignupInvite as jest.MockedFunction<any>;

describe("Verify Email", () => {
  test("should display success msg if verify success", async () => {
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

    await act(async () => {
      const { getByText } = render(
        <TestWrapper path={"/register/verify/token123"}>
          <VerifyEmail />
        </TestWrapper>
      );
      expect(getByText(EMAIL_VERIFY_STATUS.IN_PROGRESS)).toBeDefined();
    });
  });

  test("should display in progress msg while verify in progress", async () => {
    useCompleteSignupInviteMock.mockImplementation(() => {
      return {
        loading: true,
        mutate: jest.fn()
      };
    });

    await act(async () => {
      const { getByText } = render(
        <TestWrapper path={"/register/verify/token123"}>
          <VerifyEmail />
        </TestWrapper>
      );
      expect(getByText(EMAIL_VERIFY_STATUS.IN_PROGRESS)).toBeDefined();
    });
  });

  test("should display failure msg while verify fails", async () => {
    useCompleteSignupInviteMock.mockImplementation(() => {
      return {
        loading: false,
        mutate: jest.fn().mockRejectedValue(() => {
          return {
            error: "verify call failed"
          };
        })
      };
    });

    const { getByText } = render(
      <TestWrapper path={"/register/verify/token123"}>
        <VerifyEmail />
      </TestWrapper>
    );

    waitFor(() => expect(getByText(EMAIL_VERIFY_STATUS.FAILED)).toBeDefined());
  });
});
