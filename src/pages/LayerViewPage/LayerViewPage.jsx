//args : currentLayerName , currentLayerId

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import AddItemComp from '../../components/AddItemComp/AddItemComp'
import ItemsViewComp from '../../components/itemsViewComp/ItemsViewComp'
import { useParams } from "react-router-dom";
import BackBtnComp from '../../components/BackBtnComp/BackBtnComp';
const LayerViewPage = () => {
  const pageData = useParams();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <BackBtnComp />
          <IonTitle>
            {pageData.currentLayerName}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ItemsViewComp
          currentLayerId={pageData.currentLayerId}
        />
        <AddItemComp
          currentLayerId={pageData.currentLayerId}
        />
      </IonContent>
    </IonPage>
  )
}

export default LayerViewPage
