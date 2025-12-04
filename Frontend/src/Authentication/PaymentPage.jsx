import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state || {};

    const [paymentDetails, setPaymentDetails] = useState({
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paymentOption: formData.paymentOption || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value
        });
    };

    const handlePayment = () => {
        // Simulate payment success
        const transactionId = Math.floor(Math.random() * 1000000000);
        Swal.fire({
            title: 'Payment Successful',
            text: `Your transaction ID is ${transactionId}`,
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            // Redirect back to the event booking or homepage
            navigate('/');
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex justify-center items-center py-8">
            <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-6 md:p-8">
                <h2 className="text-3xl font-semibold text-center text-indigo-800 mb-6">Payment</h2>
                <div className="space-y-5">
                    {/* Display selected payment method */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Selected Payment Option:</span>
                        <span className="text-indigo-600 font-bold">{formData.paymentOption}</span>
                    </div>

                    {/* Card Holder Name */}
                    <div>
                        <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                        <input
                            type="text"
                            id="cardHolderName"
                            name="cardHolderName"
                            value={paymentDetails.cardHolderName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Card Number */}
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* CVV */}
                    <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Payment Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            onClick={handlePayment}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
