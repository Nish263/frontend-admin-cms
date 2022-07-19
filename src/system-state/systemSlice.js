import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAdminSidebar: false,
  showModal: false,
};

const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showAdminSidebar = !state.showAdminSidebar;
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

const { reducer, actions } = systemSlice;

export const { toggleSidebar, toggleModal } = actions;
export default reducer;
