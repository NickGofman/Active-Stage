import { makeRequest } from "../axios";
import { useQuery } from "react-query";
export const useMusicianProfileData=(userId)=>{
  return useQuery(['getProfile'], fetchMusicianProfileData(userId));
}
const fetchMusicianProfileData=(userId)=>{
  return makeRequest(`/user/profile/${userId}`);
}