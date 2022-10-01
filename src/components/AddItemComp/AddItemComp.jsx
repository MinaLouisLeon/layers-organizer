import React, { useState } from 'react';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonButton
} from "@ionic/react";
import { add } from "ionicons/icons";
import AddLayerForm from '../AddLayerForm/AddLayerForm';
const AddItemComp = ({ currentLayerId }) => {
  const [addItemPopoverState, setAddItemPopoverState] = useState({
    isOpen: false,
    e: undefined
  })
  const [addLayerPopoverState, setAddLayerPopoverState] = useState({
    isOpen: false,
    e: undefined
  })
  const handleDismissAddItemPopover = () => {
    setAddItemPopoverState({
      isOpen: false,
      e: undefined
    })
  }
  const handleDismissAddLayerPopover = () => {
    setAddLayerPopoverState({
      isOpen: false,
      e: undefined
    })
  }
  return (
    <>
      {/* add items popover */}
      <IonPopover
        isOpen={addItemPopoverState.isOpen}
        onDidDismiss={() => setAddItemPopoverState({
          isOpen: false,
          e: undefined
        })}
      >
        <IonList className='ma1'>
          <IonItem lines='full' mode='ios' button onClick={(e) => {
            handleDismissAddItemPopover();
            setAddLayerPopoverState({
              isOpen: true,
              e: e.persist()
            });
          }}>
            <IonLabel>Add Layer</IonLabel>
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
