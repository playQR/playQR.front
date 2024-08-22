import { useEffect, useState } from "react";
import { axiosSemiSecureAPI } from "../../axios/index";
import { Member } from "../../promotion/types/common";
import { handleApiError } from "../error";
import axios from "axios";
import store from "../../store/store";

const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<Member>({
    id: -1,
    name: "",
    nickname: "",
    profileImg: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { useAuthStorePersist } = store;
  const { accessToken, accessTokenExpireTime } = useAuthStorePersist(
    (state) => ({
      accessToken: state.accessToken,
      accessTokenExpireTime: state.accessTokenExpireTime,
    })
  );

  const authenticate = async () => {
    if (accessToken !== null && accessTokenExpireTime !== null) {
      try {
        const response = await axiosSemiSecureAPI.get("/api/members");
        if (response.data.isSuccess) {
          setIsAuthenticated(true);
          setMemberInfo(response.data?.result);
        } else {
          handleApiError(response.data?.code);
          setIsAuthenticated(false);
          setMemberInfo({ id: -1, name: "", nickname: "", profileImg: "" });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          handleApiError(error);
        } else {
          handleApiError(error);
          setIsAuthenticated(false);
          setMemberInfo({ id: -1, name: "", nickname: "", profileImg: "" });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsAuthenticated(false);
      setMemberInfo({ id: -1, name: "", nickname: "", profileImg: "" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return { isAuthenticated, memberInfo, isLoading };
};

export default useCheckAuth;
