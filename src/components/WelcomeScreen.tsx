import { motion } from 'motion/react';
import { Sparkles, Calendar, Clock, MapPin, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
}

export default function WelcomeScreen({ onGetStarted, onLoginClick }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#fcf8ff] font-sans">
      {/* Top Header Branding */}
      <header className="w-full z-20 flex items-center justify-center pt-8 md:justify-start md:px-12">
        <div className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
          <Sparkles className="text-[#ab3500] w-8 h-8 fill-current" />
          <span className="font-headline text-2xl font-black text-[#ab3500] tracking-tight">Gather</span>
        </div>
      </header>

      {/* Visual Bento Section */}
      <main className="w-full max-w-5xl mx-auto px-6 py-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-12 gap-4 mb-6">
          {/* Main Hero Image */}
          <div className="col-span-12 md:col-span-8 relative aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(24,20,69,0.15)] group transition-all duration-300 hover:scale-[1.01]">
            <img
              id="img-welcome-hero"
              alt="Friends gathering"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bNNtCpp51jjQiB5Qj9oC8J1k62P9HmvWNBRNyFRm1H0t8oSnzvUreVem2-RDP5x07P9ihUl9PGqgbGaBE1RNyGcUPBPp4FD679_TXuyesDSSTkgPABtW6SDgdyQRTjIB3vVEVjoDz1TeJB6xO8LESeB_DqdWiIdAOBfCZePEpIkmcljz5BN-xjhF-MZXcip1ygQ3tjURZLnyNXqMCjhc53apLVfPRz4QhYiYPYceXXvEOnlHwzLVCXM1Av1Xpz28fMjQPwq1sO8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181445]/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#dad6ff] overflow-hidden shadow-sm">
                <img
                  alt="User"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB24gpwbDHq_D5SpMJ6NyLmLgWQo9VF9IDkvSo6xsnGng4DQIa7x02d6OZd6RNb94yi984rxL34RCcr8snRSYU_B5N1nx3Lg7urSg9XX6Ly3b52Ptg7MlK14aOyV2Mr1tjsC9UBiuVm5D2GCcwjCfNpA2jGElQqa1LANtlhr16xQKcMWdQDyJ0Go376ndr_S4eKFeSym7p8dUFSQKjDa8chgjqQ8A_IzP9vA1PPPF5Y-B6I44PTtFHsqC5nhIISvHOia3Lka6OocA"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#dad6ff] overflow-hidden shadow-sm">
                <img
                  alt="User"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAypO1qYDMjBHDO_CPAauHrp7Q9-uc-lvoaoZCW7mvZl-sGhbKR8w7Y_yi6aHQeIu6PsTzuPnu-ELxqXwCxEO6kwn6SaKE879ofpFVma_UMRKIiuAcN9v7NzT7iGmxEc_dsu4t0R4HhpSpC2V8ab9RHQA0u-UM5eHEg6L1Kvqx-y8WlY7dzxs6gvhUxEz-JKaGb1LLBig9ihteX1TupuNg_Vp_LC_-Ad5FuJ--dDv6xpfd0bN9q4Uraxercf6gesHDo3z45eMsrBqg"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#ff6b35] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                +12
              </div>
            </div>
          </div>

          {/* Side Floating column for Tablet/Desktop */}
          <div className="hidden md:flex col-span-4 flex-col gap-4">
            {/* Context Widget */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_12px_24px_-8px_rgba(24,20,69,0.12)] border border-[#e3dfff] hover:translate-y-[-2px] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center">
                  <Calendar className="text-[#ab3500]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-[#594139]">NEXT EVENT</p>
                  <p className="font-headline text-lg font-bold leading-tight text-[#181445]">Golden Hour Yoga</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[#594139] text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#ab3500]" /> 18:30
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ab3500]" /> Central Park
                </span>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="flex-grow bg-[#a7a5ff]/20 rounded-3xl relative overflow-hidden group">
              <img
                alt="Social party"
                className="w-full h-full object-cover grayscale opacity-60 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL3hWr1U5QsFJ90nUhdgFJiG7bnZiBYLDYWdFRsM9WePh37vlYMEqZDMbYhdDwl-tBS0L1tc1p6WW-6DF80tmzo0ek3Mj10hLIyLXxDPbUiY75AY-x8Hk-ZWk-XKTcl64nU0uU_egC0oPd2Q5GU1F5NoG49dtU75QH2tVLdYJC2TcLV4ZD9e1G63ICfU7puAw2PMiwQIlqdgktmzbnzks1ev3bqRMZkQU_QCef8Q6sJGVJ9vQOpCD9u9h9WmAgI7nZs2VR99mOCvU"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  id="btn-welcome-play"
                  aria-label="Play video"
                  className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer"
                >
                  <Play className="text-[#ab3500] fill-current w-6 h-6 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Area */}
        <div className="text-center md:text-left md:max-w-xl md:w-full mt-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-headline text-3xl md:text-4xl lg:text-5xl font-black text-[#181445] mb-4"
          >
            Gather Together<span className="text-[#ff6b35]">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#594139] text-[#594139] leading-relaxed text-base md:text-lg max-w-sm mx-auto md:mx-0 font-medium"
          >
            Discover local events and plan meaningful moments with friends. Your community is waiting.
          </motion.p>
        </div>
      </main>

      {/* Button footer wrapper */}
      <footer className="w-full px-6 pb-12 pt-6 bg-gradient-to-t from-[#fcf8ff] via-[#fcf8ff] to-transparent md:max-w-lg md:mx-auto md:px-0">
        <div className="flex flex-col gap-4 items-center">
          <button
            id="btn-get-started"
            onClick={onGetStarted}
            className="w-full py-4 bg-[#ff6b35] text-white font-headline font-bold rounded-full shadow-[0_8px_20px_-4px_rgba(255,107,53,0.4)] hover:shadow-[0_12px_24px_-4px_rgba(255,107,53,0.5)] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Get Started
          </button>
          <div className="flex items-center gap-2 py-2">
            <span className="text-[#594139] text-sm">Already have an account?</span>
            <button
              id="btn-welcome-login"
              onClick={onLoginClick}
              className="font-headline text-[#ab3500] font-bold text-sm hover:underline cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </footer>

      {/* Background Orbs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#5654a8]/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}
