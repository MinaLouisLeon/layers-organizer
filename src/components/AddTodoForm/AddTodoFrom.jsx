import { IonList, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { addTodoAction } from '../../Reducers/layersReducer';
const FormBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const AddTodoFrom = ({ onDidDismiss, currentLayerId }) => {
  const dispatch = useDispatch(null);
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodoAction({
      todoName: name,
      currentLayerId: currentLayerId
    }))
    onDidDismiss();
  }
  return (
    <form onSubmit={handleSubmit} >
      <IonList>
        <IonItem lines='full'>
          <IonLabel>TODO:</IonLabel>
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

export default AddTodoFrom
