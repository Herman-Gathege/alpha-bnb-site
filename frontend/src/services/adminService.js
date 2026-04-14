//frontend/src/services/adminService.js
import api from "../api/axiosConfig";

///////////////////////////////////////////////////////
//////////////////// LISTINGS /////////////////////////
///////////////////////////////////////////////////////

export const getListings = async () => {
  const res = await api.get("/admin/listings");
  return res.data;
};

export const createListing = async (data) => {
  const res = await api.post("/admin/listings", data);
  return res.data;
};

export const updateListing = async (id, data) => {
  const res = await api.put(`/admin/listings/${id}`, data);
  return res.data;
};

export const toggleListing = async (id) => {
  const res = await api.patch(`/admin/listings/${id}/toggle`);
  return res.data;
};

///////////////////////////////////////////////////////
//////////////////// BOOKINGS /////////////////////////
///////////////////////////////////////////////////////

export const getBookings = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};

export const approveBooking = async (id) => {
  const res = await api.patch(`/admin/bookings/${id}/approve`);
  return res.data;
};

export const rejectBooking = async (id) => {
  const res = await api.patch(`/admin/bookings/${id}/reject`);
  return res.data;
};

export const cancelBooking = async (id) => {
  const res = await api.patch(`/admin/bookings/${id}/cancel`);
  return res.data;
};

///////////////////////////////////////////////////////
//////////////////// BLOCK DATES //////////////////////
///////////////////////////////////////////////////////

export const blockDates = async (data) => {
  const res = await api.post("/admin/block-dates", data);
  return res.data;
};