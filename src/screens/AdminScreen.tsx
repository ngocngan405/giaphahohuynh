import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { RolePermission } from '../types/genealogy';
import { CLAN_BRAND_INFO } from '../data/mockData';

export const AdminScreen: React.FC = () => {
  const { 
    goBack, 
    joinRequests, 
    approveJoinRequest, 
    rejectJoinRequest, 
    appUsers, 
    updateUserRole, 
    showToast 
  } = useGenealogy();

  const [inviteCode, setInviteCode] = useState(CLAN_BRAND_INFO.inviteCode);
  const [copied, setCopied] = useState(false);
  const [hideLivingInfo, setHideLivingInfo] = useState(true);
  const [allowEditorDelete, setAllowEditorDelete] = useState(false);
  const [require2FA, setRequire2FA] = useState(true);
  const [showAuditModal, setShowAuditModal] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(inviteCode);
    setCopied(true);
    showToast('Đã sao chép mã mời gia tộc: ' + inviteCode);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'NGUYEN-';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setInviteCode(code);
    showToast('Đã phát hành mã mời gia tộc mới: ' + code);
  };

  const auditLogs = [
    { time: '10:15 - Hôm nay', user: 'Cụ Nguyễn Văn Trọng', action: 'Phê duyệt tài khoản Nguyễn Anh Tuấn vào Đời 6' },
    { time: '16:30 - Hôm qua', user: 'Nguyễn Văn Bình', action: 'Cập nhật tiểu sử và ngày kỵ Cụ Nguyễn Quý Công' },
    { time: '09:20 - 12/09', user: 'Cô Nguyễn Thị Mai', action: 'Thiết lập sự kiện Đại Lễ Giỗ Tổ Thủy Tộc' },
    { time: '14:05 - 10/09', user: 'Cụ Nguyễn Văn Trọng', action: 'Xuất bản sao lưu dữ liệu toàn tộc phả lên Google Drive' },
  ];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Top Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#fff8f6]/95 backdrop-blur-xl border-b border-[#dfbfbc]/30 shadow-xs">
        <div className="h-16 px-4 flex items-center justify-between gap-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={goBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#261811] hover:bg-[#ffeae0] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif-heritage text-sm font-bold text-[#261811] truncate">
                  Quản Trị Dòng Họ
                </h1>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-[#fed255]/30 text-[#735a00] border border-[#fed255]/60 text-[10px] font-bold shrink-0">
                  <span className="material-symbols-outlined text-[12px]">shield_person</span>
                  Quản trị
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#58413f]">
                <span>Hội đồng Gia tộc • Nguyễn Tộc</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#755b00]"></span>
                <span className="text-[#755b00] font-semibold">Toàn quyền</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAuditModal(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#58413f] hover:text-[#6a020a] hover:bg-[#ffeae0]"
            title="Nhật ký hoạt động"
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
          </button>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* 1. Admin Privilege Hero Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-[#8b1e1e] p-5 text-white shadow-md">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fed255]/20 px-2.5 py-1 text-[#ffe08e] text-xs font-bold tracking-wide backdrop-blur-xs">
                <span className="material-symbols-outlined text-[16px]">military_tech</span>
                Trưởng Ban Quản Trị / Tộc Trưởng
              </span>
              <span className="material-symbols-outlined text-[26px] text-[#ffe08e]/80">admin_panel_settings</span>
            </div>
            <h2 className="font-serif-heritage text-lg text-white font-bold tracking-tight mt-1">
              Khu vực Quản trị Gia tộc
            </h2>
            <p className="text-xs text-[#ffdad6] leading-relaxed">
              Thiết lập quyền quản lý, kiểm duyệt thành viên và bảo mật gia phả Họ Nguyễn - Chi 2.
            </p>
          </div>
        </section>

        {/* 2. Clan Profile Card */}
        <section className="rounded-2xl bg-white p-4 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#ffeae0] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px] text-[#6a020a]">temple_buddhist</span>
              </div>
              <div>
                <span className="text-[10px] text-[#755b00] font-bold uppercase tracking-wider block">Phả Hệ Chính Thức</span>
                <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Họ Nguyễn - Chi 2</h3>
              </div>
            </div>
            <button
              onClick={() => showToast('Mở cửa sổ chỉnh sửa thông tin từ đường dòng họ')}
              className="px-3 py-1.5 rounded-xl bg-[#fff1eb] text-xs font-semibold text-[#6a020a] hover:bg-[#ffeae0] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Sửa</span>
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-[#58413f] pt-1">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#755b00] shrink-0 mt-0.5">location_on</span>
              <span>Từ đường Phủ Lỗ, Sóc Sơn, TP. Hà Nội</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#755b00] shrink-0 mt-0.5">history_edu</span>
              <span>Thủy Tổ: Cụ Nguyễn Quý Công (Khởi lập 1820)</span>
            </div>
          </div>

          <div className="bg-[#fff1eb] rounded-xl p-3 flex items-center justify-around text-center mt-1">
            <div>
              <span className="block font-serif-heritage text-base font-bold text-[#6a020a]">7</span>
              <span className="block text-[10px] text-[#58413f]">Thế Hệ (Đời)</span>
            </div>
            <div className="w-px h-7 bg-[#dfbfbc]/50"></div>
            <div>
              <span className="block font-serif-heritage text-base font-bold text-[#6a020a]">128</span>
              <span className="block text-[10px] text-[#58413f]">Nhân Khẩu</span>
            </div>
            <div className="w-px h-7 bg-[#dfbfbc]/50"></div>
            <div>
              <span className="block font-serif-heritage text-base font-bold text-[#755b00]">48</span>
              <span className="block text-[10px] text-[#58413f]">Tài Khoản App</span>
            </div>
          </div>
        </section>

        {/* 3. Clan Invite Code */}
        <section className="rounded-2xl bg-white p-4 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#6a020a]">vpn_key</span>
            <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Mã Mời Gia Tộc</h3>
          </div>
          <p className="text-xs text-[#58413f] leading-relaxed">
            Chia sẻ mã này để con cháu Họ Nguyễn nhập khi đăng ký tài khoản gia nhập gia tộc.
          </p>

          <div className="rounded-xl bg-[#fff1eb] p-4 flex flex-col items-center justify-center text-center border border-[#dfbfbc]/40">
            <div className="font-serif-heritage text-lg tracking-widest text-[#6a020a] font-bold">
              {inviteCode}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[#755b00] text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#755b00]"></span>
              Đang hiệu lực • Hạn dùng 30 ngày
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleCopyCode}
              className={`h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                copied ? 'bg-[#0e3a1f] text-white' : 'bg-[#6a020a] text-white hover:bg-[#8b1e1e]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? 'check_circle' : 'content_copy'}
              </span>
              <span>{copied ? 'Đã sao chép!' : 'Sao chép mã'}</span>
            </button>
            <button
              onClick={() => showToast('Đang tạo liên kết chia sẻ Zalo / Tin nhắn...')}
              className="h-11 rounded-xl bg-[#fed255]/40 hover:bg-[#fed255]/60 text-[#735a00] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Chia sẻ Zalo</span>
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={generateNewCode}
              className="text-xs text-[#58413f] hover:text-[#6a020a] inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">sync</span>
              <span>Thu hồi &amp; tạo mã mới</span>
            </button>
          </div>
        </section>

        {/* 4. Pending Requests */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Yêu Cầu Tham Gia</h3>
              <span className="px-2 py-0.2 rounded-full bg-[#8b1e1e] text-white text-[10px] font-bold">
                {joinRequests.filter(r => r.status === 'pending').length} chờ duyệt
              </span>
            </div>
          </div>
          <p className="text-xs text-[#58413f]">
            Con cháu gửi yêu cầu cần Quản trị viên đối chiếu thế thứ trước khi cấp quyền.
          </p>

          <div className="space-y-3">
            {joinRequests.map(req => (
              <div
                key={req.id}
                className="rounded-2xl bg-white p-4 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={req.avatarUrl}
                    alt={req.fullName}
                    className="w-12 h-12 rounded-full object-cover shrink-0 bg-[#ffeae0]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-serif-heritage text-xs font-bold text-[#261811] truncate">{req.fullName}</h4>
                      <span className="text-[11px] text-[#58413f] shrink-0">{req.birthYear}</span>
                    </div>
                    <p className="text-xs text-[#58413f] mt-1 leading-snug">
                      <strong className="text-[#261811] font-semibold">Khai báo:</strong> {req.declaration}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-[#8b716e]">
                      Gửi lúc: {req.timeAgo}
                    </span>
                  </div>
                </div>

                {req.status === 'pending' ? (
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#dfbfbc]/20">
                    <button
                      onClick={() => rejectJoinRequest(req.id)}
                      className="h-9 rounded-xl bg-[#fff1eb] hover:bg-[#ffeae0] text-[#58413f] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                      <span>Từ chối</span>
                    </button>
                    <button
                      onClick={() => approveJoinRequest(req.id)}
                      className="h-9 rounded-xl bg-[#6a020a] hover:bg-[#8b1e1e] text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      <span>Duyệt vào họ</span>
                    </button>
                  </div>
                ) : (
                  <div className={`p-2 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    req.status === 'approved' ? 'bg-[#bfeec7]/50 text-[#0e3a1f]' : 'bg-[#ffeae0] text-[#8b716e]'
                  }`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {req.status === 'approved' ? 'check_circle' : 'cancel'}
                    </span>
                    <span>{req.status === 'approved' ? 'Đã duyệt vào cây gia phả' : 'Đã từ chối yêu cầu'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. App Members & Role Permissions */}
        <section className="rounded-2xl bg-white p-4 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Thành Viên Ứng Dụng</h3>
            <span className="text-xs text-[#755b00] font-semibold">{appUsers.length} tài khoản</span>
          </div>
          <p className="text-xs text-[#58413f]">
            Phân quyền truy cập và chỉnh sửa cây phả hệ theo vai vế gia đình.
          </p>

          <div className="space-y-2">
            {appUsers.map(user => (
              <div
                key={user.id}
                className="p-3 rounded-xl bg-[#fff1eb] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#fed255]"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-serif-heritage text-xs font-bold text-[#261811] truncate">{user.name}</span>
                    <span className="text-[11px] text-[#58413f] truncate">{user.branch}</span>
                  </div>
                </div>

                <select
                  value={user.role}
                  onChange={(e) => updateUserRole(user.id, e.target.value as RolePermission)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-[#6a020a] border border-[#dfbfbc]/50 outline-none"
                >
                  <option value="admin">Quản trị</option>
                  <option value="editor">Biên tập</option>
                  <option value="viewer">Chỉ xem</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Privacy & Lineage Security Toggles */}
        <section className="rounded-2xl bg-white p-4 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#6a020a]">security</span>
            <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Bảo Mật &amp; Quyền Riêng Tư</h3>
          </div>
          <p className="text-xs text-[#58413f]">
            Quy định kiểm soát việc hiển thị thông tin đời tư con cháu trong phả hệ.
          </p>

          <div className="space-y-3 text-xs">
            {/* Toggle 1 */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="font-semibold text-[#261811] block">Ẩn thông tin người còn sống với người ngoài chi</span>
                <p className="text-[11px] text-[#58413f] mt-0.5 leading-relaxed">
                  Chỉ con cháu thuộc cùng phân chi được xem số điện thoại và nơi cư trú của người đang sống.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={hideLivingInfo}
                  onChange={(e) => setHideLivingInfo(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dfbfbc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#6a020a] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="h-px bg-[#dfbfbc]/30"></div>

            {/* Toggle 2 */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="font-semibold text-[#261811] block">Cho phép biên tập viên xóa thành viên</span>
                <p className="text-[11px] text-[#58413f] mt-0.5 leading-relaxed">
                  Nếu tắt, chỉ tài khoản Quản trị tối cao mới có quyền xóa hồ sơ để tránh thất lạc dữ liệu tiền nhân.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={allowEditorDelete}
                  onChange={(e) => setAllowEditorDelete(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dfbfbc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#6a020a] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="h-px bg-[#dfbfbc]/30"></div>

            {/* Toggle 3 */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="font-semibold text-[#261811] block">Yêu cầu xác thực hai lớp (2FA) cho Ban Quản Trị</span>
                <p className="text-[11px] text-[#58413f] mt-0.5 leading-relaxed">
                  Bảo vệ tài khoản tộc biểu và văn thư gia phả khỏi nguy cơ bị can thiệp trái phép.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={require2FA}
                  onChange={(e) => setRequire2FA(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dfbfbc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#6a020a] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </section>
      </div>

      {/* Audit Log Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-[#dfbfbc]/40 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6a020a] text-[22px]">history</span>
                <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Nhật Ký Quản Trị (Audit Log)</h3>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="w-8 h-8 rounded-full bg-[#fff1eb] flex items-center justify-center text-[#58413f]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto custom-scrollbar">
              {auditLogs.map((log, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#fff1eb] text-xs">
                  <div className="flex items-center justify-between text-[#755b00] font-semibold text-[10px]">
                    <span>{log.user}</span>
                    <span>{log.time}</span>
                  </div>
                  <p className="text-[#261811] mt-1">{log.action}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAuditModal(false)}
              className="w-full h-11 rounded-xl bg-[#6a020a] text-white text-xs font-semibold"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
