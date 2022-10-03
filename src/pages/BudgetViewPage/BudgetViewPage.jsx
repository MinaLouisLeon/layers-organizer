import { IonAlert, IonButton, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import BackBtnComp from '../../components/BackBtnComp/BackBtnComp'
import AddIncomeExpensForm from '../../components/AddIncomeExpensForm/AddIncomeExpensForm';
import { toggleDidExistAction } from '../../Reducers/layersReducer';
import IncomeExpensItemComp from '../../components/IncomeExpensItemCom/IncomeExpensItemComp';
const BudgetItemsContainer = styled.div`
  position: fixed;
  top: 3.5rem;
  bottom: 8.5rem;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
`
const BudgetBottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8.5rem;
  border-top-style: solid;
  border-top-width: thin;
  border-top-color: #ccc;
`
const BudgetBtnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content : space-around;
`
const BudgetViewPage = () => {
  const pageData = useParams();
  const dispatch = useDispatch();
  const itemsObj = useSelector(state => state.layersReducer.layerStructure[pageData.currentLayerId].data[`budget-${pageData.budgetName}`]);
  const didExist = useSelector(state => state.layersReducer.didExist);
  const [popoverState, setPopoverState] = useState({
    isOpen: false,
    e: undefined,
    type: ""
  })
  const onDidDismiss = () => {
    setPopoverState({
      isOpen: false,
      e: undefined,
      type: ""
    })
  }
  return (
    <IonPage>
      <IonAlert
        isOpen={didExist}
        onDidDismiss={() => dispatch(toggleDidExistAction)}
        header={`${popoverState.type} Exist !`}
        buttons={['ok']}
      />
      <IonPopover
        isOpen={popoverState.isOpen}
        onDidDismiss={onDidDismiss}
      >
        <AddIncomeExpensForm
          type={popoverState.type}
          onDidDismiss={onDidDismiss}
          budgetName={pageData.budgetName}
          currentLayerId={pageData.currentLayerId}
        />
      </IonPopover>
      <IonHeader>
        <IonToolbar>
          <BackBtnComp />
          <IonTitle>{pageData.budgetName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <BudgetItemsContainer>
          {itemsObj.data && Object.keys(itemsObj.data).map((key) => {
            return (
              <IncomeExpensItemComp
                key={key}
                name={itemsObj.data[key].name}
                amount={itemsObj.data[key].amount}
                type={itemsObj.data[key].type}
                currentLayerId={pageData.currentLayerId}
                budgetName={pageData.budgetName}
              />
            )
          })}
        </BudgetItemsContainer>
        <BudgetBottomContainer className="pa2">
          <BudgetBtnsContainer className="mb1">
            <IonButton
              onClick={(e) => {
                setPopoverState({
                  isOpen: true,
                  e: e.persist(),
                  type: "Income"
                })
              }}
            >
              Add Income
            </IonButton>
            <IonButton
              onClick={(e) => setPopoverState({
                isOpen: true,
                e: e.persist(),
                type: "Expens"
              })}
            >
              Add Expens
            </IonButton>
          </BudgetBtnsContainer>
          <IonItem color="light" className='mt3 mr2 ml2 br2 shadow-2'>
            <IonLabel slot='start'>Total</IonLabel>
            <IonLabel slot='end' color={itemsObj.totalBudget >= 0 ? "success" : "danger"}>
              {itemsObj.totalBudget}
            </IonLabel>
          </IonItem>
        </BudgetBottomContainer>
      </IonContent>
    </IonPage>
  )
}

export default BudgetViewPage
