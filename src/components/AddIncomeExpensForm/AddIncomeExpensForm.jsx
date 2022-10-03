import { IonButton, IonItem, IonLabel, IonList, IonInput } from '@ionic/react';
import React, { useState } from 'react'
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addIncomeExpensAction } from '../../Reducers/layersReducer';

const FormBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const AddIncomeExpensForm = ({ type, onDidDismiss, budgetName, currentLayerId }) => {
  const dispatch = useDispatch(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      currentLayerId: currentLayerId,
      budgetName: budgetName,
      amountType: type,
      amountName: name,
      amountValue: amount,
    }
    dispatch(addIncomeExpensAction(data));
    onDidDismiss();
  }
  return (
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem lines='full'>
          <IonLabel>
            {type} Name:
          </IonLabel>
          <IonInput
            required
            type='text'
            value={name}
            onIonChange={(e) => setName(e.detail.value)}
          />
        </IonItem>
        <IonItem lines='full'>
          <IonLabel>
            Amount:
          </IonLabel>
          <IonInput
            required
            type='number'
            step='0.01'
            value={amount}
            onIonChange={(e) => setAmount(e.detail.value)}
          />
        </IonItem>
        <FormBtns className="ma1">
          <IonButton fill='clear' color="danger" type='button' onClick={() => {
            setName("");
            setAmount(null);
            onDidDismiss()
          }}>Cancel</IonButton>
          <IonButton fill='clear' color="success" type='submit'>Add</IonButton>
        </FormBtns>
      </IonList>
    </form>
  )
}

export default AddIncomeExpensForm
