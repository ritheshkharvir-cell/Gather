import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Search, Music, Utensils, Laptop, Trophy, 
  Palette, Trees, Compass, ChevronRight, Calendar, Heart, Plus 
} from 'lucide-react';
import { Event, User, Category } from '../types';
import { MOCK_CATEGORIES } from '../data/mockData';

interface ExploreScreenProps {
  user: User;
  events: Event[];
  onSelectEvent: (eventId: string) => void;
  onNavigateToCreate: () => void;
  onToggleFavorite: (eventId: string) => void;
  favorites: string[];
  onProfileClick: () => void;
}

export default function ExploreScreen({
  user,
  events,
  onSelectEvent,
  onNavigateToCreate,
  onToggleFavorite,
  favorites,
  onProfileClick
}: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper category icon renderer (integrates with lucide-react dynamically!)
  const renderCategoryIcon = (iconName: string, active: boolean) => {
    const props = { className: `w-7 h-7 transition-colors duration-200 ${active ? 'text-[#ffdbd0]' : 'text-[#ab3500]'}` };
    switch (iconName) {
      case 'Music': return <Music {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'Laptop': return <Laptop {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Trees': return <Trees {...props} />;
      default: return <Compass {...props} />;
    }
  };

  // Filter events based on Search Query & Selected Category!
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || e.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#181445] font-sans pb-32">
      
      {/* Search Input Bar Section */}
      <section className="px-6 pt-5 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d7168] w-5 h-5" />
          <input
            id="search-adventures"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find your next adventure..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-[#e1bfb5] focus:border-[#ab3500] focus:ring-2 focus:ring-[#ff6b35]/20 rounded-2xl outline-none transition-all font-medium text-sm text-[#181445] shadow-sm placeholder-[#594139]/60"
          />
        </div>
      </section>

      {/* Categories Horizontal Scroll Layout */}
      <section className="mb-6">
        <div className="flex items-center justify-between px-6 mb-3">
          <h2 className="font-headline text-lg font-extrabold text-[#181445]">Categories</h2>
        </div>
        
        {/* Scroll Box wrapper */}
        <div className="flex overflow-x-auto gap-4 px-6 pb-2 hide-scrollbar scrollbar-none snap-x mask-gradient">
          {MOCK_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex-shrink-0 snap-start flex flex-col items-center gap-1.5 focus:outline-none focus:ring-0 active:scale-95 transition-transform cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#ff6b35] text-white' : 'bg-[#e9e5ff] text-[#ab3500] hover:bg-[#e3dfff]'
                }`}>
                  {renderCategoryIcon(cat.iconName, isActive)}
                </div>
                <span className={`text-[11px] font-bold tracking-tight transition-colors ${
                  isActive ? 'text-[#ff6b35]' : 'text-[#594139]'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Listing Event Feed Cards */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline text-lg font-extrabold text-[#181445]">Trending Gathers</h2>
          <button 
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="text-[#ab3500] font-headline text-xs font-bold flex items-center gap-0.5 cursor-pointer hover:opacity-80"
          >
            See all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic empty state or results */}
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-[#efebff] rounded-full flex items-center justify-center mb-3">
              <Compass className="w-8 h-8 text-[#ab3500] animate-pulse" />
            </div>
            <p className="font-headline text-sm font-bold text-[#181445]">No matches found</p>
            <p className="text-xs text-[#594139] mt-1 px-4">Try revising your criteria or check other categories!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredEvents.map(event => {
              const isLiked = favorites.includes(event.id);
              return (
                <article
                  key={event.id}
                  onClick={() => onSelectEvent(event.id)}
                  className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(86,84,168,0.1)] border border-[#e3dfff] active:scale-[0.99] transition-all duration-200 cursor-pointer group"
                >
                  {/* Event Thumbnail */}
                  <div className="relative h-48 w-full bg-[#efebff] overflow-hidden">
                    <img
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      src={event.image}
                    />
                    
                    {/* Price Tag badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                      <span className="text-[#ab3500] font-headline font-extrabold text-xs">
                        {event.price}
                      </span>
                    </div>

                    {/* Category Chip overlay */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#181445]/70 backdrop-blur-sm rounded-full shadow-sm">
                      <span className="text-white font-headline text-[10px] font-bold tracking-widest uppercase">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Body textual content */}
                  <div className="p-4">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h3 className="font-headline text-base font-extrabold leading-tight text-[#181445] group-hover:text-[#ab3500] transition-colors">
                        {event.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(event.id);
                        }}
                        className="p-1 focus:outline-none focus:ring-0 active:scale-90 transition-transform cursor-pointer"
                        aria-label="Toggle Favorite"
                      >
                        <Heart className={`w-5 h-5 transition-all ${
                          isLiked ? 'text-red-500 fill-current' : 'text-[#8d7168] hover:text-[#ff6b35]'
                        }`} />
                      </button>
                    </div>

                    {/* Event Timestamp */}
                    <div className="flex items-center gap-1.5 text-[#594139] text-xs font-semibold mb-3">
                      <Calendar className="w-3.5 h-3.5 text-[#ab3500]" />
                      <span>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })} • {event.time}
                      </span>
                    </div>

                    {/* Going attend list overlay pile */}
                    <div className="flex items-center justify-between border-t border-[#f2efff] pt-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2 overflow-hidden">
                          {event.attendees.slice(0, 3).map((att) => (
                            <img
                              key={att.id}
                              alt={att.fullName}
                              className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover"
                              referrerPolicy="no-referrer"
                              src={att.avatarUrl}
                            />
                          ))}
                          {event.attendees.length > 3 && (
                            <div className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#a7a5ff] text-white text-[8px] font-bold ring-2 ring-white">
                              +{event.attendees.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-[#594139]">Going to this</span>
                      </div>

                      <span className="text-xs font-bold text-[#5654a8] hover:underline">
                        Details & RSVP →
                      </span>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating Action Button for immediate Event creation */}
      <button
        id="explore-fab-create"
        onClick={onNavigateToCreate}
        className="fixed bottom-24 right-5 w-14 h-14 bg-[#ff6b35] text-white rounded-full shadow-[0_8px_16px_rgba(255,107,53,0.4)] hover:scale-105 active:scale-95 transition-all z-40 flex items-center justify-center cursor-pointer"
        aria-label="Create new Gather"
      >
        <Plus className="w-8 h-8 stroke-[3]" />
      </button>

    </div>
  );
}
