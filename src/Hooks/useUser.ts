import { useEffect, useState } from "react";
export interface User {
  Avt?: string;
  Name?: string;
  UserType?: string;
  Username?: string;
}
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
const useUser = () => {
  const [state, setState] = useState<UserState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // const fetchUserProfile = async () => {
    //   try {
    //     const token = localStorage.getItem('Token');
    //     const response = await axios.get('/api/profile', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     setUser(response.data);
    //     console.log(response);
    //   } catch (err: any) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchUserProfile();
    //   }, []);

    const user = JSON.parse(localStorage.getItem("User") || "null");
    setState({ user, loading: false, error: null });
  }, []);

  const logout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    setState({ user: null, loading: false, error: null });
  };

  return { ...state, logout, setState };
};

export default useUser;
