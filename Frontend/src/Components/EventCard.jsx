import { useEffect, useState } from 'react';
import { api } from "../Services/api.js";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
	Calendar,
	MapPin,
	Ticket,
	Share2,
	Download,
	Edit,
	Trash2,
	Search,
	Sparkles,
	Heart,
	ArrowRight,
	FileText,
} from 'lucide-react';


// -------------------------------
// Simple Card Component (Reusable)
// -------------------------------
const SmallEventCard = ({ event }) => {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
			<div className="h-48 overflow-hidden">
				<img
					src={event.imageUrl || "https://via.placeholder.com/400x200"}
					alt={event.eventName}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="p-6">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
					{event.eventName}
				</h3>

				<p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
					{event.description || "No description available."}
				</p>

				<div className="flex items-center justify-between">
					<span className="text-blue-600 dark:text-blue-400 font-bold">
						${event.price ?? "Free"}
					</span>

					<Link
						to={`/event/${event._id || event.id}`}
						className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};

// -------------------------------
// MAIN EVENT CARD PAGE
// -------------------------------
const EventCard = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [priceFilter, setPriceFilter] = useState('all');
	const [sortBy, setSortBy] = useState('date');
	const [favorites, setFavorites] = useState(new Set());


	const categories = [
		'All Categories', 'Technology', 'Music', 'Business',
		'Arts', 'Sports', 'Workshop', 'Conference', 'Networking'
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(api.url("/event/getEvent"));
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				setData(result);

				// Load favorites from localStorage
				const savedFavorites = localStorage.getItem('eventFavorites');
				if (savedFavorites) {
					setFavorites(new Set(JSON.parse(savedFavorites)));
				}
			} catch (error) {
				console.error("Error fetching events:", error);
				Swal.fire({
					icon: 'error',
					title: 'Failed to Load Events',
					text: 'Please check your connection and try again.',
					background: '#1f2937',
					color: '#fff',
					confirmButtonColor: '#ef4444',
					customClass: { popup: 'rounded-2xl border border-red-500/30' }
				});
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleDeleteEvent = async (eventName) => {
		const result = await Swal.fire({
			title: 'Delete Event?',
			html: `
                <div class="text-center">
                    <div class="mb-4 text-5xl">🗑️</div>
                    <p class="text-white">Are you sure you want to delete this event?</p>
                    <p class="text-gray-300 text-sm mt-2">This action cannot be undone.</p>
                </div>
            `,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#ef4444',
			cancelButtonColor: '#6b7280',
			confirmButtonText: 'Yes, delete it',
			cancelButtonText: 'Cancel',
			background: '#1f2937',
			color: '#fff',
			customClass: {
				popup: 'rounded-2xl border border-red-500/30'
			}
		});

		if (result.isConfirmed) {
			try {
				const response = await fetch(api.url(`/event/deleteEvent/${eventName}`), {
					method: 'DELETE',
				});

				if (response.ok) {
					Swal.fire({
						title: 'Deleted!',
						text: 'Event has been successfully deleted.',
						icon: 'success',
						background: '#1f2937',
						color: '#fff',
						confirmButtonColor: '#10b981',
						timer: 2000,
						showConfirmButton: false,
						customClass: { popup: 'rounded-2xl border border-emerald-500/30' }
					});

					const updatedResponse = await fetch(api.url("/event/getEvent"));
					if (updatedResponse.ok) {
						const updatedResult = await updatedResponse.json();
						setData(updatedResult);
					}
				} else {
					throw new Error('Failed to delete event');
				}
			} catch (error) {
				console.error("Error deleting event:", error);
				Swal.fire({
					icon: 'error',
					title: 'Delete Failed',
					text: 'Could not delete the event. Please try again.',
					background: '#1f2937',
					color: '#fff',
					confirmButtonColor: '#ef4444'
				});
			}
		}
	};

	const handleBookEvent = async (event) => {
		const result = await Swal.fire({
			title: 'Book Your Ticket',
			html: `
                <div class="text-left space-y-4">
                    <div class="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg">
                        <h3 class="font-bold text-white mb-2">${event.eventName}</h3>
                        <div class="text-sm text-gray-300 space-y-1">
                            <div class="flex items-center gap-2">
                                <Calendar size={14} />
                                ${new Date(event.startDate).toLocaleDateString()}
                            </div>
                            <div class="flex items-center gap-2">
                                <MapPin size={14} />
                                ${event.venueName}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input type="text" id="attendee-name" class="swal2-input" placeholder="Enter your name" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input type="email" id="attendee-email" class="swal2-input" placeholder="your@email.com" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Number of Tickets</label>
                        <input type="number" id="ticket-quantity" class="swal2-input" value="1" min="1" max="10">
                    </div>
                </div>
            `,
			showCancelButton: true,
			confirmButtonText: 'Confirm Booking',
			confirmButtonColor: '#3b82f6',
			background: '#1f2937',
			color: '#fff',
			customClass: {
				popup: 'rounded-2xl border border-blue-500/30',
				input: 'bg-gray-800 border-gray-700 text-white'
			},
			preConfirm: () => {
				const name = Swal.getPopup().querySelector('#attendee-name').value;
				const email = Swal.getPopup().querySelector('#attendee-email').value;
				const quantity = Swal.getPopup().querySelector('#ticket-quantity').value;

				if (!name || !email) {
					Swal.showValidationMessage('Please fill in all required fields');
				}
				return { name, email, quantity };
			}
		});

		if (result.isConfirmed) {
			Swal.fire({
				title: 'Booking Confirmed!',
				html: `
                    <div class="text-center">
                        <div class="mb-4 text-5xl">🎉</div>
                        <p class="text-white mb-2">Thank you, ${result.value.name}!</p>
                        <p class="text-gray-300">Your booking for <strong>${event.eventName}</strong> has been confirmed.</p>
                        <p class="text-sm text-gray-400 mt-4">Confirmation details sent to ${result.value.email}</p>
                    </div>
                `,
				icon: 'success',
				background: '#1f2937',
				color: '#fff',
				confirmButtonColor: '#10b981',
				customClass: { popup: 'rounded-2xl border border-emerald-500/30' }
			});
		}
	};

	const handleShare = async (event) => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: event.eventName,
					text: event.eventDescription,
					url: window.location.href
				});
			} catch (error) {
				console.error(error)
				handleCopyToClipboard(event);
			}
		} else {
			handleCopyToClipboard(event);
		}
	};

	const handleCopyToClipboard = async (event) => {
		try {
			await navigator.clipboard.writeText(`${event.eventName}: ${event.eventDescription} - ${window.location.href}`);
			Swal.fire({
				title: 'Copied!',
				text: 'Event link copied to clipboard',
				icon: 'success',
				background: '#1f2937',
				color: '#fff',
				confirmButtonColor: '#3b82f6',
				timer: 2000,
				showConfirmButton: false,
				customClass: { popup: 'rounded-2xl border border-blue-500/30' }
			});
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const handleDownloadImage = async (eventId) => {
		const element = document.getElementById(`download-card-${eventId}`);
		if (!element) return;

		try {
			const canvas = await html2canvas(element, { scale: 2 });
			const image = canvas.toDataURL('image/png');

			const link = document.createElement('a');
			link.href = image;
			link.download = `event-${eventId}.png`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			Swal.fire({
				title: 'Image Downloaded!',
				text: 'Event image saved successfully.',
				icon: 'success',
				background: '#1f2937',
				color: '#fff',
				timer: 1500,
				showConfirmButton: false,
				customClass: { popup: 'rounded-2xl border border-green-500/30' }
			});
		} catch (error) {
			console.error('Error generating image:', error);
		}
	};

	const handleDownloadPDF = async (event) => {
		const element = document.getElementById(`download-card-${event.id || event._id}`);
		if (!element) return;

		try {
			const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#0f172a' });

			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'landscape',
				unit: 'px',
				format: [canvas.width, canvas.height]
			});

			pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
			pdf.save(`event-${event.eventName}.pdf`);

			Swal.fire({
				title: 'PDF Downloaded!',
				text: 'Event PDF saved successfully.',
				icon: 'success',
				background: '#1f2937',
				color: '#fff',
				timer: 1500,
				showConfirmButton: false,
				customClass: { popup: 'rounded-2xl border border-green-500/30' }
			});
		} catch (error) {
			console.error('Error generating PDF:', error);
		}
	};

	const handleFavorite = (eventId) => {
		const newFavorites = new Set(favorites);
		if (newFavorites.has(eventId)) {
			newFavorites.delete(eventId);
		} else {
			newFavorites.add(eventId);
		}
		setFavorites(newFavorites);
		localStorage.setItem('eventFavorites', JSON.stringify([...newFavorites]));
	};

	// Filter and sort logic
	const filteredEvents = data.filter(event => {
		const matchesSearch = event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			event.eventDescription.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = categoryFilter === 'all' || event.eventCategory === categoryFilter;
		const matchesPrice = priceFilter === 'all' ||
			(priceFilter === 'free' ? parseFloat(event.ticketPrice) === 0 :
				priceFilter === 'paid' ? parseFloat(event.ticketPrice) > 0 : true);

		return matchesSearch && matchesCategory && matchesPrice;
	}).sort((a, b) => {
		switch (sortBy) {
			case 'date': return new Date(a.startDate) - new Date(b.startDate);
			case 'price': return parseFloat(a.ticketPrice) - parseFloat(b.ticketPrice);
			case 'name': return a.eventName.localeCompare(b.eventName);
			default: return 0;
		}
	});

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex flex-col items-center justify-center">
				<div className="relative">
					<div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
					</div>
				</div>
				<p className="mt-6 text-gray-400">Loading events...</p>
			</div>
		);
	}

	return (
				<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
					{/* Animated Background */}
					<div className="absolute inset-0 overflow-hidden">
						<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
						<div className="absolute top-1/2 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
						<div className="absolute bottom-20 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
					</div>

					<div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
						<div className="max-w-7xl mx-auto">
							{/* Header */}
							<div className="text-center mb-12">
								<div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
									<Sparkles size={16} className="text-yellow-400" />
									<span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
										Discover Experiences
									</span>
								</div>

								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
									<span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
										All Events
									</span>
								</h1>
								<p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
									Find your next unforgettable experience from our curated collection
								</p>
							</div>

							{/* Stats Bar */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
								<div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
									<div className="text-2xl font-bold text-white mb-1">{data.length}</div>
									<div className="text-sm text-gray-300">Total Events</div>
								</div>
								<div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
									<div className="text-2xl font-bold text-white mb-1">
										{data.filter(e => new Date(e.startDate) > new Date()).length}
									</div>
									<div className="text-sm text-gray-300">Upcoming</div>
								</div>
								<div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
									<div className="text-2xl font-bold text-white mb-1">
										{data.filter(e => parseFloat(e.ticketPrice) === 0).length}
									</div>
									<div className="text-sm text-gray-300">Free Events</div>
								</div>
								<div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
									<div className="text-2xl font-bold text-white mb-1">
										{new Set(data.map(e => e.eventCategory)).size}
									</div>
									<div className="text-sm text-gray-300">Categories</div>
								</div>
							</div>

							{/* Filters and Search */}
							<div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-gray-700/50">
								<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
										<input
											type="text"
											placeholder="Search events..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50"
										/>
									</div>

									<div>
										<select
											value={categoryFilter}
											onChange={(e) => setCategoryFilter(e.target.value)}
											className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50"
										>
											{categories.map(cat => (
												<option key={cat} value={cat === 'All Categories' ? 'all' : cat}>{cat}</option>
											))}
										</select>
									</div>

									<div>
										<select
											value={priceFilter}
											onChange={(e) => setPriceFilter(e.target.value)}
											className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/50"
										>
											<option value="all">All Prices</option>
											<option value="free">Free Only</option>
											<option value="paid">Paid Events</option>
											<option value="premium">Premium ($100+)</option>
										</select>
									</div>

									<div>
										<select
											value={sortBy}
											onChange={(e) => setSortBy(e.target.value)}
											className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50"
										>
											<option value="date">Sort by Date</option>
											<option value="price">Sort by Price</option>
											<option value="name">Sort by Name</option>
										</select>
									</div>
								</div>
							</div>

							{/* Events Grid */}
							{filteredEvents.length === 0 ? (
								<div className="text-center py-20 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50">
									<div className="inline-flex p-4 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl mb-6">
										<Search size={48} className="text-gray-400" />
									</div>
									<h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
									<p className="text-gray-400 mb-8 max-w-md mx-auto">
										{searchQuery ? `No events matching "${searchQuery}"` : 'No events available at the moment'}
									</p>
									<Link
										to="/eventForm"
										className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
									>
										<span>Create Your First Event</span>
										<ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
									</Link>
								</div>
							) : (
								<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
									{filteredEvents.map((event, index) => {
										const eventId = event.id || event._id || index;
										const isUpcoming = new Date(event.startDate) > new Date();
										const isFavorite = favorites.has(eventId);

										return (
											<div key={eventId} className="relative group">
												{/* Hidden Download Card */}
												<div className="fixed left-[-9999px] top-0 pointer-events-none">
													<div id={`download-card-${eventId}`} className="w-[800px] h-[400px] bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden rounded-2xl p-8">
														<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-green-500/5 to-transparent"></div>
														<div className="relative z-10">
															<h2 className="text-4xl font-bold mb-4">{event.eventName}</h2>
															<p className="text-gray-300 text-lg mb-6">{event.eventDescription}</p>
															<div className="grid grid-cols-2 gap-4">
																<div className="space-y-2">
																	<p className="text-sm text-gray-400">📅 Date</p>
																	<p className="text-white font-medium">{new Date(event.startDate).toLocaleDateString()}</p>
																</div>
																<div className="space-y-2">
																	<p className="text-sm text-gray-400">📍 Location</p>
																	<p className="text-white font-medium">{event.venueName}</p>
																</div>
															</div>
														</div>
													</div>
												</div>

												{/* Visible Card */}
												<div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">
													{/* Card Header */}
													<div className="relative h-48 bg-gradient-to-br from-blue-600/30 via-green-600/20 to-transparent overflow-hidden">
														<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
														<div className="absolute top-4 right-4 z-20">
															<button
																onClick={() => handleFavorite(eventId)}
																className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-red-500/50 transition-colors"
															>
																<Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} />
															</button>
														</div>
														<div className="absolute bottom-0 left-0 right-0 p-6 z-20">
															<div className="flex items-center gap-3 mb-2">
																<span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
																	{event.eventCategory}
																</span>
																{!isUpcoming && (
																	<span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-gray-500/20 to-gray-600/20 backdrop-blur-sm rounded-full border border-gray-500/30">
																		Past Event
																	</span>
																)}
															</div>
															<h3 className="text-xl font-bold text-white line-clamp-1">{event.eventName}</h3>
														</div>
													</div>

													{/* Card Content */}
													<div className="p-6 flex-grow">
														<p className="text-gray-400 text-sm line-clamp-3 mb-6">
															{event.eventDescription}
														</p>

														<div className="space-y-4">
															<div className="flex items-center gap-3">
																<div className="p-2 bg-blue-500/10 rounded-lg">
																	<Calendar size={18} className="text-blue-400" />
																</div>
																<div>
																	<p className="text-sm text-gray-400">Date & Time</p>
																	<p className="text-white font-medium">
																		{new Date(event.startDate).toLocaleDateString('en-US', {
																			weekday: 'short',
																			month: 'short',
																			day: 'numeric'
																		})}
																	</p>
																	<p className="text-sm text-gray-300">
																		{new Date(event.startDate).toLocaleTimeString([], {
																			hour: '2-digit',
																			minute: '2-digit'
																		})}
																	</p>
																</div>
															</div>

															<div className="flex items-center gap-3">
																<div className="p-2 bg-green-500/10 rounded-lg">
																	<MapPin size={18} className="text-green-400" />
																</div>
																<div>
																	<p className="text-sm text-gray-400">Venue</p>
																	<p className="text-white font-medium line-clamp-1">{event.venueName}</p>
																	<p className="text-sm text-gray-300 line-clamp-1">{event.venueAddress}</p>
																</div>
															</div>

															<div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
																<div>
																	<p className="text-sm text-gray-400">Ticket Price</p>
																	<p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
																		${event.ticketPrice}
																	</p>
																</div>
																<div>
																	<p className="text-sm text-gray-400">Type</p>
																	<p className="text-white font-medium">{event.ticketType}</p>
																</div>
															</div>
														</div>
													</div>

													{/* Card Actions */}
													<div className="p-6 pt-0 mt-auto">
														<div className="grid grid-cols-5 gap-2 mb-4">
															<button
																onClick={() => handleShare(event)}
																className="group/action p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-blue-500/50"
																title="Share"
															>
																<Share2 size={18} className="text-gray-400 group-hover/action:text-blue-400 mx-auto" />
															</button>
															<button
																onClick={() => handleDownloadImage(eventId)}
																className="group/action p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-green-500/50"
																title="Download Image"
															>
																<Download size={18} className="text-gray-400 group-hover/action:text-green-400 mx-auto" />
															</button>
															<button
																onClick={() => handleDownloadPDF(event)}
																className="group/action p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-yellow-500/50"
																title="Download PDF"
															>
																<FileText size={18} className="text-gray-400 group-hover/action:text-yellow-400 mx-auto" />
															</button>
															<Link
																to={`/eventEdit/${event.eventName}`}
																className="group/action p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-purple-500/50 flex items-center justify-center"
																title="Edit"
															>
																<Edit size={18} className="text-gray-400 group-hover/action:text-purple-400" />
															</Link>
															<button
																onClick={() => handleDeleteEvent(event.eventName)}
																className="group/action p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-red-500/50"
																title="Delete"
															>
																<Trash2 size={18} className="text-gray-400 group-hover/action:text-red-400 mx-auto" />
															</button>
														</div>

														<button
															onClick={() => handleBookEvent(event)}
															disabled={!isUpcoming}
															className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${isUpcoming
																? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 shadow-lg hover:shadow-blue-500/30'
																: 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
																}`}
														>
															<Ticket size={20} />
															{isUpcoming ? 'Book Now' : 'Event Ended'}
															{isUpcoming && <ArrowRight size={18} className="ml-auto" />}
														</button>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							)}

							{/* Create Event CTA */}
							<div className="mt-12 text-center">
								<Link
									to="/eventForm"
									className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
								>
									<span>Host Your Own Event</span>
									<ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			);
		};

		export default EventCard;
