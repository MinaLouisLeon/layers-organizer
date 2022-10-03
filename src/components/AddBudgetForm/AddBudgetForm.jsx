import { IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addBudgetAction } from '../../Reducers/layersReducer';

const FormBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const AddBudgetForm = ({ onDidDismiss, currentLayerId }) => {
  const dispatch = useDispatch(null);
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBudgetAction({
      budgetName: name,
      currentLayerId: currentLayerId
    }));
    setName("");
    onDidDismiss();
  }
  return (
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem>
          <IonLabel>Budget Name:</IonLabel>
          <IonInput
            required
            type='text'
            value={name}
            onIonChange={(e) => setName(e.detail.value)}
          />
        </IonItem>
        <FormBtns className="ma1">
          <IonButton fill='clear' color="danger" type='button' onClick={() => {
            setName("");
            onDidDismiss()
          }}>Cancel</IonButton>
          <IonButton fill='clear' color="success" type='submit'>Add</IonButton>
        </FormBtns>
      </IonList>
    </form>
  )
}

export default AddBudgetForm
