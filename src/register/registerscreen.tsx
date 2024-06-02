import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from '../utils/validationYup';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  nickname: string;
  name: string;
  profileImg: string;
  kakaoEmail: string;
}
type Props = {}

const RegisterScreen = (props: Props) => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
	  reset, 
    setValue,// 필드값 초기화
    formState: { isSubmitting, errors },
  } = useForm<IFormInput, any>({ resolver: yupResolver<any>(schema), mode: "onChange"});
  
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  }

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the image url to the profileImg field
        setValue('profileImg', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Register to PlayBarcode</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="nickname" className="mb-2">Nickname</label>
          <input
            id="nickname"
            {...register('nickname')}
            placeholder="Enter your nickname"
            className="p-2 rounded border border-gray-700 focus:ring focus:ring-indigo-500 text-black"
          />
          {errors.nickname && <p className="text-red-500 text-xs mt-1">Nickname is required.</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2">Name</label>
          <input
            id="name"
            {...register('name')}
            placeholder="Enter your name"
            className="p-2 rounded border border-gray-700 focus:ring focus:ring-indigo-500 text-black"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="kakaoEmail" className="mb-2">Kakao Email</label>
          <input
            id="kakaoEmail"
            {...register('kakaoEmail')}
            defaultValue="user@example.com"  // Default value example
            placeholder="Enter your email"
            className="p-2 rounded border border-gray-700 focus:ring focus:ring-indigo-500 text-black"
          />
          {errors.kakaoEmail && <p className="text-red-500 text-xs mt-1">{errors.kakaoEmail.message}</p>}
        </div>
        <div> 
          <label className="mb-5 mt-1 font-bold text-sm text-blue-500 inline-block cursor-pointer"
              htmlFor="profileImg">
              프로필 이미지 추가
            </label>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="profileImg"
            />
        </div>
        <div className="flex flex-row justify-stretch items-stretch">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white mr-5">
            Submit
          </button>
          <button onClick={()=>navigate('/')} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white mr-10">
            Back
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default RegisterScreen