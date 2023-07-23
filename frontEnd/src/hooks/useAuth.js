import { useQuery} from "react-query";
import { makeRequest } from "../axios";

const logout = () => {
  return makeRequest.post('/auth/logout');
};

export const useLogout = () => 
{
  return useQuery('logoutUser', logout);
};
