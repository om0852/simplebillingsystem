"use client"
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { drinkList, itemPrices, nonList, priceList } from './items';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [customerName, setCustomerName] = useState('');
  const [total, setTotal] = useState(0);
  const [addedItems, setAddedItems] = useState([]);
  const [showBillSection, setShowBillSection] = useState(false);
  const [showItemSelection, setShowItemSelection] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItem1, setSelectedItem1] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');

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
  const handleItemSelection1 = (event) => {
    setSelectedItem(event.target.value);
  };
  const handleItemSelection2 = (event) => {
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
  const addItemToBill1 = () => {
    const itemName = selectedItem1;
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
    setSelectedItem1(''); // Reset selected item after adding
  };
  const addItemToBill2 = () => {
    const itemName = selectedItem2;
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
    setSelectedItem2(''); // Reset selected item after adding
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

  const finalizeBill = (e) => {
    e.preventDefault()
    axios.post("/api/bill",{no:customerName,items:addedItems,total})
    const doc = new jsPDF();

    doc.text("HOTEL BITTO", 75, 10);
    doc.text("Annabhau Sathe, Near Kalash Lawns, Kopargaon, Pincode-423601", 25, 20);
    doc.text(`TABLE NO.: ${customerName}`, 10, 30);

    const tableData = addedItems.map((item, index) => [
      index + 1, item.name, `${item.quantity} x ₹${item.price.toFixed(2)}`, `₹${(item.price * item.quantity).toFixed(2)}`
    ]);

    doc.autoTable({
      head: [['SR. NO.', 'ITEMS', 'QUANTITY', 'PRICE']],
      body: tableData,
      startY: 40,
    });

    doc.text(`TOTAL: ₹${total.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 10);
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
      <button className='mx-4' ><Link href="/bills">History</Link></button>
      {showBillSection && (
        <BillSection
          customerName={customerName}
          setCustomerName={setCustomerName}
          handleStartBill={handleStartBill}
          showItemSelection={showItemSelection}
          handleItemSelection={handleItemSelection}
          handleItemSelection1={handleItemSelection1}
          handleItemSelection2={handleItemSelection2}
          addItemToBill={addItemToBill}
          selectedItem={selectedItem}
          selectedItem1={selectedItem1}
          selectedItem2={selectedItem2}
          addedItems={addedItems}
          updateItemTotal={updateItemTotal}
          total={total}
          finalizeBill={finalizeBill}
        />
      )}
    </div>
  );
};

const BillSection = ({ customerName, setCustomerName, handleStartBill, showItemSelection, handleItemSelection,handleItemSelection1,handleItemSelection2, addItemToBill, selectedItem,selectedItem1,selectedItem2, addedItems, updateItemTotal, total, finalizeBill }) => (
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
        handleItemSelection1={handleItemSelection1}
        handleItemSelection2={handleItemSelection2}
        addItemToBill={addItemToBill}
        selectedItem={selectedItem}
        selectedItem1={selectedItem1}
        selectedItem2={selectedItem2}
        addedItems={addedItems}
        updateItemTotal={updateItemTotal}
        total={total}
        finalizeBill={finalizeBill}
      />
    )}
  </>
);

const ItemSelection = ({ handleItemSelection,handleItemSelection1,handleItemSelection2, addItemToBill, selectedItem,selectedItem1,selectedItem2, addedItems, updateItemTotal, total, finalizeBill }) => (
  <div id="item-selection">
    <h2 className='mt-4'>Non-Veg Items</h2>
    <select id="non-veg-items" value={selectedItem} onChange={handleItemSelection}>
      <option value="" disabled>Select Non-Veg Item</option>
      {nonList.map((data,index)=>{
        return(
          <option key={index} value={data.dish}>{data.dish}:{data.price}</option>
        )
      })}
      {/* Add other Non-Veg options here */}
    </select>
    <button onClick={addItemToBill}>Add</button>
    <h2 className='mt-4'>Veg Items</h2>
    <select id="non-veg-items" value={selectedItem1} onChange={handleItemSelection1}>
      <option value="" disabled>Select Veg Item</option>
      {priceList.map((data,index)=>{
        return(
          <option key={index} value={data.dish}>{data.dish}:{data.price}</option>
        )
      })}
      {/* Add other Non-Veg options here */}
    </select>
    <button onClick={addItemToBill}>Add</button>
    <h2 className='mt-4'>Drink Items</h2>
    <select id="non-veg-items" value={selectedItem2} onChange={handleItemSelection2}>
      <option value="" disabled>Select Drink Item</option>
      {drinkList.map((data,index)=>{
        return(
          <option key={index} value={data.dish}>{data.dish}:{data.price}</option>
        )
      })}
      {/* Add other Non-Veg options here */}
    </select>
    <button onClick={addItemToBill}>Add</button>


    <div id="items-list">
      {addedItems.map((item,index) => (
        <div key={index} className="item-row" >
          <span className="item-name">{item.name}</span>
          <span className="item-price">₹{item.price.toFixed(2)}</span>
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
    <h2>Total: ₹{total.toFixed(2)}</h2>
    <button onClick={finalizeBill}>Finalize Bill</button>
  </div>
);

export default Home;
