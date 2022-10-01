import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import AddItemComp from '../../components/AddItemComp/AddItemComp';
import ItemsViewComp from '../../components/itemsViewComp/ItemsViewComp';
const MainLayer = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Layer Organizer
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ItemsViewComp
          currentLayerId="MainLayer"
        />
        <AddItemComp
          currentLayerId="MainLayer"
        />
      </IonContent>
    </IonPage>
  )
}

export default MainLayer
