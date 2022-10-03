import React from 'react'
import { useSelector } from 'react-redux'
import BudgetItemComp from './BudgetItemComp/BudgetItemComp';
import LayerItemComp from './LayerItemComp/LayerItemComp';
import TodoItemComp from './TodoItemComp/TodoItemComp';

const ItemsViewComp = ({ currentLayerId }) => {
  const itemsObj = useSelector(state => state.layersReducer.layerStructure[currentLayerId].data);
  const handleItemsView = (item) => {
    switch (item.type) {
      case "layer":
        return (<LayerItemComp name={item.name} itemLayerId={item.layerId} currentLayerId={currentLayerId} />)
      case "todo":
        return (<TodoItemComp name={item.name} currentLayerId={currentLayerId} isChecked={item.isChecked} />)
      case "budget":
        return (<BudgetItemComp name={item.name} currentLayerId={currentLayerId} />)
      default:
        return <></>
    }
  }
  return (
    <div className='mt4'>
      {/* layer item */}
      {itemsObj && Object.keys(itemsObj).map((key) => {
        return (<div key={key}>
          {handleItemsView(itemsObj[key])}
        </div>)
      })}
    </div>
  )
}

export default ItemsViewComp
