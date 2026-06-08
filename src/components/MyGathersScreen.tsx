import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Calendar, MapPin, ChevronRight, 
  Sparkle, Compass 
} from 'lucide-react';
import { Event, User } from '../types';

interface MyGathersScreenProps {
  user: User;
  events: Event[];
  onSelectEvent: (eventId: string) => void;
  onDiscoverClick: () => void;
}

export default function MyGathersScreen({
  user,
  events,
  onSelectEvent,
  onDiscoverClick
}: MyGathersScreenProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Filter Gathers:
  // - Upcoming: user is host OR user has RSVP'ed to the event AND the event date is today or future!
  // - Past: event is older (strictly speaking we show mock empty state for past event list in prototype, but let's make it real-world dynamic!)
  const todayStr = '2026-06-08'; // System reference current date

  const isUpcomingEvent = (event: Event) => {
    // Check if user is host or is RSVP'ed
    const isUserHost = event.hostedById === user.id;
    const isRsvped = event.registeredUserIds.includes(user.id);
    
    if (!isUserHost && !isRsvped) return false;
    
    // Check if event is in the future or today
    return event.date >= todayStr;
  };

  const isPastEvent = (event: Event) => {
    const isUserHost = event.hostedById === user.id;
    const isRsvped = event.registeredUserIds.includes(user.id);
    
    if (!isUserHost && !isRsvped) return false;
    
    return event.date < todayStr;
  };

  const upcomingGathers = events.filter(isUpcomingEvent);
  const pastGathers = events.filter(isPastEvent);

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#181445] font-sans pb-32">
      
      <main className="px-6 max-w-xl mx-auto w-full">
        {/* Screen Header title block */}
        <div className="py-6">
          <h2 className="font-headline text-2xl font-black text-[#181445]">My Gathers</h2>
          <p className="text-xs font-semibold text-[#594139] mt-1 flex items-center gap-1">
            <Sparkle className="w-3.5 h-3.5 text-[#ff6b35]" />
            Track your community connections
          </p>
        </div>

        {/* Tab Interface segmented switcher bar */}
        <div className="relative flex items-center bg-[#efebff] p-1 rounded-full h-12 mb-6">
          <button
            id="tab-myGathers-upcoming"
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 text-center py-2 font-headline font-bold text-xs relative z-10 transition-colors duration-300 focus:outline-none focus:ring-0 ${
              activeTab === 'upcoming' ? 'text-[#ab3500]' : 'text-[#594139]'
            }`}
          >
            Upcoming ({upcomingGathers.length})
          </button>
          
          <button
            id="tab-myGathers-past"
            onClick={() => setActiveTab('past')}
            className={`flex-1 text-center py-2 font-headline font-bold text-xs relative z-10 transition-colors duration-300 focus:outline-none focus:ring-0 ${
              activeTab === 'past' ? 'text-[#ab3500]' : 'text-[#594139]'
            }`}
          >
            Past ({pastGathers.length})
          </button>

          {/* Active indicator badge overlay overlay */}
          <div
            className="absolute h-[calc(100%-8px)] top-1 bg-white rounded-xl shadow-sm transition-all duration-300 ease-out z-0"
            style={{
              width: 'calc(50% - 4px)',
              left: activeTab === 'upcoming' ? '4px' : 'calc(50% - 0px)',
            }}
          ></div>
        </div>

        {/* TAB 1: Upcoming gathers List rendering */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingGathers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white p-6 rounded-3xl border border-[#e3dfff]">
                <div className="w-16 h-16 bg-[#efebff] rounded-full flex items-center justify-center mb-3 text-[#ab3500]">
                  <Compass className="w-8 h-8 animate-spin-slow" />
                </div>
                <h3 className="font-headline text-base font-extrabold text-[#181445]">No upcoming events!</h3>
                <p className="text-xs text-[#594139] mt-1 max-w-xs leading-relaxed">
                  You haven't planned any live meetups yet. Tap explore below to find local sessions!
                </p>
                <button
                  id="btn-empty-discover"
                  onClick={onDiscoverClick}
                  className="mt-4 px-6 py-2.5 bg-[#ab3500] hover:bg-[#ff6b35] text-white font-headline text-xs font-bold rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  Discover Events
                </button>
              </div>
            ) : (
              upcomingGathers.map((event) => {
                const isHost = event.hostedById === user.id;
                return (
                  <div
                    key={event.id}
                    onClick={() => onSelectEvent(event.id)}
                    className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_16px_rgba(86,84,168,0.06)] border border-[#e3dfff] flex flex-col active:scale-[0.99] transition-all cursor-pointer group"
                  >
                    <div className="h-32 relative bg-[#efebff]">
                      <img
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-300"
                        referrerPolicy="no-referrer"
                        src={event.image}
                      />
                      
                      {/* Host vs Attendee overlay tag badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full shadow-md font-headline text-[10px] font-extrabold text-white tracking-wider uppercase ${
                          isHost ? 'bg-[#ab3500]' : 'bg-[#5654a8]'
                        }`}>
                          {isHost ? 'Hosting' : 'Going'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-1">
                        <h3 className="font-headline text-base font-extrabold text-[#181445] group-hover:text-[#ab3500] transition-colors leading-tight">
                          {event.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-[#8d7168] mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>

                      <div className="flex items-center gap-1.5 text-[#594139] text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#ab3500]" />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })} • {event.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[#594139] text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#ab3500]" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      {/* Attendee indicators */}
                      <div className="mt-2 pt-2 border-t border-[#f6f2ff] flex items-center justify-between">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {event.attendees.slice(0, 3).map((a) => (
                            <img
                              key={a.id}
                              src={a.avatarUrl}
                              alt={a.fullName}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ))}
                          {event.attendees.length > 3 && (
                            <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#efebff] text-[#ab3500] text-[8px] font-bold ring-2 ring-white">
                              +{event.attendees.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-[#594139] italic">
                          {isHost ? 'You are leading this gather' : `Joined with ${event.attendees.length - 1} guests`}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: Past Gather memory section memories render */}
        {activeTab === 'past' && (
          <div className="flex flex-col items-center justify-center py-12 text-center" id="content-past">
            <div className="w-44 h-44 bg-[#efebff] rounded-full flex items-center justify-center mb-4 text-[#ab3500] shadow-inner">
              <Sparkles className="w-16 h-16 animate-pulse text-[#ab3500]/60" />
            </div>
            <h3 className="font-headline text-base font-extrabold text-[#181445]">No memories here yet</h3>
            <p className="text-xs text-[#594139] mt-2 px-6 max-w-sm leading-relaxed">
              Start gathering with your community to build up your historical adventures!
            </p>
            <button
              id="btn-discover-gathers"
              onClick={onDiscoverClick}
              className="mt-6 bg-[#ab3500] hover:bg-[#ff6b35] text-white font-headline text-xs font-bold py-2.5 px-8 rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Discover Events
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
