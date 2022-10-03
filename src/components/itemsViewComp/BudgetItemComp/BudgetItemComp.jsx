import React from 'react'
import {
  IonItemSliding,
  IonItem,
  IonIcon,
  IonLabel,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { card } from 'ionicons/icons';
import { deleteBudgetAction } from "../../../Reducers/layersReducer";
const BudgetItemComp = ({ name, currentLayerId }) => {
  const history = useHistory(null);
  const dispatch = useDispatch(null);
  const handleItemClicked = () => {
    history.push(`/Budget/${name}/${currentLayerId}`);
  }
  const handleDelete = () => {
    dispatch(deleteBudgetAction({
      name: name,
      currentLayerId: currentLayerId
    }))
  }
  return (
    <div className='ma3'>
      <IonItemSliding className="br4 shadow-2">
        <IonItem lines='none' button onClick={() => handleItemClicked()}>
          <IonIcon slot='start' color='secondary' icon={card} />
          <IonLabel>{name}</IonLabel>
        </IonItem>
        <IonItemOptions side='end'>
          <IonItemOption color="danger" onClick={handleDelete}>
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </div>
  )
}

export default BudgetItemComp
