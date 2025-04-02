import { createSlice } from "@reduxjs/toolkit";


const userStroe = createSlice({
  name: "user",
  initialState: {
    address: ""
  },
  reducers: {
    setAddress(state, actions) {
      state.address = actions.payload;
    }
  }
});

const { setAddress } = userStroe.actions;

export { setAddress };

export default userStroe.reducer;
