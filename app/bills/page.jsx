"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/api/bill")
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="w-[100%] h-min-[100vh] h-full bg-white ">
      <table className="border w-full" >
        <thead>
          <tr className="border-b-2 ">
            <th>Table No</th>
            <th>Items</th>
            <th>total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d) => (
              <tr className="p-2 border-b-2">
                <td className="px-2">{d.no}</td>
                <td className="px-2">
                  {d.items.map((name) => (
                    <>
                      <p>Item Name:-{name.name}</p>
                      <p>Item Quantity:-{name.quantity}</p>
                      <p>Item Price:-{name.price}</p>
                    </>
                  ))}
                </td>
                <td className="px-2">{d.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
