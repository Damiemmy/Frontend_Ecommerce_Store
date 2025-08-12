import React, { useEffect, useState } from 'react'
import { BaseUrl } from '@/Api/Api'
import Api from '@/Api/Api'
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { ToastContainer, toast } from 'react-toastify';

const InCart = ({ incartProducts, setGetsubtotal, item, setIncartproducts }) => {
    const [quantities, setQuantities] = useState(item.quantity)
    const { noOfCartItems, setNoOfCartItems } = useContext(ProductContext)
    
    const UpdateCart = async (productId) => {
        try {
            const Response = await Api.patch('Update_cart/', {
                'quantities': quantities,
                'product_id': productId
            });

            console.log(Response.data.data); // See what backend sends

            // 🔹 Update the local cart products array with new product data
            const updatedCart = incartProducts.map((itemed) =>
                itemed.id === productId ? Response.data.data : itemed
            );

            setIncartproducts(updatedCart); // Keep cart state in sync

            // 🔹 Calculate and update total quantity in cart
            const totalQuantity = updatedCart.reduce(
                (acc, curr) => acc + (curr.quantity || 0),
                0
            );

            setNoOfCartItems(totalQuantity);

            // Optional: log updated value right away
            console.log("Updated total items in cart:", totalQuantity);
            const UpdatedTotal=updatedCart.reduce(
                (acc,curr)=> acc + curr.total,0)
            setGetsubtotal(UpdatedTotal)
            toast.success('item quantity updated successfully')

        } catch (err) {
            console.log(err.message);
        }
    }

    const Delete_item = async (itemId) => {
        try {
            const Response = await Api.post('Delete_item/', { 'item_id': itemId })
            console.log(Response.data)
             const updatedCart = incartProducts.filter((itemed) =>
                itemed.id !== itemId
            );

            setIncartproducts(updatedCart); // Keep cart state in sync

            // 🔹 Calculate and update total quantity in cart
            const totalQuantity = updatedCart.reduce(
                (acc, curr) => acc + (curr.quantity || 0),
                0
            );

            setNoOfCartItems(totalQuantity);

            // Optional: log updated value right away
            console.log("Updated total items in cart:", totalQuantity);
            const UpdatedTotal=updatedCart.reduce(
                (acc,curr)=> acc + curr.total,0)
            setGetsubtotal(UpdatedTotal)
            toast.success('item removed from Cart successfully')
        } catch (err) {
            console.log(err.message)
        }
    }

       
    return (
        <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-lg shadow-md"
        >
            <img
                src={`${BaseUrl}${item.product.image}`}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-md"
            />
            <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>

                {/* UPDATED LINE: Quantity Input with Plus/Minus Buttons */}
                <div className="flex items-center mt-2">
                    <button
                        disabled={quantities === 1 || quantities < 1}
                        onClick={() => setQuantities(quantities - 1)}
                        className="bg-gray-200 text-gray-700 rounded-l-md px-3 py-1 hover:bg-gray-300"
                    >
                        −
                    </button>
                    <input
                        type="number"
                        min={1}
                        value={quantities}
                        onChange={(e) => setQuantities(Number(e.target.value))}
                        className="w-12 text-black text-center border-t border-b border-gray-300 focus:outline-none text-sm"
                    />
                    <button
                        onClick={() => setQuantities(quantities + 1)}
                        className="bg-gray-200 text-gray-700 rounded-r-md px-3 py-1 hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>

                <p className="text-purple-700 font-bold mt-1">${item.product.price}</p>
            </div>
            <button
                onClick={() => UpdateCart(item.id)}
                className="text-blue-500 hover:text-blue-700 font-semibold text-sm"
            >
                Update
            </button>
            <button 
                onClick={() => Delete_item(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold text-sm"
            >
                Remove
            </button>
        </div>
    )
}

export default InCart
