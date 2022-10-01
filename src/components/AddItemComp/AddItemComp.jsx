import React, { useState } from 'react';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { add } from "ionicons/icons";
import AddLayerForm from '../AddLayerForm/AddLayerForm';
import AddTodoFrom from '../AddTodoForm/AddTodoFrom';
const AddItemComp = ({ currentLayerId }) => {
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
  return (
    <>
      {/* add items popover */}
      <IonPopover
        isOpen={addItemPopoverState.isOpen}
        onDidDismiss={handleDismissAddItemPopover}
      >
        <IonList className='ma1'>
          {/* add layer  */}
          <IonItem lines='full' mode='ios' button onClick={(e) => {
            handleDismissAddItemPopover();
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
            setAddTodoPopoverState({
              isOpen: true,
              e: e.persist()
            })
          }}>
            <IonLabel>Add TODO</IonLabel>
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
