import axios from "axios";
import { useSelector } from "react-redux";

const useRole = () => {
  const token = useSelector((state) => state.token.token);

  const getRole = async (page) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/role?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addRole = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/store-role`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showRole = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/show-role/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateRole = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/update-role/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteRole = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/destroy-role/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  };

  return { getRole, addRole, showRole, updateRole, deleteRole };
};

export default useRole;
