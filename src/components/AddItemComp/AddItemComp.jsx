import React, { useState } from 'react';
import {
  IonAlert,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useSelector, useDispatch } from 'react-redux';
import AddLayerForm from '../AddLayerForm/AddLayerForm';
import AddTodoFrom from '../AddTodoForm/AddTodoFrom';
import AddBudgetForm from '../AddBudgetForm/AddBudgetForm';
import { toggleDidExistAction } from '../../Reducers/layersReducer';
const AddItemComp = ({ currentLayerId }) => {
  const dispatch = useDispatch(null);
  const didExist = useSelector(state => state.layersReducer.didExist);
  const [alertMsg, setAlertMsg] = useState("");
  const [addItemPopoverState, setAddItemPopoverState] = useState({
    isOpen: false,
    e: undefined
  })
  const [addLayerPopoverState, setAddLayerPopoverState] = useState({
    isOpen: false,
    e: undefined
  })
  const [addTodoPopoverState, setAddTodoPopoverState] = useState({
    isOpen: false,
    e: undefined
  })
  const [addBudgetPopoverState, setAddBudgetPopoverState] = useState({
    isOpen: false,
    e: undefined
  })
  // dismiss add item popover
  const handleDismissAddItemPopover = () => {
    setAddItemPopoverState({
      isOpen: false,
      e: undefined
    })
  }
  // dismiss add layer popocer
  const handleDismissAddLayerPopover = () => {
    setAddLayerPopoverState({
      isOpen: false,
      e: undefined
    })
  }
  // dismiss add TODO popover
  const handleDismissAddTodoPopover = () => {
    setAddTodoPopoverState({
      isOpen: false,
      e: undefined
    })
  }
  //dismiss add budget popover
  const handleDismissAddBudgetPopover = () => {
    setAddBudgetPopoverState({
      isOpen: false,
      e: undefined
    })
  }
  return (
    <>
      <IonAlert
        isOpen={didExist}
        onDidDismiss={() => dispatch(toggleDidExistAction())}
        header={alertMsg}
        buttons={['ok']}
      />
      {/* add items popover */}
      <IonPopover
        isOpen={addItemPopoverState.isOpen}
        onDidDismiss={handleDismissAddItemPopover}
      >
        <IonList className='ma1'>
          {/* add layer  */}
          <IonItem lines='full' mode='ios' button onClick={(e) => {
            handleDismissAddItemPopover();
            setAlertMsg("Layer Exist !");
            setAddLayerPopoverState({
              isOpen: true,
              e: e.persist()
            });
          }}>
            <IonLabel>Add Layer</IonLabel>
          </IonItem>
          {/* add todo */}
          <IonItem lines='full' mode='ios' button onClick={(e) => {
            handleDismissAddItemPopover();
            setAlertMsg("TODO Exist !");
            setAddTodoPopoverState({
              isOpen: true,
              e: e.persist()
            })
          }}>
            <IonLabel>Add TODO</IonLabel>
          </IonItem>
          {/* add budget */}
          <IonItem lines='full' mode='ios' button onClick={(e) => {
            handleDismissAddItemPopover();
            setAlertMsg("Budget Exist !");
            setAddBudgetPopoverState({
              isOpen: true,
              e: e.persist()
            });
          }}>
            <IonLabel>
              Add Budget
            </IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
      {/* add layer popover */}
      <IonPopover
        isOpen={addLayerPopoverState.isOpen}
        onDidDismiss={handleDismissAddLayerPopover}
      >
        <AddLayerForm
          onDidDismiss={handleDismissAddLayerPopover}
          currentLayerId={currentLayerId}
        />
      </IonPopover>
      {/* add TODO popover */}
      <IonPopover
        isOpen={addTodoPopoverState.isOpen}
        onDidDismiss={handleDismissAddTodoPopover}
      >
        <AddTodoFrom
          onDidDismiss={handleDismissAddTodoPopover}
          currentLayerId={currentLayerId}
        />
      </IonPopover>
      {/* add budget popover */}
      <IonPopover
        isOpen={addBudgetPopoverState.isOpen}
        onDidDismiss={handleDismissAddBudgetPopover}
      >
        <AddBudgetForm
          onDidDismiss={handleDismissAddBudgetPopover}
          currentLayerId={currentLayerId}
        />
      </IonPopover>
      {/* add items fab button */}
      <IonFab horizontal='end' vertical='top' slot='fixed' edge={true}>
        <IonFabButton onClick={(e) => setAddItemPopoverState({
          isOpen: true,
          e: e.persist()
        })}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </>
  )
}

export default AddItemComp
