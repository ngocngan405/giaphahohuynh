import React from 'react';
import { useGenealogy, ScreenId } from '../context/GenealogyContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useGenealogy();

  const navItems: Array<{ id: ScreenId; label: string; icon: string }> = [
    { id: 'home', label: 'Trang chủ', icon: 'home' },
    { id: 'tree', label: 'Gia phả', icon: 'account_tree' },
    { id: 'members', label: 'Thành viên', icon: 'groups' },
    { id: 'calendar', label: 'Lịch', icon: 'calendar_month' },
    { id: 'profile', label: 'Cá nhân', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#fff8f6]/95 backdrop-blur-xl border-t border-[#dfbfbc]/30 shadow-[0_-2px_12px_rgba(38,24,17,0.06)] pb-safe">
      <div className="flex justify-around items-center h-16 max-w-4xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 transition-all gap-1 relative ${
                isActive
                  ? 'text-[#6a020a] font-semibold'
                  : 'text-[#58413f] hover:text-[#261811]'
              }`}
            >
              <span 
                className={`material-symbols-outlined text-[24px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[11px] tracking-tight leading-none">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#755b00] absolute bottom-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
