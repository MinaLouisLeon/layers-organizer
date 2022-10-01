import React from 'react'
import { IonItem, IonItemSliding, IonIcon, IonLabel, IonItemOption, IonItemOptions } from '@ionic/react'
import { folder } from 'ionicons/icons'
import { useHistory } from "react-router-dom";
const LayerItemComp = ({ name, itemLayerId }) => {
  const history = useHistory(null);
  const handleItemClicked = () => {
    history.push(`/Layer/${name}/${itemLayerId}`)
  }
  return (
    <div className='ma3'>
      <IonItemSliding className="br4 shadow-2">
        <IonItem lines='none' button onClick={() => handleItemClicked()}>
          <IonIcon slot='start' color='warning' icon={folder} />
          <IonLabel>{name}</IonLabel>
        </IonItem>
        <IonItemOptions side='end'>
          <IonItemOption color="danger">
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </div>
  )
}

export default LayerItemComp
