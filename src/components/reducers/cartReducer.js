import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Lenovo IdeaPad 3', desc: "Lenovo IdeaPad 3 (2021) | 11th Gen Intel Core i5 |15.6 Full HD Thin and Light Laptop | 4-Side Narrow Bezel (8GB/512GB SSD/Windows 10/MS Office 2019/Backlit Keyboard/Arctic Grey/1.65Kg), 82H8014BIN", price:1142,img:Item1},
        {id:2,title:'MS Book', desc: "Microsoft Surface Book 2 Intel Core i7 8th Gen 15 inch Touchscreen 2-in-1 Laptop (16GB/512GB/Windows 10 Pro/Integrated Graphics/Platinum/1.642kg), FUX-00021", price:3843,img: Item2},
        {id:3,title:'Dell Inspiron', desc:"Dell Inspiron 3501 15.6 (39.62 cms) FHD AG Display Laptop (i3-1005G1 / 8GB / 1TB / Integrated Graphics / Win 10 + MSO / Softmint) D560421WIN9S ",price:600,img: Item3},
        {id:4,title:'HP 15 ', desc: "HP 15 Intel Pentium Gold 6405U Processor Entry Level 15.6-inch (39.62 cms) FHD Laptop (4GB/1TB/Win 10/Jet Black/1.74kg), 15s-du1052tu", price:400,img:Item4},
        {id:5,title:'ASUS Celeron ', desc: "ASUS Celeron Dual Core - (4 GB/1 TB HDD/Windows 10 Home) X515MA-BR004T Thin and Light Laptop (15.6 inch, Transparent Silver, 1.80 Kg", price:385,img: Item5},
        {id:6,title:'AVITA LIBER', desc: "AVITA LIBER V14 NS14A8INF562-SG 14-inch Laptop (Core i5-10210U/8GB/512GB SSD/FHD/Windows 10 Home/Intel UHD Graphics 620/MS Office 365/ 1.25KG), Space Grey",price:886,img: Item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer