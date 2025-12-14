import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import {
    CreditCard,
    Lock,
    Calendar,
    User,
    Shield,
    Sparkles,
    Receipt,
    Building,
    MapPin,
    ArrowLeft,
    ArrowRight,
    Loader2,
    AlertCircle,
    Eye,
    EyeOff
} from 'lucide-react';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state || {};

    const [paymentDetails, setPaymentDetails] = useState({
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paymentOption: formData.paymentOption || '',
        saveCard: false
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [showCvv, setShowCvv] = useState(false);
    const [errors, setErrors] = useState({});

    const paymentOptions = [
        { value: 'creditCard', label: 'Credit Card', icon: '💳', color: 'from-blue-500 to-cyan-500' },
        { value: 'debitCard', label: 'Debit Card', icon: '💳', color: 'from-green-500 to-emerald-500' },
        { value: 'paypal', label: 'PayPal', icon: '🔗', color: 'from-yellow-500 to-amber-500' },
        { value: 'upi', label: 'UPI', icon: '📱', color: 'from-purple-500 to-pink-500' },
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!paymentDetails.cardHolderName.trim()) newErrors.cardHolderName = "Card holder name is required";

        if (!paymentDetails.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
        else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "Card number must be 16 digits";

        if (!paymentDetails.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
        else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) newErrors.expiryDate = "Use MM/YY format";

        if (!paymentDetails.cvv.trim()) newErrors.cvv = "CVV is required";
        else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) newErrors.cvv = "CVV must be 3-4 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = value;

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '');
            formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
            formattedValue = formattedValue.substring(0, 19); // 16 digits + 3 spaces
        }

        // Format expiry date
        if (name === 'expiryDate') {
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length >= 2) {
                formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
            }
            formattedValue = formattedValue.substring(0, 5);
        }

        // Format CVV (max 4 digits)
        if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').substring(0, 4);
        }

        setPaymentDetails({
            ...paymentDetails,
            [name]: formattedValue
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handlePayment = () => {
        if (!validateForm()) {
            Swal.fire({
                title: 'Validation Error',
                html: `
                    <div class="text-left">
                        <p class="text-white mb-2">Please correct the following:</p>
                        <ul class="list-disc pl-4 text-gray-300 space-y-1">
                            ${Object.values(errors).map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `,
                icon: 'error',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'rounded-2xl border border-red-500/30'
                }
            });
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            const transactionId = 'TXN' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
            const bookingId = 'BK' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0');

            Swal.fire({
                title: 'Payment Successful!',
                html: `
                    <div class="text-center">
                        <div class="mb-4 text-5xl">🎉</div>
                        <p class="text-white mb-2">Thank you for your payment!</p>
                        <div class="bg-gray-800/50 rounded-xl p-4 mt-4">
                            <p class="text-sm text-gray-400 mb-1">Transaction ID</p>
                            <p class="text-lg font-mono text-emerald-300">${transactionId}</p>
                            <p class="text-sm text-gray-400 mt-2 mb-1">Booking ID</p>
                            <p class="text-lg font-mono text-blue-300">${bookingId}</p>
                        </div>
                        <p class="text-gray-300 text-sm mt-4">A confirmation email has been sent to your registered email address.</p>
                    </div>
                `,
                icon: 'success',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#10b981',
                customClass: {
                    popup: 'rounded-2xl border border-emerald-500/30'
                }
            }).then(() => {
                // Save booking to localStorage
                const newBooking = {
                    bookingId: bookingId,
                    eventName: formData.venueName,
                    startDate: formData.bookingStartDate,
                    venueName: formData.venueName,
                    ticketPrice: formData.fare,
                    ticketType: 'Premium Booking',
                    transactionId: transactionId,
                    bookingDate: new Date().toISOString()
                };

                const existingBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
                localStorage.setItem('myBookings', JSON.stringify([...existingBookings, newBooking]));

                navigate('/myBookings');
            });
            setIsProcessing(false);
        }, 2000);
    };

    const selectedOption = paymentOptions.find(opt => opt.value === paymentDetails.paymentOption);

    const inputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300";
    const errorInputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300";
    const errorMessageClasses = "text-red-400 text-sm mt-2 flex items-center gap-2";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                Complete Your Booking
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className=" bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                                Payment
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Secure payment for your event booking
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Booking Summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
                                <div className="p-6 sm:p-8">
                                    {/* Payment Method Selection */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                                                <CreditCard size={24} className="text-blue-400" />
                                            </div>
                                            <h2 className="text-xl font-bold text-white">Payment Method</h2>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                            {paymentOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setPaymentDetails(prev => ({ ...prev, paymentOption: option.value }))}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${paymentDetails.paymentOption === option.value
                                                            ? `bg-gradient-to-br ${option.color} border-2 border-white/50`
                                                            : 'bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/30'
                                                        }`}
                                                >
                                                    <span className="text-2xl mb-2">{option.icon}</span>
                                                    <span className="text-xs font-medium text-center">{option.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Card Details Form */}
                                    {selectedOption && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className=" text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                    <User size={16} />
                                                    Card Holder Name
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        name="cardHolderName"
                                                        value={paymentDetails.cardHolderName}
                                                        onChange={handleChange}
                                                        className={`pl-10 ${errors.cardHolderName ? errorInputClasses : inputClasses}`}
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                {errors.cardHolderName && (
                                                    <p className={errorMessageClasses}>
                                                        <AlertCircle size={14} />
                                                        {errors.cardHolderName}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className=" text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                    <CreditCard size={16} />
                                                    Card Number
                                                </label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        value={paymentDetails.cardNumber}
                                                        onChange={handleChange}
                                                        className={`pl-10 ${errors.cardNumber ? errorInputClasses : inputClasses}`}
                                                        placeholder="1234 5678 9012 3456"
                                                    />
                                                </div>
                                                {errors.cardNumber && (
                                                    <p className={errorMessageClasses}>
                                                        <AlertCircle size={14} />
                                                        {errors.cardNumber}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className=" text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                        <Calendar size={16} />
                                                        Expiry Date
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="expiryDate"
                                                            value={paymentDetails.expiryDate}
                                                            onChange={handleChange}
                                                            className={`pl-10 ${errors.expiryDate ? errorInputClasses : inputClasses}`}
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    {errors.expiryDate && (
                                                        <p className={errorMessageClasses}>
                                                            <AlertCircle size={14} />
                                                            {errors.expiryDate}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className=" text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                        <Lock size={16} />
                                                        CVV
                                                    </label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                        <input
                                                            type={showCvv ? "text" : "password"}
                                                            name="cvv"
                                                            value={paymentDetails.cvv}
                                                            onChange={handleChange}
                                                            className={`pl-10 pr-10 ${errors.cvv ? errorInputClasses : inputClasses}`}
                                                            placeholder="123"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowCvv(!showCvv)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                                        >
                                                            {showCvv ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    </div>
                                                    {errors.cvv && (
                                                        <p className={errorMessageClasses}>
                                                            <AlertCircle size={14} />
                                                            {errors.cvv}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center p-4 bg-gray-800/30 rounded-xl">
                                                <input
                                                    id="saveCard"
                                                    type="checkbox"
                                                    checked={paymentDetails.saveCard}
                                                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, saveCard: e.target.checked }))}
                                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700/50"
                                                />
                                                <label htmlFor="saveCard" className="ml-2  text-sm text-gray-300">
                                                    Save card details for future payments
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Booking Summary & Actions */}
                        <div className="space-y-6">
                            {/* Booking Summary */}
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                                        <Receipt size={24} className="text-green-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Booking Summary</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl">
                                        <Building size={20} className="text-blue-400" />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400">Venue</p>
                                            <p className="text-white font-medium truncate">{formData.venueName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl">
                                        <Calendar size={20} className="text-green-400" />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400">Booking Date</p>
                                            <p className="text-white font-medium">{formData.bookingStartDate}</p>
                                            {formData.bookingTime && (
                                                <p className="text-sm text-gray-400">{formData.bookingTime}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl">
                                        <MapPin size={20} className="text-yellow-400" />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400">Location</p>
                                            <p className="text-white font-medium">{formData.city}, {formData.state}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-700/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Subtotal</span>
                                            <span className="text-white">${formData.fare}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Service Fee</span>
                                            <span className="text-white">$49.99</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Tax</span>
                                            <span className="text-white">${(formData.fare * 0.08).toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                                            <span className="text-lg font-bold text-white">Total</span>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                                ${(parseFloat(formData.fare) + 49.99 + (formData.fare * 0.08)).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security & Actions */}
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30">
                                        <Shield size={20} className="text-green-400" />
                                        <div>
                                            <p className="font-semibold text-white">Secure Payment</p>
                                            <p className="text-sm text-gray-300">256-bit SSL encryption</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing || !selectedOption}
                                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={20} />
                                                Pay ${(parseFloat(formData.fare) + 49.99 + (formData.fare * 0.08)).toFixed(2)}
                                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => navigate(-1)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all"
                                    >
                                        <ArrowLeft size={18} />
                                        <span>Back to Booking</span>
                                    </button>
                                </div>
                            </div>

                            {/* Payment Icons */}
                            <div className="flex items-center justify-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                                <div className="text-2xl">💳</div>
                                <div className="text-2xl">🔒</div>
                                <div className="text-2xl">🛡️</div>
                                <div className="text-2xl">✓</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;