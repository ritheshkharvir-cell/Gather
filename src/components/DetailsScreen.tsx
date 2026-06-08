import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Share2, Calendar, Bookmark, CheckCircle, 
  MapPin, Heart, PartyPopper 
} from 'lucide-react';
import { Event, User } from '../types';

interface DetailsScreenProps {
  event: Event;
  user: User;
  onBack: () => void;
  onRsvp: (eventId: string) => void;
  isFavorited: boolean;
  onToggleFavorite: (eventId: string) => void;
}

export default function DetailsScreen({
  event,
  user,
  onBack,
  onRsvp,
  isFavorited,
  onToggleFavorite
}: DetailsScreenProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Check if current user is RSVP'ed
  const isRegistered = event.registeredUserIds.includes(user.id);

  const handleRsvpSubmit = () => {
    if (isRegistered) return; // Already registered

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRsvp(event.id);
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Copied link to "${event.title}"! Share it with your friends.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#181445] font-sans pb-24 hide-scrollbar">
      
      {/* Dynamic Immersive Header bar bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b border-[#e9e5ff]">
        <button
          id="btn-details-back"
          onClick={onBack}
          className="p-2 bg-[#efebff] rounded-full active:scale-90 transition-transform cursor-pointer hover:bg-[#e3dfff]"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-[#ab3500]" />
        </button>
        <h1 className="font-headline text-lg font-extrabold text-[#ab3500]">Gather Details</h1>
        <button
          id="btn-details-share"
          onClick={handleShare}
          className="p-2 bg-[#efebff] rounded-full active:scale-95 transition-transform cursor-pointer"
          aria-label="Share"
        >
          <Share2 className="w-5 h-5 text-[#ab3500]" />
        </button>
      </header>

      {/* Hero Image Section */}
      <section className="relative w-full h-[320px] md:h-[460px] overflow-hidden mt-16">
        <img
          alt={event.title}
          className="w-full h-full object-cover select-none"
          referrerPolicy="no-referrer"
          src={event.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf8ff] via-[#fcf8ff]/20 to-transparent"></div>
      </section>

      {/* Main Container Content */}
      <main className="px-6 -mt-16 relative z-10 max-w-4xl mx-auto">
        
        {/* Floating title header card overlay overlay */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_12px_24px_rgba(86,84,168,0.06)] border border-[#e3dfff] mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-[#ff6b35]/15 text-[#ab3500] px-3 py-1 rounded-full text-xs font-bold font-headline tracking-tight">
              {event.category}
            </span>
            <span className="bg-[#5654a8]/10 text-[#5654a8] px-3 py-1 rounded-full text-xs font-bold font-headline tracking-tight">
              {event.isFree ? 'Free' : 'Featured'}
            </span>
          </div>

          <h2 className="font-headline text-xl md:text-2xl font-black text-[#181445] leading-tight mb-3">
            {event.title}
          </h2>

          <div className="flex items-center gap-2 text-[#594139] text-xs font-semibold">
            <Calendar className="w-4 h-4 text-[#ab3500]" />
            <span>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })} • {event.time}
            </span>
          </div>
        </div>

        {/* Action interactive controller buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            id="btn-details-rsvp"
            disabled={isRegistered || loading}
            onClick={handleRsvpSubmit}
            className={`flex-1 text-white font-headline text-sm font-bold py-3.5 px-6 rounded-full shadow-md active:scale-95 transition-all flex justify-center items-center gap-2 cursor-pointer ${
              isRegistered 
                ? 'bg-[#5654a8] shadow-none' 
                : 'bg-[#ff6b35] hover:bg-[#ab3500] shadow-[0_8px_16px_rgba(255,107,53,0.3)]'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isRegistered ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>RSVP'ed - You're Going!</span>
              </>
            ) : (
              <span>RSVP Now ({event.price})</span>
            )}
          </button>

          <button
            id="btn-details-toggle-favorite"
            onClick={() => onToggleFavorite(event.id)}
            className={`w-12 h-12 border-2 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer ${
              isFavorited 
                ? 'bg-red-50 border-red-200 text-red-500' 
                : 'border-[#5654a8] text-[#5654a8] hover:bg-[#5654a8]/5'
            }`}
            aria-label="Favorites toggler"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content columns split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Description */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white p-5 rounded-3xl border border-[#e3dfff]">
              <h3 className="font-headline text-base font-extrabold text-[#181445] mb-2.5">About this Gather</h3>
              <p className="text-sm text-[#594139] leading-relaxed font-sans font-medium whitespace-pre-line">
                {event.description}
              </p>
            </section>

            {/* List of Attendees list */}
            <section className="bg-[#f6f2ff] p-5 rounded-3xl border border-[#e3dfff]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-headline text-sm font-black text-[#181445]">Guests Attending</h3>
                <span className="text-xs font-bold text-[#ab3500]">
                  {event.attendees.length} attending
                </span>
              </div>

              {event.attendees.length === 0 ? (
                <p className="text-xs text-[#594139]/70 italic">Be the first to RSVP for this Gather!</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {event.attendees.map((att) => (
                      <img
                        key={att.id}
                        alt={att.fullName}
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                        referrerPolicy="no-referrer"
                        src={att.avatarUrl}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-[#594139] italic">
                    {event.attendees.map(a => a.fullName.split(' ')[0]).slice(0, 3).join(', ')}
                    {event.attendees.length > 3 ? ` and ${event.attendees.length - 3} other friends are going.` : ' are going.'}
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Location & Host info */}
          <div className="space-y-6">
            {/* Location card */}
            <section className="bg-white p-4 rounded-3xl border border-[#e3dfff]">
              <h3 className="font-headline text-sm font-extrabold text-[#181445] mb-3">Location</h3>
              
              {/* Maps placeholder with static illustrative maps */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm h-[180px] border border-[#e1bfb5] bg-sky-50 mb-3">
                <img
                  alt="Static Map illustration"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlfQAsnXsmGVEpFiE9OQgfd7-oM2NK0MC7c1XyqPINUm4da-jPSHnMQqq1tAGTLxT_DzXGwu3YLzwjdHB5QDGbAS4iEYVHwGBA9AjQ57Jsak2Od7qp2_m09qik5-zqzORMuTsCbKHriLjFbL0gez784VJgsD5BxB6eWAaluVoXWvcVRdfTO4clbCZtNTw3G3Yq2aLHjx7rrIWE9D4x_qtjOHsptVL4DGij_DUxENpY_zxVjMblVPKekAyEjTKpo6V4vXS1_E2DtA4"
                />
                
                {/* Active bounce marker illustration pin */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-[#ff6b35] p-2.5 rounded-full shadow-md animate-bounce ring-4 ring-white/45">
                    <MapPin className="w-5 h-5 text-white fill-current" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 bg-white/95 text-[10px] font-bold text-[#181445] px-2.5 py-1 rounded-full shadow border border-[#efebff]">
                  Brooklyn, NY
                </div>
              </div>

              <div>
                <p className="font-headline text-xs font-black text-[#181445] mb-0.5">{event.location}</p>
                <p className="text-[11px] font-medium leading-relaxed text-[#594139]">{event.locationDetails || 'To be announced close to event date'}</p>
              </div>
            </section>

            {/* Event Host card panel */}
            <section className="bg-white p-4 rounded-3xl border border-[#e3dfff] flex items-center gap-3">
              <img
                alt={event.hostedByName}
                className="h-10 w-10 rounded-full object-cover border border-[#e1bfb5]"
                referrerPolicy="no-referrer"
                src={event.hostedByAvatar}
              />
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#594139] uppercase">HOSTED BY</p>
                <p className="font-headline text-xs font-black text-[#181445]">{event.hostedByName}</p>
              </div>
            </section>
          </div>

        </div>

      </main>

      {/* Celebration Success bottom modal sheet */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white w-full max-w-md p-6 rounded-t-[32px] border-t border-[#e3dfff] shadow-[0_-8px_32px_rgba(24,20,69,0.15)] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center mb-4 text-white hover:scale-105 transition-transform shadow-[0_4px_16px_rgba(255,107,53,0.3)]">
                <PartyPopper className="w-8 h-8 fill-current text-white animate-bounce" />
              </div>

              <h3 className="font-headline text-2xl font-black text-[#181445] mb-2">You're in!</h3>
              <p className="text-sm font-semibold text-[#594139] mb-6 px-4">
                We've added '<span className="text-[#ab3500]">{event.title}</span>' to your Upcoming Gathers list. See you there!
              </p>

              <button
                id="btn-rsvp-success-close"
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#5654a8] text-white font-headline text-sm font-bold py-3.5 rounded-full shadow-md hover:bg-[#3e3c8f] active:scale-95 transition-all cursor-pointer"
              >
                Sweet, thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
