import React from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { CLAN_BRAND_INFO } from '../data/mockData';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { navigateTo, setNotificationsOpen } = useGenealogy();

  return (
    <header className="sticky top-0 w-full z-40 bg-[#fff8f6]/90 backdrop-blur-xl border-b border-[#dfbfbc]/30 shadow-[0_1px_8px_rgba(38,24,17,0.04)]">
      <div className="h-16 px-4 flex items-center justify-between max-w-4xl mx-auto">
        {/* Brand identity lockup */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => navigateTo('home')}
        >
          <div className="w-9 h-9 rounded-full bg-[#8b1e1e] flex items-center justify-center p-0.5 shadow-sm shrink-0">
            <img 
              alt="Gia Phả Logo" 
              className="w-full h-full object-contain rounded-full" 
              src={CLAN_BRAND_INFO.logoUrl}
              onError={(e) => {
                // graceful fallback if network image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-serif-heritage text-lg font-bold text-[#6a020a] leading-tight tracking-tight">
                Gia Phả
              </span>
              <span className="text-[#dfbfbc] text-xs">•</span>
              <span className="text-xs font-semibold text-[#755b00] tracking-normal">
                {title || 'Trang Chủ'}
              </span>
            </div>
            <span className="text-[11px] text-[#58413f]/85 leading-none mt-0.5">
              {subtitle || 'Nguyễn Tộc • Đệ Nhị Chi'}
            </span>
          </div>
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-1.5">
          {/* Quick Admin Shortcut */}
          <button
            aria-label="Khu vực quản trị"
            onClick={() => navigateTo('admin')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#58413f] hover:text-[#6a020a] hover:bg-[#ffeae0] transition-colors"
            title="Quản trị dòng họ"
          >
            <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
          </button>

          {/* Export / Backup Shortcut */}
          <button
            aria-label="In và sao lưu gia phả"
            onClick={() => navigateTo('export-backup')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#58413f] hover:text-[#6a020a] hover:bg-[#ffeae0] transition-colors"
            title="Xuất PDF & Sao lưu"
          >
            <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
          </button>

          {/* Notifications button with badge */}
          <button
            aria-label="Thông báo dòng tộc"
            onClick={() => setNotificationsOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#58413f] hover:text-[#6a020a] hover:bg-[#ffeae0] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#fff8f6]"></span>
          </button>

          {/* Profile button */}
          <button
            aria-label="Hồ sơ cá nhân"
            onClick={() => navigateTo('profile')}
            className="w-8 h-8 rounded-full bg-[#6a020a] text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity ml-1"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
