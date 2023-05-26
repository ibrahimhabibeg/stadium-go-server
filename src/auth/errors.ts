import { AuthError, AuthField } from "../types/graphql";

export const emailAlreadyTakenError: AuthError = {
  __typename: "AuthError",
  message: "This email already has an account.",
  arbMessage: "هذا البريد الإلكتروني لديه حساب بالفعل",
  errorField: AuthField.Email,
};

export const usernameAlreadyTakenError: AuthError = {
  __typename: "AuthError",
  message: "Username already taken.",
  arbMessage: "الاسم مستخدم من قبل",
  errorField: AuthField.Username,
};

export const shortPasswordError: AuthError = {
  __typename: "AuthError",
  message: "Password must contain at least 6 characters.",
  arbMessage: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل",
  errorField: AuthField.Password,
};

export const usernameInvalidCharacterError: AuthError = {
  __typename: "AuthError",
  message: "Username contains invalid character.",
  arbMessage: "اسم المستخدم يحتوي على حرف غير صالح",
  errorField: AuthField.Username,
};

export const invalidEmailError: AuthError = {
  __typename: "AuthError",
  message: "Invalid Email.",
  arbMessage: "بريد إلكتروني خاطئ",
  errorField: AuthField.Email,
};
