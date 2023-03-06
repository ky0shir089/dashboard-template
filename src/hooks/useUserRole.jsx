import axios from "axios";
import { useSelector } from "react-redux";

const useUserRole = () => {
  const token = useSelector((state) => state.token.token);

  const getUserRole = async (id, page) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/setup-aplikasi/v1/user-role?page=${page}`,
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

  const getListRole = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/list-role`,
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

  const addUserRole = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/store-user-role`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showUserRole = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/show-user-role/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateUserRole = async (id, status) => {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/setup-aplikasi/v1/update-user-role/${id}`,
      {
        user_role_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteUserRole = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/setup-aplikasi/v1/destroy-user-role/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  };

  return {
    getUserRole,
    getListRole,
    addUserRole,
    showUserRole,
    updateUserRole,
    deleteUserRole,
  };
};

export default useUserRole;
