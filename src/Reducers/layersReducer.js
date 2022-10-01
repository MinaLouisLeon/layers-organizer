import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layerStructure: {
    MainLayer: {
      data: null,
    },
  }
}

const collectDataForDelete = (state, layerIdToDel) => {
  let layersIdToDelArr = [layerIdToDel];
  let layerToDelData = state.layerStructure[layerIdToDel].data;
  let finalLayersToDelArr = [];
  if (layerToDelData !== null) {
    Object.keys(layerToDelData).map((key) => {
      if (layerToDelData[key].type === "layer") {
        layersIdToDelArr.push(layerToDelData[key].layerId)
      }
    })
    finalLayersToDelArr = layersIdToDelArr;
    //while start
    while (layersIdToDelArr.length !== 0) {
      let newArr = [];
      layersIdToDelArr.map((item) => {
        if (item !== layerIdToDel) {
          layerToDelData = state.layerStructure[item].data;
          if (layerToDelData !== null) {
            Object.keys(layerToDelData).map((key) => {
              if (layerToDelData[key].type === "layer") {
                newArr.push(layerToDelData[key].layerId)
              }
            })
          }
        }
      })
      layersIdToDelArr = newArr;
      newArr.map((item) => {
        finalLayersToDelArr.push(item)
      })
    }
  } else {
    finalLayersToDelArr = layersIdToDelArr;
  }
  return finalLayersToDelArr
}

const startDelLayers = (state, layerIdToDel, finalLayersToDelArr) => {
  let index = null;
  Object.keys(state.layerStructure.MainLayer.data).map((key) => {
    if (state.layerStructure.MainLayer.data[key].layerId === finalLayersToDelArr[0]) {
      index = key
    }
  })
  if (index !== null) {
    delete state.layerStructure.MainLayer.data[index]
  }
  finalLayersToDelArr.map((item) => {
    delete state.layerStructure[item];
  })
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
    deleteLayerAction: (state, action) => {
      // args : layerIdToDel
      let layerIdToDel = action.payload
      let finalLayersToDelArr = collectDataForDelete(state, layerIdToDel);
      startDelLayers(state, layerIdToDel, finalLayersToDelArr);
    }
  }
})

export const { addLayerAction, deleteLayerAction } = layersReducer.actions;
export default layersReducer.reducer;