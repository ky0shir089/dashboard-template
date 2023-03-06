import axios from "axios";
import { useSelector } from "react-redux";

const useMenu = () => {
  const token = useSelector((state) => state.token.token);

  const getMenu = async (page) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/menu?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addMenu = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/store-menu`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showMenu = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/show-menu/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateMenu = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/update-menu/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteMenu = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/destroy-menu/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  };

  return { getMenu, addMenu, showMenu, updateMenu, deleteMenu };
};

export default useMenu;
