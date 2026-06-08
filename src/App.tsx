import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Compass, Users, PlusCircle, User as UserIcon, 
  LogOut, Calendar, Heart, ShieldAlert, Sparkle, Camera, Lock
} from 'lucide-react';

import { User, Event, ScreenState } from './types';
import { MOCK_EVENTS } from './data/mockData';

// Screens
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import ExploreScreen from './components/ExploreScreen';
import DetailsScreen from './components/DetailsScreen';
import CreateScreen from './components/CreateScreen';
import MyGathersScreen from './components/MyGathersScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  
  // Dynamic Events list stored in LocalStorage for persistence session!
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  // Custom Bookmark state synced to LocalStorage
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Profile overlay modal trigger
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');

  // Initial State Hydration Loader
  useEffect(() => {
    // 1. Hydrate User Session
    const cachedUser = localStorage.getItem('gather_session_user');
    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        setUser(parsed);
        setScreen('explore'); // Instantly hop into discovery if logged in
      } catch (err) {
        console.error('Failed to parse cached session', err);
      }
    }

    // 2. Hydrate Custom Events List or default MOCK_EVENTS
    const cachedEvents = localStorage.getItem('gather_events_data');
    if (cachedEvents) {
      try {
        const parsed = JSON.parse(cachedEvents);
        setEvents(parsed);
      } catch (err) {
        setEvents(MOCK_EVENTS);
      }
    } else {
      setEvents(MOCK_EVENTS);
      localStorage.setItem('gather_events_data', JSON.stringify(MOCK_EVENTS));
    }

    // 3. Hydrate Bookmarks list
    const cachedFavs = localStorage.getItem('gather_favorites');
    if (cachedFavs) {
      try {
        setFavorites(JSON.parse(cachedFavs));
      } catch (err) {
        setFavorites([]);
      }
    }
  }, []);

  // Save events update back to persistence store
  const saveEvents = (updated: Event[]) => {
    setEvents(updated);
    localStorage.setItem('gather_events_data', JSON.stringify(updated));
  };

  // Switch to specific login/signup tab on Auth
  const handleWelcomeLoginLaunch = () => {
    setAuthTab('login');
    setScreen('auth');
  };

  const handleWelcomeSignupLaunch = () => {
    setAuthTab('signup');
    setScreen('auth');
  };

  // Auth logins successfully session controller
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setScreen('explore');
    setTempName(loggedInUser.fullName);
    setTempAvatar(loggedInUser.avatarUrl);
  };

  // Event RSVP execution handler
  const handleRsvpEvent = (eventId: string) => {
    if (!user) return;
    
    const updated = events.map(e => {
      if (e.id === eventId) {
        // Prevent duplicate RSVPs
        if (e.registeredUserIds.includes(user.id)) return e;

        // Push current active user to attendees deck
        return {
          ...e,
          registeredUserIds: [...e.registeredUserIds, user.id],
          attendees: [
            ...e.attendees,
            {
              id: user.id,
              fullName: user.fullName,
              avatarUrl: user.avatarUrl
            }
          ]
        };
      }
      return e;
    });

    saveEvents(updated);
  };

  // Event scheduling planner form submit handler
  const handleCreateEvent = (newEvent: Event) => {
    const updated = [newEvent, ...events];
    saveEvents(updated);
    
    // Select newly scheduled Gather immediately to let user see their work!
    setSelectedEventId(newEvent.id);
    setScreen('details');
    
    // Alert notification banner decoration
    alert(`Successfully launched your custom Gather: "${newEvent.title}"!`);
  };

  // Bookmark / Favorite toggler handler
  const handleToggleFavorite = (eventId: string) => {
    let updated: string[];
    if (favorites.includes(eventId)) {
      updated = favorites.filter(id => id !== eventId);
    } else {
      updated = [...favorites, eventId];
    }
    setFavorites(updated);
    localStorage.setItem('gather_favorites', JSON.stringify(updated));
  };

  const handleSignOut = () => {
    setUser(null);
    setScreen('welcome');
    setShowProfileModal(false);
    localStorage.removeItem('gather_session_user');
  };

  // Dynamic Profile configuration updates
  const handleSaveProfileChanges = () => {
    if (!user) return;
    if (!tempName) {
      alert('Please enter a valid display name!');
      return;
    }

    const updatedUser = {
      ...user,
      fullName: tempName,
      avatarUrl: tempAvatar || user.avatarUrl
    };

    setUser(updatedUser);
    localStorage.setItem('gather_session_user', JSON.stringify(updatedUser));
    setShowEditProfile(false);
    alert('Profile successfully synchronized!');
  };

  // Dynamic avatars catalog catalog selection choices
  const PROFILE_AVATAR_PRESETS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHG26__svJulUrdnfP7uflIYNdzBysdBxNAHu7NjCs2MX1CyOTvLD4N48bJT5rdN8ZerN5mlJuDeYEmmq9KLkeLyIyDfghyIlLCjQrElE_gEVnUgik1H_jNQyZYfZvnOreiTKemPNgkYMjRG2KvcOngeVzng_kwdF2FGpyyMHgOozLcmiYjidnjNNI7pYqux_WVNiFn5hq7z0DzMy9NN6qdbrGQIFRqO_zRtIdh_VEWlben37ETvI1QEX8VhatT7Ry2FYRTv4jN30',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJAuJxeICZdZ8hA-ED4cgSVnmR5Qb2mIBxgBiZn8-ZcmGRhhcJcBgobwbND7rT6BiL58eASj6Wh0yuE6aFeIct_6MUVippmS9kXt6-f5yYQusHVllQ5A9Y1mJt3-HW7BMLbCfQT4BKQVxjmFY0qU37ZReZCIYYtyQAuAork7_RCqS9ng9I_ZxQW3EACq9aWnMj_wwtTl_jZKLx3Erm5SOZRC39d_h0Z-YWfeDoppsqMhKqk43QwO3zuH_Nv112BwOUqWJ1Ry1apc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDmBTI2aqM9RLRq6XIGR-pOZuLhHN6-BvGnhSoGxjtpKDkHOpTanXspd7MQ64MoP0I4H5e1DPMnWUTqxg56gAFiOvHJdllz6UB4HiKcCxF2CZuE9OhUsD14IjY_3GGHnc74P6EDR14aKw1aOJG2TiSaL20wmkBzEDSbv_VqtkTvUQpTSoaMgg4oIN236PnxC20gFLmrBq3C2S4teb1-xe_DQdVkR4oUmgimHBTL_r50SmUGDsP_sgMiESl7oF29Qh-o9VQb3EOYW38',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDXCpeC4qlMMwzcpGWjqTbwfIEuzGJXFvc8u7-C2rIbuiC5-tuP7ASsZnEVvLfLFYX9tz-KsA1SSrM9xzY3JzaeVTguizFVzcVmJaHLeheWlqHURT1H7RV2s-tRF2nUZLy2QtZsl-b_W3QkV1557WJzc1lM3mgqYrPNJbsz28j3c7l00LsBzvRxCtATTCBuNzZL7GfdfDiRqTBupa-bTvdp1bp_6uHiAkYpkDtA_ITn1TGO6809u7q0o369p5KJKciIrDfJ1P045vU'
  ];

  // Helper renderer for active screens
  const renderActiveScreen = () => {
    switch (screen) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onGetStarted={handleWelcomeSignupLaunch} 
            onLoginClick={handleWelcomeLoginLaunch} 
          />
        );
      
      case 'auth':
        return (
          <AuthScreen 
            initialTab={authTab} 
            onLoginSuccess={handleLoginSuccess} 
          />
        );
      
      case 'explore':
        return (
          <ExploreScreen
            user={user!}
            events={events}
            onSelectEvent={(id) => {
              setSelectedEventId(id);
              setScreen('details');
            }}
            onNavigateToCreate={() => setScreen('create')}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            onProfileClick={() => setShowProfileModal(true)}
          />
        );
      
      case 'details':
        const selected = events.find(e => e.id === selectedEventId) || events[0];
        return (
          <DetailsScreen
            event={selected}
            user={user!}
            onBack={() => setScreen('explore')}
            onRsvp={handleRsvpEvent}
            isFavorited={favorites.includes(selected.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      
      case 'create':
        return (
          <CreateScreen
            user={user!}
            onCreateEvent={handleCreateEvent}
          />
        );
      
      case 'my-gathers':
        return (
          <MyGathersScreen
            user={user!}
            events={events}
            onSelectEvent={(id) => {
              setSelectedEventId(id);
              setScreen('details');
            }}
            onDiscoverClick={() => setScreen('explore')}
          />
        );
      
      default:
        return <div className="text-center py-20 text-xs font-bold">State mismatch</div>;
    }
  };

  // Determine if main header bar is visible (Explore, Create, My Gathers)
  const isMainLayoutActive = user && ['explore', 'create', 'my-gathers'].includes(screen);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf8ff] text-[#181445] font-sans antialiased relative">
      
      {/* Brand TopAppBar Component for active logged in shells */}
      {isMainLayoutActive && (
        <header className="bg-white/85 backdrop-blur-md w-full top-0 sticky z-40 flex justify-between items-center px-6 py-4 border-b border-[#efebff]">
          <div 
            onClick={() => setScreen('explore')}
            className="flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
          >
            <Sparkles className="text-[#ab3500] w-7 h-7 fill-current" />
            <span className="font-headline text-xl font-black text-[#ab3500] tracking-tight">Gather</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Screen location indicator marker */}
            <div className="hidden sm:block text-right">
              <p className="text-[9px] font-bold tracking-wider text-[#594139] uppercase">GUEST PASS</p>
              <p className="text-xs font-extrabold text-[#5654a8]">{user.fullName}</p>
            </div>
            
            {/* User Avatar Action panel toggle */}
            <button
              id="top-profile-badge"
              onClick={() => {
                setTempName(user.fullName);
                setTempAvatar(user.avatarUrl);
                setShowProfileModal(true);
              }}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ff6b35] active:scale-95 transition-transform hover:opacity-90 cursor-pointer shadow-sm"
              aria-label="User profiles option dialog"
            >
              <img 
                src={user.avatarUrl} 
                alt="Profile avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </header>
      )}

      {/* Main active frame viewer */}
      <div className="flex-grow">
        {renderActiveScreen()}
      </div>

      {/* Persistent Bottom Bar component navigation */}
      {isMainLayoutActive && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-5 bg-white border-t border-[# efebff] shadow-[0_-4px_24px_rgba(86,84,168,0.06)] rounded-t-[24px]">
          
          <button
            id="nav-explore-btn"
            onClick={() => setScreen('explore')}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
              screen === 'explore' 
                ? 'bg-[#ffdbd0] text-[#ab3500] px-4 font-bold scale-102 shadow-inner' 
                : 'text-[#594139] hover:bg-[#efebff]'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="font-headline text-[9px] font-extrabold tracking-tight mt-0.5">Explore</span>
          </button>
          
          <button
            id="nav-myGathers-btn"
            onClick={() => setScreen('my-gathers')}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
              screen === 'my-gathers' 
                ? 'bg-[#efebff] text-[#5654a8] px-4 font-bold scale-102 shadow-inner' 
                : 'text-[#594139] hover:bg-[#efebff]'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-headline text-[9px] font-extrabold tracking-tight mt-0.5">Gathers</span>
          </button>
          
          <button
            id="nav-create-btn"
            onClick={() => setScreen('create')}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
              screen === 'create' 
                ? 'bg-[#ff6b35]/20 text-[#ff6b35] px-4 font-bold scale-102' 
                : 'text-[#594139] hover:bg-[#efebff]'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="font-headline text-[9px] font-extrabold tracking-tight mt-0.5">Create</span>
          </button>
          
          <button
            id="nav-profile-btn"
            onClick={() => setShowProfileModal(true)}
            className="flex flex-col items-center justify-center p-2 text-[#594139] rounded-2xl hover:bg-[#efebff] transition-all cursor-pointer"
          >
            <UserIcon className="w-5 h-5" />
            <span className="font-headline text-[9px] font-extrabold tracking-tight mt-0.5">Profile</span>
          </button>

        </nav>
      )}

      {/* Profile Details Dialog Modal overlay overlays */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[#fcf8ff] w-full max-w-md p-6 rounded-t-[32px] border-t border-[#e3dfff] shadow-[0_-8px_32px_rgba(24,20,69,0.15)] max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-lg font-black text-[#181445]">My Member Pass</h3>
                <button
                  id="btn-profile-close"
                  onClick={() => {
                    setShowProfileModal(false);
                    setShowEditProfile(false);
                  }}
                  className="text-xs font-bold text-[#ab3500] hover:underline cursor-pointer bg-[#ffdbd0] px-3.5 py-1.5 rounded-full"
                >
                  Close
                </button>
              </div>

              {!showEditProfile ? (
                /* Profile Display card details state */
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-3xl border border-[#e3dfff] flex flex-col items-center text-center relative overflow-hidden">
                    {/* sparks logo vector background decoration */}
                    <div className="absolute top-2 right-2 opacity-15">
                      <Sparkles className="text-[#ab3500] w-20 h-20 fill-current" />
                    </div>

                    <img
                      alt={user?.fullName}
                      className="w-20 h-20 rounded-full border-4 border-[#ffab8b] object-cover mb-3 shadow-md"
                      referrerPolicy="no-referrer"
                      src={user?.avatarUrl}
                    />

                    <h4 className="font-headline text-lg font-black text-[#181445]">
                      {user?.fullName}
                    </h4>
                    <p className="text-xs font-medium text-[#594139] mb-4">
                      {user?.email}
                    </p>

                    <div className="grid grid-cols-2 gap-3 w-full border-t border-[#efebff] pt-4">
                      <div className="text-center">
                        <p className="text-[10px] font-bold tracking-widest text-[#594139] uppercase">MEMBER SINCE</p>
                        <p className="text-xs font-black text-[#ab3500]">June 2026</p>
                      </div>
                      <div className="text-center border-l border-[#efebff]">
                        <p className="text-[10px] font-bold tracking-widest text-[#594139] uppercase">UPCOMING GATHERS</p>
                        <p className="text-xs font-black text-[#5654a8]">
                          {events.filter(e => e.registeredUserIds.includes(user?.id || '')).length} Scheduled
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="space-y-2">
                    <button
                      id="btn-profile-edit"
                      onClick={() => setShowEditProfile(true)}
                      className="w-full bg-[#5654a8] text-white font-headline text-xs font-bold py-3.5 rounded-full shadow-sm hover:bg-[#3e3c8f] active:scale-95 transition-all cursor-pointer"
                    >
                      Update Name & Avatar preset
                    </button>

                    <button
                      id="btn-profile-signout"
                      onClick={handleSignOut}
                      className="w-full bg-white text-red-600 border border-red-200 font-headline text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                /* Profile Edit configuration State */
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-headline text-xs font-bold text-[#181445]" htmlFor="edit-fullName-inp">Full Name</label>
                    <input
                      id="edit-fullName-inp"
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-[#e1bfb5] focus:border-[#ab3500] rounded-xl outline-none font-bold text-sm text-[#181445]"
                    />
                  </div>

                  {/* Preset Avatar select list */}
                  <div className="flex flex-col gap-2">
                    <label className="font-headline text-xs font-bold text-[#181445]">Select Avatar Preset</label>
                    <div className="grid grid-cols-4 gap-3 pt-1">
                      {PROFILE_AVATAR_PRESETS.map((p, idx) => {
                        const isChosen = tempAvatar === p;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setTempAvatar(p)}
                            className={`relative aspect-square rounded-full overflow-hidden border-4 active:scale-90 transition-all cursor-pointer ${
                              isChosen ? 'border-[#ff6b35] scale-102 shadow' : 'border-[#e1bfb5] hover:opacity-90'
                            }`}
                          >
                            <img src={p} alt="Preset avatar" className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button
                      id="btn-edit-profile-cancel"
                      type="button"
                      onClick={() => setShowEditProfile(false)}
                      className="py-3 bg-[#efebff] text-[#594139] rounded-full font-headline text-xs font-bold text-center cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      id="btn-edit-profile-save"
                      type="button"
                      onClick={handleSaveProfileChanges}
                      className="py-3 bg-[#ff6b35] text-white rounded-full font-headline text-xs font-bold text-center cursor-pointer shadow-sm hover:bg-[#ab3500]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

