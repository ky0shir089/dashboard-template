import axios from "axios";

const useLogin = () => {
  const siteVerify = async (token) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/siteverify`,
      { token: token }
    );
    return response;
  };

  const signIn = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      data
    );
    return response;
  };

  const changePassword = async (token, data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/v1/change-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const navDrawer = async (token, id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/navigation`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: id,
        },
      }
    );
    return response;
  };

  return { siteVerify, signIn, changePassword, navDrawer };
};

export default useLogin;
