import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadedImages: [],
  imageName: [],
};

const tuSlice = createSlice({
  name: 'tuReducer',
  initialState,
  reducers: {
    setUploadedImages(state, action) {
      state.uploadedImages = action.payload;
    },
    setimageName(state, action) {
      state.imageName = action.payload;
    },
  },
});

export const { setUploadedImages, setimageName } = tuSlice.actions;
export default tuSlice.reducer;
