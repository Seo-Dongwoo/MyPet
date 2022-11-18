import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string()
    .min(2, "UserName은 2자 이상이여야 합니다.")
    .max(25, "UserName은 25자 이하이여야 합니다.")
    .matches(
      /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
      "UserName에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다."
    )
    .required("UserName은 필수 항목입니다."),
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
  confirmPassword: Yup.string()
    .required("Confirm Password는 필수 항목입니다.")
    .oneOf([Yup.ref("password"), null], "Password가 일치하지 않습니다."),
  phoneNumber:
    Yup.string()
    .required("핸드폰 번호를 입력해주세요."),
});
