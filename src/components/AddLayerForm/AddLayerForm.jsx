import { IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { addLayerAction } from '../../Reducers/layersReducer';

const FormBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const AddLayerForm = ({ onDidDismiss, currentLayerId, budgetName }) => {
  const dispatch = useDispatch();
  const [addedLayerName, setAddedLayerName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      currentLayerId: currentLayerId,
      addedLayerName: addedLayerName
    }
    dispatch(addLayerAction(data))
    onDidDismiss();
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <IonLabel>
              Layer Name:
            </IonLabel>
            <IonInput
              required
              type='text'
              pattern='[(A-Z)|(a-z)|(0-9)|(\s)]+'
              value={addedLayerName}
              onIonChange={(e) => setAddedLayerName(e.detail.value)}
              title="No Special Characters"
            />
          </IonItem>
          <FormBtns className="ma1">
            <IonButton fill='clear' color="danger" type='button' onClick={() => {
              setAddedLayerName("");
              onDidDismiss()
            }}>Cancel</IonButton>
            <IonButton fill='clear' color="success" type='submit'>Add</IonButton>
          </FormBtns>
        </IonList>
      </form>
    </>
  )
}

export default AddLayerForm
