import React from 'react';
import { useGenealogy } from '../context/GenealogyContext';

export const ProfileScreen: React.FC = () => {
  const { navigateTo, showToast } = useGenealogy();

  const handleLogout = () => {
    if (window.confirm('Bác/Chú có chắc chắn muốn đăng xuất khỏi hệ thống Gia Phả Họ Nguyễn?')) {
      showToast('Đã đăng xuất an toàn');
      navigateTo('login');
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 gap-4">
      {/* 1. Top Profile Header Card */}
      <section className="relative bg-white rounded-2xl p-5 shadow-xs border border-[#dfbfbc]/30 flex flex-col items-center text-center">
        {/* Avatar with gold ring & camera button */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#fed255] via-[#ecc246] to-[#755b00] shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#ffeae0]">
              <img
                alt="Nguyễn Văn Bình Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh8o442F-TbPfDxSAuK-R953ZgKF8ntMTd3erwVxOcI0D6sow_HqXWWCBuXsBucdpPv725oUVyG7GVXONz0MibRIlFo0R2vFlPLR548T1SUMdfY0HiIXoV0Fhfnr_cQ7zccIMo8qe7RF6SDR6Gg6SgCK1MvgOPcoLA4i9jyCEXaj58iwBVBau8czVTa1ugeWkLxUziIR2qaK4Dc5QzNrQ3RTMMR9HGc8uCbLT1yE0"
              />
            </div>
          </div>
          <button
            onClick={() => showToast('Mở trình chọn ảnh chân dung mới')}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#6a020a] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            title="Đổi ảnh đại diện"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          </button>
        </div>

        {/* User Name */}
        <h2 className="font-serif-heritage text-lg text-[#261811] font-bold tracking-tight">
          Nguyễn Văn Bình
        </h2>

        {/* Role Badge */}
        <div className="mt-1 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#fee3d6] text-[#735a00] text-xs font-semibold">
          <span className="material-symbols-outlined text-[15px]">shield_with_heart</span>
          <span>Biên tập viên Chi 2A</span>
        </div>

        {/* User Contact */}
        <p className="text-xs text-[#58413f] mt-2 flex items-center gap-1.5">
          <span>binh.nguyen@giapha.vn</span>
          <span className="w-1 h-1 rounded-full bg-[#8b716e]"></span>
          <span>0912.***.678</span>
        </p>
      </section>

      {/* 2. Clan Link Card */}
      <section className="bg-[#fff1eb] rounded-2xl p-4 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#8b1e1e] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">account_tree</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6a020a] font-bold">Vị trí phả đồ</span>
              <h3 className="font-serif-heritage text-xs font-bold text-[#261811]">Đời thứ 5 • Nhánh 2A</h3>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#bfeec7] text-[#00210d] font-bold">
            Đã xác thực
          </span>
        </div>

        <div className="bg-white/80 rounded-xl p-2.5 text-xs text-[#261811]">
          <p className="font-semibold text-[#6a020a]">Hồ sơ: Nguyễn Văn Bình (1978)</p>
          <p className="text-[11px] text-[#58413f] mt-0.5">
            Hồ sơ cá nhân được kết nối trực tiếp với cành nhánh chính phái trên Cây Phả Hệ Họ Nguyễn.
          </p>
        </div>

        {/* Stat Chips */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div className="bg-white rounded-xl p-2.5 flex items-center gap-2 border border-[#dfbfbc]/30">
            <span className="material-symbols-outlined text-[18px] text-[#755b00]">candle</span>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-[#261811]">12</span>
              <span className="text-[10px] text-[#58413f]">Đóng góp kỵ nhật</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-2.5 flex items-center gap-2 border border-[#dfbfbc]/30">
            <span className="material-symbols-outlined text-[18px] text-[#6a020a]">diversity_3</span>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-[#261811]">4</span>
              <span className="text-[10px] text-[#58413f]">Thế hệ trực hệ</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigateTo('tree')}
          className="w-full h-10 rounded-xl bg-[#ffeae0] text-[#6a020a] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#fee3d6] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
          <span>Xem vị trí trên cây phả hệ</span>
        </button>
      </section>

      {/* 3. Settings List Sections */}
      {/* Group A: Tài khoản & Phả hệ */}
      <div className="flex flex-col gap-1.5">
        <h4 className="font-serif-heritage text-xs font-bold text-[#261811] px-1">Tài khoản &amp; Phả hệ</h4>
        <div className="bg-white rounded-2xl shadow-xs border border-[#dfbfbc]/30 overflow-hidden flex flex-col">
          <button
            onClick={() => showToast('Mở cập nhật thông tin tài khoản')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#fff1eb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#6a020a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#261811]">Thông tin tài khoản</span>
                <span className="text-[11px] text-[#58413f] truncate">Tên hiển thị, ngày sinh, danh xưng thế thứ</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8b716e] text-[18px]">chevron_right</span>
          </button>
          <div className="h-px bg-[#dfbfbc]/20 mx-3"></div>
          <button
            onClick={() => showToast('Mở đổi mật khẩu & mã PIN')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#fff1eb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#6a020a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#261811]">Đổi mật khẩu &amp; Mã PIN</span>
                <span className="text-[11px] text-[#58413f] truncate">Bảo mật hai lớp (2FA) gia tộc</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8b716e] text-[18px]">chevron_right</span>
          </button>
          <div className="h-px bg-[#dfbfbc]/20 mx-3"></div>
          <button
            onClick={() => navigateTo('clan-onboarding')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#fff1eb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#755b00] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">temple_buddhist</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#261811]">Chuyển / Tạo dòng họ khác</span>
                <span className="text-[11px] text-[#755b00] font-medium truncate">Đang chọn: Họ Nguyễn • Chi 2</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8b716e] text-[18px]">published_with_changes</span>
          </button>
        </div>
      </div>

      {/* Group B: Thiết lập ứng dụng */}
      <div className="flex flex-col gap-1.5">
        <h4 className="font-serif-heritage text-xs font-bold text-[#261811] px-1">Thiết lập ứng dụng</h4>
        <div className="bg-white rounded-2xl shadow-xs border border-[#dfbfbc]/30 overflow-hidden flex flex-col">
          <button
            onClick={() => showToast('Cài đặt thông báo: Đã bật báo trước 7 ngày và 3 ngày theo Âm lịch')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#fff1eb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#6a020a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#261811]">Thông báo &amp; Nhắc giỗ</span>
                <span className="text-[11px] text-[#58413f] truncate">Báo trước 7 ngày, 3 ngày theo Âm Lịch</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8b716e] text-[18px]">chevron_right</span>
          </button>
          <div className="h-px bg-[#dfbfbc]/20 mx-3"></div>
          <button
            onClick={() => showToast('Ngôn ngữ hiện tại: Tiếng Việt (Việt Nam)')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#fff1eb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#6a020a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">translate</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#261811]">Ngôn ngữ hiển thị</span>
                <span className="text-[11px] text-[#58413f] truncate">Tiếng Việt (Kèm phụ chú chữ Hán cổ)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8b716e] text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Group C: Quản trị & Sao lưu nhanh */}
      <div className="flex flex-col gap-1.5">
        <h4 className="font-serif-heritage text-xs font-bold text-[#261811] px-1">Lưu trữ &amp; Quản trị</h4>
        <div className="bg-white rounded-2xl shadow-xs border border-[#dfbfbc]/30 overflow-hidden flex flex-col">
          <button
            onClick={() => navigateTo('admin')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#fff1eb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#6a020a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#261811]">Quản trị dòng họ &amp; Mã mời</span>
                <span className="text-[11px] text-[#58413f] truncate">Duyệt con cháu xin gia nhập, phân quyền</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8b716e] text-[18px]">chevron_right</span>
          </button>
          <div className="h-px bg-[#dfbfbc]/20 mx-3"></div>
          <button
            onClick={() => navigateTo('export-backup')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#fff1eb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#755b00] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#261811]">Xuất file PDF &amp; Sao lưu</span>
                <span className="text-[11px] text-[#58413f] truncate">In khổ A3, tải file GEDCOM, đồng bộ đám mây</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8b716e] text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* 4. Sign Out Button & Footer */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <button
          onClick={handleLogout}
          className="w-full h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Đăng xuất tài khoản</span>
        </button>

        <div className="flex flex-col items-center text-center gap-1 max-w-xs mt-1">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-[#755b00]/40"></span>
            <span className="font-serif-heritage text-xs text-[#755b00] font-bold tracking-wide">
              Kính Tổ Quy Tông • Vạn Đại Xương Minh
            </span>
            <span className="h-px w-6 bg-[#755b00]/40"></span>
          </div>
          <p className="text-[11px] text-[#58413f] leading-relaxed">
            Phụng sự con cháu Họ Nguyễn muôn đời bền vững &amp; rạng danh gia phong.
          </p>
        </div>
      </div>
    </div>
  );
};
