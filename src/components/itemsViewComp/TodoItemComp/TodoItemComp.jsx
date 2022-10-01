import { IonCheckbox, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import React from 'react'
import { useDispatch } from 'react-redux'
import { checkTodoAction, deleteTodoAction } from '../../../Reducers/layersReducer';
const TodoItemComp = ({ name, currentLayerId, isChecked }) => {
  const dispatch = useDispatch(null);
  return (
    <div className='ma3'>
      <IonItemSliding className='br4 shadow-2'>
        <IonItem lines='none'>
          <IonCheckbox checked={isChecked} slot='start' onIonChange={(e) => dispatch(checkTodoAction({
            todoName: name,
            isChecked: e.detail.checked,
            currentLayerId: currentLayerId
          }))} />
          <IonLabel>{name}</IonLabel>
        </IonItem>
        <IonItemOptions side='end'>
          <IonItemOption color="danger" onClick={() => {
            dispatch(deleteTodoAction({
              todoName: name,
              currentLayerId: currentLayerId
            }))
          }}>Delete</IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </div>
  )
}

export default TodoItemComp
