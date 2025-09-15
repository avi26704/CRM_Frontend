import { useState } from "react";
import axios from "axios";

export default function DataIngestion() {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [order, setOrder] = useState({ orderId: "", customerEmail: "", amount: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitCustomer = async () => {
    if (!customer.email) return setMessage("Customer email is required");
    setLoading(true);
    setMessage("");
    try {
      await axios.post(process.env.REACT_APP_API_CUSTOMER_URL, customer);
      setMessage("Customer accepted!");
      setCustomer({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit customer");
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async () => {
    if (!order.orderId || !order.customerEmail || !order.amount) {
      return setMessage("Order ID, Customer Email, and Amount are required");
    }
    setLoading(true);
    setMessage("");
    try {
      const payload = { ...order, amount: parseFloat(order.amount) };
      await axios.post(process.env.REACT_APP_API_ORDER_URL, payload);
      setMessage("Order accepted!");
      setOrder({ orderId: "", customerEmail: "", amount: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Data Ingestion</h2>

      <div className="mb-6 p-4 border rounded shadow-sm">
        <h3 className="font-semibold mb-2">Add Customer</h3>
        <input type="text" placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="border p-2 rounded w-full mb-2"/>
        <input type="email" placeholder="Email (required)" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="border p-2 rounded w-full mb-2"/>
        <input type="text" placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="border p-2 rounded w-full mb-2"/>
        <button onClick={submitCustomer} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{loading ? "Submitting..." : "Add Customer"}</button>
      </div>

      <div className="mb-6 p-4 border rounded shadow-sm">
        <h3 className="font-semibold mb-2">Add Order</h3>
        <input type="text" placeholder="Order ID (required)" value={order.orderId} onChange={(e) => setOrder({ ...order, orderId: e.target.value })} className="border p-2 rounded w-full mb-2"/>
        <input type="email" placeholder="Customer Email (required)" value={order.customerEmail} onChange={(e) => setOrder({ ...order, customerEmail: e.target.value })} className="border p-2 rounded w-full mb-2"/>
        <input type="number" placeholder="Amount (required)" value={order.amount} onChange={(e) => setOrder({ ...order, amount: e.target.value })} className="border p-2 rounded w-full mb-2"/>
        <button onClick={submitOrder} disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{loading ? "Submitting..." : "Add Order"}</button>
      </div>

      {message && <p className="text-gray-700 mt-2">{message}</p>}
    </div>
  );
}
