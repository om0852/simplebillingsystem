"use client"
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { itemPrices, priceList } from './items';

const Home = () => {
  const [customerName, setCustomerName] = useState('');
  const [total, setTotal] = useState(0);
  const [addedItems, setAddedItems] = useState([]);
  const [showBillSection, setShowBillSection] = useState(false);
  const [showItemSelection, setShowItemSelection] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleNewBill = () => {
    setShowBillSection(true);
  };

  const handleStartBill = () => {
    if (customerName) {
      setShowItemSelection(true);
    } else {
      alert('Please enter the table number.');
    }
  };

  const handleItemSelection = (event) => {
    setSelectedItem(event.target.value);
  };

  const addItemToBill = () => {
    const itemName = selectedItem;
    const price = itemPrices[itemName];

    if (!itemName) {
      alert('Please select an item.');
      return;
    }

    const existingItemIndex = addedItems.findIndex(item => item.name === itemName);
    let newAddedItems = [...addedItems];

    if (existingItemIndex >= 0) {
      newAddedItems[existingItemIndex].quantity += 1;
    } else {
      newAddedItems.push({ name: itemName, price: price, quantity: 1 });
    }

    setAddedItems(newAddedItems);
    updateTotal(newAddedItems);
    setSelectedItem(''); // Reset selected item after adding
  };

  const updateItemTotal = (itemName, quantity) => {
    const newAddedItems = addedItems.map(item =>
      item.name === itemName ? { ...item, quantity } : item
    );

    setAddedItems(newAddedItems);
    updateTotal(newAddedItems);
  };

  const updateTotal = (items) => {
    const newTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(newTotal);
  };

  const finalizeBill = () => {
    const doc = new jsPDF();

    doc.text("HOTEL BITTO", 75, 10);
    doc.text("Annabhau Sathe, Near Kalash Lawns, Kopargaon, Pincode-423601", 25, 20);
    doc.text(`TABLE NO.: ${customerName}`, 10, 30);

    const tableData = addedItems.map((item, index) => [
      index + 1, item.name, `${item.quantity} x $${item.price.toFixed(2)}`, `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    doc.autoTable({
      head: [['SR. NO.', 'ITEMS', 'QUANTITY', 'PRICE']],
      body: tableData,
      startY: 40,
    });

    doc.text(`TOTAL: $${total.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 10);
    doc.text("Thank you! VISIT AGAIN..", 10, doc.autoTable.previous.finalY + 20);

    doc.save('bill.pdf');

    // Reset the page for a new bill
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="header">
        <img src="https://png.pngtree.com/png-clipart/20230518/original/pngtree-kadai-paneer-curry-png-image_9164812.png" alt="Paneer Dish" className="header-img" />
        <h1>HOTEL BITTO</h1>
        <img src="https://png.pngtree.com/png-vector/20231013/ourmid/pngtree-aromatic-spice-delight-a-spicy-delicious-mutton-curry-highlighting-texture-set-png-image_10267066.png" alt="Non-Veg Dish" className="header-img" />
      </div>
      <h3>Annabhau Sathe, Near Kalash Lawns, Kopargaon, Pincode-423601</h3>
      <button onClick={handleNewBill}>New Bill</button>
      {showBillSection && (
        <BillSection
          customerName={customerName}
          setCustomerName={setCustomerName}
          handleStartBill={handleStartBill}
          showItemSelection={showItemSelection}
          handleItemSelection={handleItemSelection}
          addItemToBill={addItemToBill}
          selectedItem={selectedItem}
          addedItems={addedItems}
          updateItemTotal={updateItemTotal}
          total={total}
          finalizeBill={finalizeBill}
        />
      )}
    </div>
  );
};

const BillSection = ({ customerName, setCustomerName, handleStartBill, showItemSelection, handleItemSelection, addItemToBill, selectedItem, addedItems, updateItemTotal, total, finalizeBill }) => (
  <>
    {!showItemSelection && (
      <div id="customer-info">
        <label htmlFor="customer-name">TABLE NO.</label>
        <input
          type="text"
          id="customer-name"
          placeholder="Enter Table No."
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <button onClick={handleStartBill}>Start Bill</button>
      </div>
    )}
    {showItemSelection && (
      <ItemSelection
        handleItemSelection={handleItemSelection}
        addItemToBill={addItemToBill}
        selectedItem={selectedItem}
        addedItems={addedItems}
        updateItemTotal={updateItemTotal}
        total={total}
        finalizeBill={finalizeBill}
      />
    )}
  </>
);

const ItemSelection = ({ handleItemSelection, addItemToBill, selectedItem, addedItems, updateItemTotal, total, finalizeBill }) => (
  <div id="item-selection">
    <h2>Non-Veg Items</h2>
    <select id="non-veg-items" value={selectedItem} onChange={handleItemSelection}>
      <option value="" disabled>Select Non-Veg Item</option>
      {priceList.map((data)=>{
        return(
          <option value={data.dish}>{data.dish}:{data.price}</option>
        )
      })}
      {/* Add other Non-Veg options here */}
    </select>
    <button onClick={addItemToBill}>Add</button>

    <h2>Veg Items</h2>

    <div id="items-list">
      {addedItems.map((item) => (
        <div className="item-row" key={item.name}>
          <span className="item-name">{item.name}</span>
          <span className="item-price">${item.price.toFixed(2)}</span>
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

export default Home;
