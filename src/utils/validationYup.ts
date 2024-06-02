import * as yup from "yup";
const schema = yup.object().shape({
    nickname: yup
      .string()
      .min(3, "닉네임을 3글자 이상으로 입력해주세요.")
      .required("닉네임을 필수로 입력해주세요."),
    name: yup
      .string()
      .min(3, "이름을 3글자 이상으로 입력해주세요.")
      .required("이름을 필수로 입력해주세요."),
    profileImg: yup.string().optional(),
    kakaoEmail: yup.string().optional()
  });

export default schema;