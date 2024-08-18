import React from 'react';

// The ItemSelection component
const ItemSelection = ({ addItemToBill, addedItems, updateItemTotal, total, finalizeBill }) => (
  <div id="item-selection">
    <h2>Non-Veg Items</h2>
    <select id="non-veg-items" onChange={(e) => addItemToBill(e.target.value)}>
      <option value="">Select Non-Veg Item</option> {/* Default option */}
      <option value="MUTTON SUKKA">MUTTON SUKKA - $110</option>
      <option value="MUTTON FRY">MUTTON FRY - $120</option>
      <option value="MUTTON MASALA">MUTTON MASALA - $110</option>
      {/* Add other Non-Veg options here */}
    </select>

    <h2>Veg Items</h2>
    <select id="veg-items" onChange={(e) => addItemToBill(e.target.value)}>
      <option value="">Select Veg Item</option> {/* Default option */}
      <option value="Shahi Paneer">Shahi Paneer - $220</option>
      <option value="Paneer Malai Kofta">Paneer Malai Kofta - $220</option>
      <option value="Paneer Kaju Masala">Paneer Kaju Masala - $220</option>
      {/* Add other Veg options here */}
    </select>

    <h2>Drinks</h2>
    <select id="drinks-items" onChange={(e) => addItemToBill(e.target.value)}>
      <option value="">Select Drink</option> {/* Default option */}
      <option value="Tea">Tea - $10</option>
      <option value="Milk">Milk - $25</option>
      <option value="Coffee">Coffee - $20</option>
      {/* Add other Drink options here */}
    </select>

    <div id="items-list">
      {addedItems.map((item) => (
        <div className="item-row" key={item.name}>
          <span className="item-name">{item.name}</span>
          <span className="item-price">${item.price?.toFixed(2)}</span> {/* Optional chaining */}
          <select
            className="quantity-select"
            value={item.quantity}
            onChange={(e) => updateItemTotal(item.name, parseInt(e.target.value))}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
    <h2>Total: ${total.toFixed(2)}</h2>
    <button onClick={finalizeBill}>Finalize Bill</button>
  </div>
);

export default ItemSelection;
    {/* <select id="veg-items" value={selectedItem} onChange={handleItemSelection}>
      <option value="">Select Veg Item</option>
      <option value="Shahi Paneer">Shahi Paneer - $220</option>
      <option value="Paneer Malai Kofta">Paneer Malai Kofta - $220</option>
      <option value="Paneer Kaju Masala">Paneer Kaju Masala - $220</option>
      {/* Add other Veg options here */}
    //   </select>
    //   <button onClick={addItemToBill}>Add</button>
  
    //   <h2>Drinks</h2>
    //   <select id="drinks-items" value={selectedItem} onChange={handleItemSelection}>
    //     <option value="">Select Drink</option>
    //     <option value="Tea">Tea - $10</option>
    //     <option value="Milk">Milk - $25</option>
    //     <option value="Coffee">Coffee - $20</option>
    //     {/* Add other Drink options here */}
    //   </select>
    //   <button onClick={addItemToBill}>Add</button> */}
  