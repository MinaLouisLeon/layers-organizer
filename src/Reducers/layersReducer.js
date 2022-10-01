import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layerStructure: {
    MainLayer: {
      data: null,
    }
  },
}

const layersReducer = createSlice({
  name: "layersReducer",
  initialState,
  reducers: {
    addLayerAction: (state, action) => {
      //args : addedLayerName,currentLayerId
      let addedLayerName = action.payload.addedLayerName;
      let currentLayerId = action.payload.currentLayerId;
      let testObj = state.layerStructure[currentLayerId].data
      let length = null;
      if (testObj === null) {
        length = 0;
      } else {
        length = Object.keys(state.layerStructure[currentLayerId].data).length;
      }
      state.layerStructure = {
        ...state.layerStructure,
        [`${currentLayerId}-${addedLayerName}`]: {
          data: null
        }
      }
      state.layerStructure[currentLayerId].data = {
        ...state.layerStructure[currentLayerId].data,
        [length]: {
          name: addedLayerName,
          type: "layer",
          props: null,
          layerId: `${currentLayerId}-${addedLayerName}`
        }
      }
    },
  }
})

export const { addLayerAction } = layersReducer.actions;
export default layersReducer.reducer;