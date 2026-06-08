import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Calendar, Clock, MapPin, ArrowRight, 
  Map, Sparkle, Tag, Info, DollarSign 
} from 'lucide-react';
import { Event, User } from '../types';

interface CreateScreenProps {
  user: User;
  onCreateEvent: (newEvent: Event) => void;
}

export default function CreateScreen({ user, onCreateEvent }: CreateScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [category, setCategory] = useState('Music'); // Default

  const categories = ['Music', 'Food', 'Tech', 'Sports', 'Arts', 'Nature'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert('Please fill in the title of what you are gathering for!');
      return;
    }
    if (!date || !time) {
      alert('Please select both the date and time!');
      return;
    }
    if (!location) {
      alert('Please provide a spot location address!');
      return;
    }

    const priceText = isFree ? 'FREE' : (price.startsWith('$') ? price : `$${price}`);
    
    // Create new event event object
    const createdEvent: Event = {
      id: 'e_custom_' + Math.floor(Math.random() * 100000),
      title: title,
      description: description || `Join us for this special "${title}" gather! Connect, enjoy, and experience our community live.`,
      date: date,
      time: time,
      location: location,
      locationDetails: locationDetails || 'Available upon RSVP',
      price: priceText,
      isFree: isFree,
      category: category,
      image: getCategoryImage(category),
      hostedById: user.id,
      hostedByName: user.fullName,
      hostedByAvatar: user.avatarUrl,
      attendees: [
        {
          id: user.id,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl
        }
      ],
      registeredUserIds: [user.id] // Owner automatically registered
    };

    onCreateEvent(createdEvent);
  };

  // Safe category asset retriever
  const getCategoryImage = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'food':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuATADRnQ16CT6vmRmzKepGG8ku36-w3v_gLjC-PuzKhQ1BugWqPcAvjiLN3Nuj2R8ruzeDpIW9wFzRBYb_0Qym5xVO7wZZYtapkEbZcHT-a0qRLlAU3PmLK9w0BGs-mr5tdQIHCZfinDJd8sLnNNoQ08-XAG0GY1ZEFgyZnNiSF8IMPgpo8i8GQW0ovZ__60p3_RkO2GkPrDOvYBDLsxtJE1fad3oSywsh7dQMcxcFDsaASSpcyVN0t2Jc0qLt7TulO-SlPJSTDywc';
      case 'tech':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtAZloQ-7bU2zNBZGNcCBIH5Nmq-G2G_A2F0ZgPKryLTW7xkbf03FjUuweBfhLK2sqOeFR2r0aAb6owvHowaNymD9aWCRB4JoIAcFTzAY1dWRcWxta1fR0QraiCsQvl8VhxcoH1C7c75aoqzeZQCuZ3kpMmLroivhQ6RB3f1aj9qatS_ShL08DD15nmw6wAHAMMfevgvYU2JP9q4XunTrs0z1vkZRCuHyUfD7-taQsA2qPhJDPNm3KIwVVZNTs69-7BqkIUvxzxw';
      case 'nature':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEcsxkzwy_uL_yGMppRFJ7UgnytNk8YMd3d1l945ma_VRB5rKl-tNq8-QhZ3I1LuF-6yPIaUa665FRBCUs0MpH_ZXd7_ggKaIn7ul7s7G-MVc31PfJ7PIlPZjh8ajyQy-ND9GxMkhQIQwYnmMxdjjjC5VOCR1QPGfIUt8C0-3ANBQ-Xc0obK3qEohTQr6yUCFzZ2pidjs_wA79-B01aT1FxSm2Yn6FSyeV2-2NAY9HO_39CSWFVTgSq6xpORZt75zuMJ95wc0S0-M';
      case 'arts':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXEJLJKiOGPjEkUEOje3WcwEG86gLv0MmPZKvDgqmGuCYBbR7B8pNTANeXr9si3va2uJCBgWQk8104aftIems_tq9EkHlwLE7Q3VH6Gq8owNqQPySCMt7yNW6raB9v08_BtDi31UbWz2HOw6x1m-6FtIZ6djo0bDvPJYW54_8ISEI_hqbEV5EBFt4H8iKOJLBw2rmiYFKeNL8ciXM-7UFH7Oaey8SsS9OV-bLA3gvnawhOgHAZ9iOSasxTrj2TIm3iSC37byCaP9w';
      default:
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRknbg96p1bqF3lfeBBRg7h651m9wLxe5QYu9_EOZOObZY2quNkRQPZHOS5g3nDWgyZe-uWwHnEBnyDrlLbRbBzbLbz5SA2LDxCR_ZFBQg4SPM38j4clMbVH1uOTJTtzthHpmeDtZMp_9LeQffJYyC2ALUqm6YdOrfhBZuUfNLI9zWbqMidZCJ2_Wr8KIkFyvlpdf_mrVcpQBkDHi7j3VaBA1tRELKeli8EJzyg8FrGPSQEZXguMXv-Bv-XpJgxDudV55imkaltw';
    }
  };

  const selectRandomPlaceholder = () => {
    const ideas = [
      'Sunset Rooftop Yoga',
      'Underground Jazz Night',
      'Sunday Coffee & Code',
      'Retro Arcade Tournament',
      'Vegan Cooking Workshop',
      'Golden Hour Park Picnic'
    ];
    const picked = ideas[Math.floor(Math.random() * ideas.length)];
    setTitle(picked);
  };

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#181445] font-sans pb-32">
      
      <main className="px-6 max-w-xl mx-auto w-full pt-4">
        
        {/* Progress horizontal Stepper */}
        <div className="flex items-center gap-2 mt-4 mb-6">
          <div className="h-2 flex-grow rounded-full bg-[#ff6b35]"></div>
          <div className="h-2 flex-grow rounded-full bg-[#ff6b35]/40 animate-pulse"></div>
          <div className="h-2 flex-grow rounded-full bg-[#efebff]"></div>
        </div>

        {/* Stepper text layout information */}
        <div className="mb-6">
          <h2 className="font-headline text-2xl font-black text-[#181445] mb-1">Start a new Gather</h2>
          <p className="text-xs font-bold text-[#594139] tracking-tight flex items-center gap-1">
            <Sparkle className="w-3.5 h-3.5 text-[#ab3500]" />
            Phase 1: The Essentials
          </p>
        </div>

        {/* Action input form core */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Question 1: Name of Gather */}
          <div className="flex flex-col gap-2">
            <label className="font-headline text-base font-extrabold text-[#181445]" htmlFor="event-name-input">
              What are you gathering for?
            </label>
            <div className="relative">
              <input
                id="event-name-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Sunset Rooftop Yoga"
                className="w-full h-14 px-4 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-2xl outline-none font-headline font-bold text-[#181445] shadow-sm tracking-tight placeholder-[#594139]/50"
              />
              <button
                type="button"
                onClick={selectRandomPlaceholder}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-headline text-xs font-bold text-[#ab3500] hover:underline cursor-pointer bg-[#ffdbd0] px-2 py-1 rounded-lg"
              >
                Inspire me
              </button>
            </div>
          </div>

          {/* New Field: Category chips selector selector */}
          <div className="flex flex-col gap-2">
            <label className="font-headline text-sm font-extrabold text-[#181445] flex items-center gap-1">
              <Tag className="w-4 h-4 text-[#ab3500]" /> Choose Gather Category
            </label>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full font-headline text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#ab3500] text-white shadow-sm ring-2 ring-[#ab3500]/20' 
                        : 'bg-[#efebff] text-[#594139] hover:bg-[#e3dfff]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Time and Date picker selectors */}
          <div className="flex flex-col gap-2">
            <h3 className="font-headline text-base font-extrabold text-[#181445]">When is it happening?</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative flex items-center">
                <Calendar className="absolute left-4 text-[#ab3500] w-5 h-5 pointer-events-none" />
                <input
                  aria-label="Event Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-14 pl-12 pr-3 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-0 rounded-2xl font-bold font-sans text-xs text-[#181445]"
                />
              </div>
              <div className="relative flex items-center">
                <Clock className="absolute left-4 text-[#ab3500] w-5 h-5 pointer-events-none" />
                <input
                  aria-label="Event Time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-14 pl-12 pr-3 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-0 rounded-2xl font-bold font-sans text-xs text-[#181445]"
                />
              </div>
            </div>
          </div>

          {/* Question 3: Spot address location */}
          <div className="flex flex-col gap-2">
            <h3 className="font-headline text-base font-extrabold text-[#181445]">Where is the spot?</h3>
            <div className="relative flex items-center">
              <MapPin className="absolute left-4 text-[#ab3500] w-5 h-5 pointer-events-none" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search park name, cafe, or address"
                className="w-full h-14 pl-12 pr-4 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-2xl outline-none font-medium text-xs placeholder-[#594139]/50 text-[#181445]"
              />
            </div>
            
            {/* Added: location details (suite, floor, specific instructions) */}
            <input
              type="text"
              value={locationDetails}
              onChange={(e) => setLocationDetails(e.target.value)}
              placeholder="Room number, apartment suite, entry code instructions (optional)"
              className="w-full h-11 px-4 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-xl outline-none font-medium text-xs text-[#181445]"
            />

            {/* Tap to open static illustrative map view */}
            <div className="w-full h-36 rounded-2xl overflow-hidden bg-[#e3dfff] border border-[#e1bfb5] shadow-sm relative group cursor-pointer active:scale-[0.99] transition-transform">
              <img
                alt="Map preview placeholder"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2_v8dbP502vYyXaWFIT0gPNbIn4hYldK55NLrhm3PMOtjMl6f9Qmleor2AHmARnS-Mhh_Ese7TVhs-uR9wX6nuQG4EfozAV-yFI-l-nDanFEsee7A6-1_6I92VdLH3weDrbAFwERrmQHonPrDeHGQVF0QJO9c530MMHYHbLWtL5isZ-X1kKhgHh06F105XfgZ37zAFaqoS6wP7GHnuwQ_o1SjATRXtpXDsgMHRD7OnxhKQOavw_PKUsM8Poq4xrZxa-vbOx3dqLo"
              />
              <div className="absolute inset-0 bg-[#181445]/30 flex items-end p-4">
                <span className="text-white font-headline text-xs font-bold flex items-center gap-1.5 drop-shadow">
                  <Map className="w-4 h-4 text-[#ffdbd0] fill-current" />
                  TAP TO OPEN CHOOSE LOCATION pin
                </span>
              </div>
            </div>
          </div>

          {/* Pricing input section */}
          <div className="bg-[#efebff]/60 p-4 rounded-3xl border border-[#e3dfff] flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="font-headline text-sm font-extrabold text-[#181445] flex items-center gap-1.5" htmlFor="price-gather-inp">
                <DollarSign className="w-4 h-4 text-[#ab3500]" /> Admission Price
              </label>
              <button
                type="button"
                onClick={() => setIsFree(!isFree)}
                className={`px-3 py-1 text-xs font-headline font-bold rounded-full cursor-pointer transition-all ${
                  isFree ? 'bg-[#ff6b35] text-white' : 'bg-white border text-[#ab3500] border-[#ab3500]'
                }`}
              >
                {isFree ? 'FREE Gather' : 'Paid Admission'}
              </button>
            </div>
            
            {!isFree && (
              <input
                id="price-gather-inp"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 15 USD, 10 Entry, $25"
                className="w-full h-11 px-4 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-0 rounded-2xl outline-none font-headline font-bold text-xs"
              />
            )}
          </div>

          {/* Description details */}
          <div className="flex flex-col gap-2">
            <label className="font-headline text-sm font-bold text-[#181445] flex items-center gap-1.5" htmlFor="desc-gather">
              <Info className="w-4 h-4 text-[#ab3500]" /> About this Gather (Description)
            </label>
            <textarea
              id="desc-gather"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are the vibes? Let guests know about any items to bring, specific meeting points, or fun announcements!"
              className="w-full p-4 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-2xl outline-none font-medium text-xs text-[#181445] shadow-sm leading-relaxed"
            ></textarea>
          </div>

          {/* Action trigger button */}
          <div className="pt-4 flex justify-end">
            <button
              id="btn-create-submit"
              type="submit"
              className="bg-[#ff6b35] hover:bg-[#ab3500] text-white px-8 py-3.5 rounded-full font-headline text-sm font-bold shadow-lg shadow-[#ff6b35]/25 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Publish Gather</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>

      </main>
    </div>
  );
}
