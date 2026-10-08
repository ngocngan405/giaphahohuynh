import React, { useState } from 'react';
import { useGenealogy, ScreenId } from '../context/GenealogyContext';

export const ScreenSwitcherBar: React.FC = () => {
  const { currentScreen, navigateTo, isDeviceFrame, setIsDeviceFrame } = useGenealogy();
  const [isOpen, setIsOpen] = useState(false);

  const screens: Array<{ id: ScreenId; label: string; icon: string; category: string }> = [
    { id: 'home', label: '1. Trang Chủ', icon: 'home', category: 'Chính' },
    { id: 'tree', label: '2. Cây Gia Phả (Phả Đồ)', icon: 'account_tree', category: 'Chính' },
    { id: 'members', label: '3. Danh Bạ Thành Viên', icon: 'groups', category: 'Chính' },
    { id: 'calendar', label: '4. Lịch Tế Tự & Kỵ Nhật', icon: 'calendar_month', category: 'Chính' },
    { id: 'profile', label: '5. Cá Nhân & Cài Đặt', icon: 'person', category: 'Chính' },
    { id: 'event-detail', label: '6. Chi Tiết Lễ Giỗ Tổ', icon: 'temple_buddhist', category: 'Chi tiết' },
    { id: 'add-member', label: '7. Thêm Thành Viên Mới', icon: 'person_add', category: 'Tác vụ' },
    { id: 'add-event', label: '8. Thêm Sự Kiện / Lễ Giỗ', icon: 'event', category: 'Tác vụ' },
    { id: 'admin', label: '9. Quản Trị Dòng Họ', icon: 'admin_panel_settings', category: 'Quản trị' },
    { id: 'export-backup', label: '10. Xuất PDF & Sao Lưu', icon: 'cloud_sync', category: 'Quản trị' },
    { id: 'login', label: '11. Đăng Nhập / Đăng Ký', icon: 'login', category: 'Xác thực' },
    { id: 'clan-onboarding', label: '12. Khởi Tạo / Nhập Mã', icon: 'key', category: 'Xác thực' },
  ];

  const currentLabel = screens.find(s => s.id === currentScreen)?.label || 'Trang Hiện Tại';

  return (
    <div className="bg-[#410003] text-white text-xs px-3 py-1.5 flex items-center justify-between z-50 sticky top-0 shadow-md">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#fed255] animate-pulse"></span>
        <span className="font-semibold text-[#ffe08e]">GIA PHẢ ĐẠI VIỆT</span>
        <span className="text-white/40 hidden sm:inline">|</span>
        <span className="text-white/80 hidden sm:inline">Đang xem:</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 bg-[#6a020a] hover:bg-[#8b1e1e] px-2 py-0.5 rounded text-white font-medium border border-[#fed255]/40 transition-colors"
          >
            <span className="text-[#fed255]">{currentLabel}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-[#fff8f6] text-[#261811] rounded-xl shadow-2xl border border-[#dfbfbc] py-2 z-50 max-h-96 overflow-y-auto custom-scrollbar">
              <div className="px-3 py-1 text-[11px] font-bold text-[#755b00] uppercase tracking-wider border-b border-[#dfbfbc]/40 mb-1">
                Chọn màn hình trong bản thiết kế
              </div>
              {screens.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    navigateTo(s.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-[#ffeae0] transition-colors ${
                    currentScreen === s.id ? 'bg-[#ffdad6] text-[#6a020a] font-bold' : 'text-[#261811]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#755b00]">{s.icon}</span>
                    <span>{s.label}</span>
                  </div>
                  {currentScreen === s.id && (
                    <span className="material-symbols-outlined text-[16px] text-[#6a020a]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/gia-pha-dai-viet.zip"
          download="gia-pha-dai-viet.zip"
          className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#fed255] text-[#735a00] hover:bg-[#ffe08e] font-bold border border-[#fed255] transition-all shadow-xs active:scale-95"
          title="Tải tệp ZIP nén toàn bộ dự án và HTML"
        >
          <span className="material-symbols-outlined text-[14px]">download</span>
          <span>Tải file ZIP</span>
        </a>

        <button
          onClick={() => setIsDeviceFrame(!isDeviceFrame)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
            isDeviceFrame
              ? 'bg-[#ffeae0] text-[#6a020a] font-bold border-[#ffeae0]'
              : 'bg-transparent text-white/90 border-white/20 hover:border-white/50'
          }`}
          title="Chuyển đổi giữa chế độ khung điện thoại hoặc toàn màn hình"
        >
          <span className="material-symbols-outlined text-[14px]">
            {isDeviceFrame ? 'smartphone' : 'laptop'}
          </span>
          <span className="hidden md:inline">{isDeviceFrame ? 'Khung Mobile' : 'Mở rộng'}</span>
        </button>
      </div>
    </div>
  );
};
