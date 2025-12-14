import { useState } from 'react';
import Swal from 'sweetalert2';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  FileText,
  Sparkles,
  ArrowRight,
  Headphones,
  HelpCircle,
  Shield,
  Zap,
  Heart,
  Loader2
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const contactInfo = [
    { icon: <Mail className="text-blue-400" size={20} />, label: 'Email', value: 'support@eventhub.com', action: 'mailto:support@eventhub.com' },
    { icon: <Phone className="text-green-400" size={20} />, label: 'Phone', value: '+1 (555) 123-4567', action: 'tel:+15551234567' },
    { icon: <MapPin className="text-yellow-400" size={20} />, label: 'Office', value: 'San Francisco, CA', action: null },
    { icon: <Clock className="text-purple-400" size={20} />, label: 'Response Time', value: 'Within 24 hours', action: null },
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'technical', label: 'Technical Support', icon: '🔧' },
    { value: 'billing', label: 'Billing & Payments', icon: '💳' },
    { value: 'events', label: 'Event Management', icon: '🎫' },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: '🌟' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: `
          <div class="text-left">
            <p class="text-white mb-2">Please fix the following errors:</p>
            <ul class="list-disc pl-4 text-gray-300 space-y-1">
              ${Object.values(errors).map(error => `<li>${error}</li>`).join('')}
            </ul>
          </div>
        `,
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Swal.fire({
        title: 'Message Sent Successfully!',
        html: `
          <div class="text-center">
            <div class="mb-4 text-5xl">🎉</div>
            <p class="text-white mb-2">Thank you for reaching out!</p>
            <p class="text-gray-300">We'll get back to you within 24 hours.</p>
          </div>
        `,
        icon: 'success',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#10b981',
        customClass: {
          popup: 'rounded-2xl border border-emerald-500/30'
        }
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Something Went Wrong!',
        text: 'Please try again later or use alternative contact methods.',
        icon: 'error',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'rounded-2xl border border-red-500/30'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300";
  const errorInputClasses = "w-full bg-gray-800/50 backdrop-blur-sm border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2";

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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              {`Have questions, feedback, or partnership ideas? We'd love to hear from you!`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                    <Headphones size={24} className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Contact Information</h2>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                      <div className="p-2 bg-gray-800/50 rounded-lg">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400">{info.label}</p>
                        <p className="font-semibold text-white">{info.value}</p>
                      </div>
                      {info.action && (
                        <a
                          href={info.action}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors"
                        >
                          <ArrowRight size={16} className="text-blue-400" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Categories */}
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                    <HelpCircle size={24} className="text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Support Categories</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {supportCategories.map((category, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${formData.category === category.value
                        ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/50'
                        : 'bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/30'
                        }`}
                    >
                      <span className="text-2xl mb-2">{category.icon}</span>
                      <span className="text-xs font-medium text-center">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-xl rounded-3xl p-6 border border-yellow-500/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-xl">
                      <Zap size={20} className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Average Response Time</p>
                      <p className="text-xl font-bold text-white">2.4 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Support Satisfaction</p>
                      <p className="text-xl font-bold text-white">98.7%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-xl">
                    <MessageSquare size={24} className="text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        <User size={16} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? errorInputClasses : inputClasses}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Mail size={16} />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? errorInputClasses : inputClasses}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>
                      <FileText size={16} />
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? errorInputClasses : inputClasses}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="text-red-400 text-sm mt-2">{errors.subject}</p>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className={labelClasses}>
                        <MessageSquare size={16} />
                        Your Message
                      </label>
                      <span className="text-xs text-gray-500">{formData.message.length}/500</span>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      maxLength="500"
                      className={`${errors.message ? errorInputClasses : inputClasses} resize-none`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message}</p>}
                  </div>

                  <div className="pt-6 border-t border-gray-700/50">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                          <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                      <Shield size={14} className="text-green-400" />
                      Your information is secure and will never be shared
                    </p>
                  </div>
                </form>
              </div>

              {/* Additional Resources */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/faq"
                  className="group flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all"
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <HelpCircle size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">FAQ Center</p>
                    <p className="text-sm text-gray-400">Find quick answers</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="/documentation"
                  className="group flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all"
                >
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <FileText size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Documentation</p>
                    <p className="text-sm text-gray-400">Developer guides & API</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="/status"
                  className="group flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-yellow-500/50 transition-all"
                >
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Zap size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">System Status</p>
                    <p className="text-sm text-gray-400">Live service updates</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
              <Heart size={16} className="text-yellow-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                {` We're Here to Help`}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any issues or questions.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all">
                Schedule a Call
              </button>
              <button className="px-6 py-3 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white font-medium rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all">
                Live Chat Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;