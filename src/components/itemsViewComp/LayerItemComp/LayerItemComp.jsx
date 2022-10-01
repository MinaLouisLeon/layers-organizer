import React from 'react'
import { IonItem, IonItemSliding, IonIcon, IonLabel, IonItemOption, IonItemOptions } from '@ionic/react'
import { folder } from 'ionicons/icons'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteLayerAction } from '../../../Reducers/layersReducer';
const LayerItemComp = ({ name, itemLayerId, currentLayerId }) => {
  const history = useHistory(null);
  const dispatch = useDispatch(null);
  const handleItemClicked = () => {
    history.push(`/Layer/${name}/${itemLayerId}`)
  }
  const handleDelete = () => {
    dispatch(deleteLayerAction(itemLayerId))
  }
  return (
    <div className='ma3'>
      <IonItemSliding className="br4 shadow-2">
        <IonItem lines='none' button onClick={() => handleItemClicked()}>
          <IonIcon slot='start' color='warning' icon={folder} />
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

export default LayerItemComp
