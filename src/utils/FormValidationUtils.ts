import { regexEmail } from "utils/StringUtils";

export function validateName(name: string): string | undefined {
  if (!name) {
    return "Name is required";
  }
}

export function validateEmail(email: string): string | undefined {
  if (!email) {
    return "An email is required";
  }

  if (!regexEmail.test(email)) {
    return "This email is invalid";
  }

  const [username, domain] = email.split("@");

  if (username.length > 64 || domain.length > 255) {
    return "This email is invalid";
  }
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return "A password is required";
  }

  if (password.length < 8 || password.length > 64) {
    return "The password must be between 8 and 64 characters long";
  }
}

export function validatePasswordRequiredOnly(
  password: string
): string | undefined {
  if (!password) {
    return "A password is required";
  }
}
