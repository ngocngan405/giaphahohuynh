import React from 'react';
import { GenealogyProvider, useGenealogy } from './context/GenealogyContext';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NotificationModal } from './components/NotificationModal';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { TreeScreen } from './screens/TreeScreen';
import { MembersScreen } from './screens/MembersScreen';
import { AddMemberScreen } from './screens/AddMemberScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { EventDetailScreen } from './screens/EventDetailScreen';
import { AddEventScreen } from './screens/AddEventScreen';
import { AdminScreen } from './screens/AdminScreen';
import { ExportBackupScreen } from './screens/ExportBackupScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AuthScreen } from './screens/AuthScreen';
import { ClanOnboardingScreen } from './screens/ClanOnboardingScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen, isDeviceFrame, toastMessage } = useGenealogy();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <>
            <Header title="Trang Chủ" />
            <main className="px-4 pt-3 flex-1">
              <HomeScreen />
            </main>
            <BottomNav />
          </>
        );
      case 'tree':
        return (
          <>
            <Header title="Gia Phả" />
            <main className="px-4 pt-3 flex-1">
              <TreeScreen />
            </main>
            <BottomNav />
          </>
        );
      case 'members':
        return (
          <>
            <Header title="Thành Viên" />
            <main className="px-4 pt-3 flex-1">
              <MembersScreen />
            </main>
            <BottomNav />
          </>
        );
      case 'calendar':
        return (
          <>
            <Header title="Lịch" />
            <main className="px-4 pt-3 flex-1">
              <CalendarScreen />
            </main>
            <BottomNav />
          </>
        );
      case 'profile':
        return (
          <>
            <Header title="Cá Nhân" />
            <main className="px-4 pt-3 flex-1">
              <ProfileScreen />
            </main>
            <BottomNav />
          </>
        );
      case 'add-member':
        return <AddMemberScreen />;
      case 'event-detail':
        return <EventDetailScreen />;
      case 'add-event':
        return <AddEventScreen />;
      case 'admin':
        return <AdminScreen />;
      case 'export-backup':
        return <ExportBackupScreen />;
      case 'login':
      case 'register':
        return <AuthScreen />;
      case 'clan-onboarding':
        return <ClanOnboardingScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#3d2d25]/10 flex flex-col items-center">
      {/* Quick Screen Switcher Bar */}
      <div className="w-full">
        <ScreenSwitcherBar />
      </div>

      {/* Main Container: Device frame or fluid container */}
      <div className="w-full flex justify-center py-0 md:py-4 px-0 md:px-4 flex-1">
        <div
          className={`w-full bg-[#fff8f6] transition-all flex flex-col relative overflow-hidden ${
            isDeviceFrame
              ? 'max-w-[430px] rounded-[36px] shadow-2xl border-[10px] border-[#261811] min-h-[880px]'
              : 'max-w-xl md:max-w-2xl min-h-screen shadow-xl rounded-none md:rounded-3xl border-0 md:border md:border-[#dfbfbc]/40'
          }`}
        >
          {/* Subtle Device Frame Notch & Status Bar if in Phone Frame mode */}
          {isDeviceFrame && (
            <div className="h-6 w-full bg-[#261811] flex items-center justify-between px-6 text-white/80 text-[10px] shrink-0 select-none">
              <span>9:41</span>
              <div className="w-20 h-3.5 bg-black rounded-b-xl mx-auto -mt-1"></div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[12px]">signal_cellular_4_bar</span>
                <span className="material-symbols-outlined text-[12px]">wifi</span>
                <span className="material-symbols-outlined text-[12px]">battery_full</span>
              </div>
            </div>
          )}

          {/* Screen Content */}
          <div className="flex-1 flex flex-col relative w-full">
            {renderScreen()}
          </div>
        </div>
      </div>

      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#261811]/95 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl border border-[#dfbfbc]/30 flex items-center gap-2 max-w-sm animate-fade-in pointer-events-none">
          <span className="material-symbols-outlined text-[#fed255] text-[18px]">verified</span>
          <span className="line-clamp-2">{toastMessage}</span>
        </div>
      )}

      {/* Clan Notification Modal */}
      <NotificationModal />
    </div>
  );
};

export default function App() {
  return (
    <GenealogyProvider>
      <MainAppContent />
    </GenealogyProvider>
  );
}
