import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteIncomeExpensAction } from '../../Reducers/layersReducer';
const IncomeExpensItemComp = ({ name, type, amount, currentLayerId, budgetName }) => {
  const dispatch = useDispatch(null);
  const handleDelete = () => {
    let data = {
      currentLayerId: currentLayerId,
      budgetName: budgetName,
      amountType: type,
      amountName: name,
      amountValue: amount
    }
    dispatch(deleteIncomeExpensAction(data));
  }
  return (
    <div className='ma3'>
      <IonItemSliding className='br4 shadow-2'>
        <IonItem lines='none'>
          <IonLabel slot='start'>{name}</IonLabel>
          <IonLabel slot='end' color={type === "Income" ? "success" : "danger"} >
            {amount}
          </IonLabel>
        </IonItem>
        <IonItemOptions side='end'>
          <IonItemOption color="danger" onClick={() => handleDelete()}>
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </div>
  )
}

export default IncomeExpensItemComp
