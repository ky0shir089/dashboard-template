import axios from "axios";
import { useSelector } from "react-redux";

const useModule = () => {
  const token = useSelector((state) => state.token.token);

  const getModule = async (page) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/module?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addModule = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/store-module`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showModule = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/show-module/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateModule = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/update-module/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteModule = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/setup-aplikasi/v1/destroy-module/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  };

  return { getModule, addModule, showModule, updateModule, deleteModule };
};

export default useModule;
