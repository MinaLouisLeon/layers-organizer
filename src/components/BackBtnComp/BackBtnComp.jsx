import { IonButton, IonIcon } from '@ionic/react'
import React from 'react'
import { arrowBack } from "ionicons/icons";
import { useHistory } from 'react-router-dom';
const BackBtnComp = () => {
  const history = useHistory(null);
  return (
    <IonButton onClick={() => { history.goBack() }} slot="start" fill='clear'>
      <IonIcon icon={arrowBack} slot="icon-only" />
    </IonButton>
  )
}

export default BackBtnComp
