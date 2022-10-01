import React from 'react'
import { useSelector } from 'react-redux'
import LayerItemComp from './LayerItemComp/LayerItemComp';

const ItemsViewComp = ({ currentLayerId }) => {
  const itemsObj = useSelector(state => state.layersReducer.layerStructure[currentLayerId].data);
  const handleItemsView = (type, name, itemLayerId) => {
    switch (type) {
      case "layer":
        return (<LayerItemComp name={name} itemLayerId={itemLayerId} />)
      default:
        return <></>
    }
  }
  return (
    <div className='mt4'>
      {/* layer item */}
      {itemsObj && Object.keys(itemsObj).map((key) => {
        return (<div key={key}>
          {handleItemsView(itemsObj[key].type, itemsObj[key].name, itemsObj[key].layerId)}
        </div>)
      })}
    </div>
  )
}

export default ItemsViewComp
