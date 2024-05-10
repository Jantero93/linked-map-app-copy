// src/features/example/exampleSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  value: number;
}

const initialState: ExampleState = {
  value: 0
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: { payload: number }) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = exampleSlice.actions;

export default exampleSlice.reducer;