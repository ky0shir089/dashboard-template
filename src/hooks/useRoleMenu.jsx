import axios from "axios";
import { useSelector } from "react-redux";

const useRoleMenu = () => {
  const token = useSelector((state) => state.token.token);

  const getRoleMenu = async (page) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/setup-aplikasi/v1/role-menu?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const getListMenu = async (id) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/list-menu`,
      {
        role_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addRoleMenu = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/store-role-menu`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showRoleMenu = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/show-role-menu/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateRoleMenu = async (id, status) => {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/setup-aplikasi/v1/update-role-menu/${id}`,
      {
        rolemenu_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteRoleMenu = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/setup-aplikasi/v1/destroy-role-menu/${id}`,
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
    getRoleMenu,
    getListMenu,
    addRoleMenu,
    showRoleMenu,
    updateRoleMenu,
    deleteRoleMenu,
  };
};

export default useRoleMenu;
