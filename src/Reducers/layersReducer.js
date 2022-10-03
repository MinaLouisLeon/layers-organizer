import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layerStructure: {
    MainLayer: {
      data: {},
    },
  },
  didExist: false
}

const collectDataForDelete = (state, layerIdToDel) => {
  let layersIdToDelArr = [layerIdToDel];
  let layerToDelData = state.layerStructure[layerIdToDel].data;
  let finalLayersToDelArr = [];
  if (layerToDelData !== null && layerToDelData !== undefined) {
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
          if (layerToDelData !== null && layerToDelData !== undefined) {
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
    toggleDidExistAction: (state, action) => {
      state.didExist = !state.didExist;
    },
    addLayerAction: (state, action) => {
      //args : addedLayerName,currentLayerId
      let addedLayerName = action.payload.addedLayerName;
      let currentLayerId = action.payload.currentLayerId;
      let testObj = state.layerStructure[currentLayerId].data
      let layerExist = false;
      let objkey = `layer-${addedLayerName}`
      if (testObj !== null && testObj !== undefined) {
        if (Object.keys(testObj).includes(objkey)) {
          layerExist = true;
        }
      }
      if (layerExist) {
        state.didExist = true;
      } else {
        state.layerStructure = {
          ...state.layerStructure,
          [`${currentLayerId}-${addedLayerName}`]: {
            data: null
          }
        }
        state.layerStructure[currentLayerId].data = {
          ...state.layerStructure[currentLayerId].data,
          [objkey]: {
            name: addedLayerName,
            type: "layer",
            props: null,
            layerId: `${currentLayerId}-${addedLayerName}`
          }
        }
      }
    },
    deleteLayerAction: (state, action) => {
      // args : layerIdToDel
      let layerIdToDel = action.payload
      let finalLayersToDelArr = collectDataForDelete(state, layerIdToDel);
      startDelLayers(state, layerIdToDel, finalLayersToDelArr);
    },
    addTodoAction: (state, action) => {
      //args : todoName,currentLayerId
      let todoName = action.payload.todoName;
      let currentLayerId = action.payload.currentLayerId;
      let objkey = `todo-${todoName}`
      let testObj = state.layerStructure[currentLayerId].data
      let todoExist = false;
      if (testObj !== null && testObj !== undefined) {
        if (Object.keys(testObj).includes(objkey)) {
          todoExist = true;
        }
      }
      if (todoExist) {
        state.didExist = true;
      } else {
        state.layerStructure[currentLayerId].data = {
          ...state.layerStructure[currentLayerId].data,
          [objkey]: {
            name: todoName,
            isChecked: false,
            type: "todo"
          }
        }
      }
    },
    checkTodoAction: (state, action) => {
      //args : todoName,isChecked,currentLayerId
      let todoName = action.payload.todoName;
      let isChecked = action.payload.isChecked;
      let currentLayerId = action.payload.currentLayerId;
      let testObj = state.layerStructure[currentLayerId].data
      let index = null;
      Object.keys(testObj).map((key) => {
        if (testObj[key].type === "todo" && testObj[key].name === todoName) {
          index = key;
        }
      })
      state.layerStructure[currentLayerId].data[index].isChecked = isChecked;
    },
    deleteTodoAction: (state, action) => {
      //args : todoName,currentLayerId
      let todoName = action.payload.todoName;
      let currentLayerId = action.payload.currentLayerId;
      let objkey = `todo-${todoName}`;
      delete state.layerStructure[currentLayerId].data[objkey]
    },
    addBudgetAction: (state, action) => {
      // args : budgetName,currentLayerId
      let budgetName = action.payload.budgetName;
      let currentLayerId = action.payload.currentLayerId;
      let objkey = `budget-${budgetName}`;
      let budgetExist = false;
      let testObj = state.layerStructure[currentLayerId].data;
      if (testObj !== null && testObj !== undefined) {
        budgetExist = Object.keys(testObj).includes(objkey)
      }
      if (budgetExist) {
        state.didExist = !state.didExist
      } else {
        state.layerStructure[currentLayerId].data = {
          ...state.layerStructure[currentLayerId].data,
          [objkey]: {
            name: budgetName,
            type: "budget",
            data: null,
            totalBudget: 0
          }
        }
      }
    },
    deleteBudgetAction: (state, action) => {
      // args : name , currentLayerId
      let budgetName = action.payload.name;
      let currentLayerId = action.payload.currentLayerId;
      let objkey = `budget-${budgetName}`;
      delete state.layerStructure[currentLayerId].data[objkey]
    },
    addIncomeExpensAction: (state, action) => {
      //args : currentLayerId,budgetName,amountType,amountName,amountValue
      let currentLayerId = action.payload.currentLayerId;
      let budgetName = action.payload.budgetName;
      let amountType = action.payload.amountType;
      let amountName = action.payload.amountName;
      let amountValue = action.payload.amountValue;
      let totalBudget = state.layerStructure[currentLayerId].data[`budget-${budgetName}`].totalBudget
      let amountNameExist = false;
      let testObj = state.layerStructure[currentLayerId].data[`budget-${budgetName}`].data;
      if (testObj !== null && testObj !== undefined) {
        amountNameExist = Object.keys(testObj).includes(`${amountType}-${amountName}`);
      }
      if (amountNameExist) {
        state.didExist = true;
      } else {
        state.layerStructure[currentLayerId].data[`budget-${budgetName}`].data = {
          ...state.layerStructure[currentLayerId].data[`budget-${budgetName}`].data,
          [`${amountType}-${amountName}`]: {
            type: amountType,
            name: amountName,
            amount: amountValue
          }
        }
        if (amountType === "Income") {
          state.layerStructure[currentLayerId].data[`budget-${budgetName}`].totalBudget = parseFloat(totalBudget) + parseFloat(amountValue);
        } else {
          state.layerStructure[currentLayerId].data[`budget-${budgetName}`].totalBudget = parseFloat(totalBudget) - parseFloat(amountValue);
        }
      }
    },
    deleteIncomeExpensAction: (state, action) => {

    }
  }
})

export const {
  toggleDidExistAction,
  addLayerAction,
  deleteLayerAction,
  addTodoAction,
  checkTodoAction,
  deleteTodoAction,
  addBudgetAction,
  deleteBudgetAction,
  addIncomeExpensAction
} = layersReducer.actions;
export default layersReducer.reducer;