//frontend/src/services/listingsService.js
import api from "../api/axiosConfig";

export const getPublicListings = async () => {
  const res = await api.get("/listings");
  return res.data;
};