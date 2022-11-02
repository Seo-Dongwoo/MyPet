import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Email양식이 아닙니다.")
    .required("Email은 필수 항목입니다."),
  password: Yup.string()
    .min(8, "Password는 8자 이상이여야 합니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
      "알파벳, 숫자, 특수문자를 모두 포함한 8자리 이상 입력해주세요."
    )
    .required("Password는 필수 항목입니다."),
});
