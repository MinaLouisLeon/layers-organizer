import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import MainLayer from "./pages/MainLayer/MainLayer";
import LayerViewPage from "./pages/LayerViewPage/LayerViewPage";
import BudgetViewPage from "./pages/BudgetViewPage/BudgetViewPage";
setupIonicReact();

const App: React.FC = () => (
 <IonApp>
  <IonReactRouter>
   <IonRouterOutlet>
    <Route exact path="/Layer/:currentLayerName/:currentLayerId">
     <LayerViewPage />
    </Route>
    <Route exact path="/Budget/:budgetName/:currentLayerId">
     <BudgetViewPage />
    </Route>
    <Route exact path="/">
     <MainLayer />
    </Route>
   </IonRouterOutlet>
  </IonReactRouter>
 </IonApp>
);

export default App;
