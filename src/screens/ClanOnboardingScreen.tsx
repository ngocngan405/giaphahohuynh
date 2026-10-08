import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';

export const ClanOnboardingScreen: React.FC = () => {
  const { goBack, navigateTo, showToast } = useGenealogy();

  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [familyName, setFamilyName] = useState('Nguyễn Tộc');
  const [branchName, setBranchName] = useState('Đệ Nhị Chi - Hậu Duệ Phủ Lỗ');
  const [originLocation, setOriginLocation] = useState('Thôn Phủ Lỗ, Xã Phủ Lỗ, Huyện Sóc Sơn, Hà Nội');
  const [joinCode, setJoinCode] = useState(['N', 'G', '7', '8', 'A', '2']);

  const handleCreateClan = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Đã thiết lập không gian gia phả cho "${familyName}"!`);
    navigateTo('tree');
  };

  const handleJoinClan = () => {
    showToast('Đã xác thực mã dòng họ N-G-7-8-A-2 thành công! Chào mừng bà con.');
    navigateTo('home');
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pt-3 pb-16 px-4 max-w-lg mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-[#fff1eb] text-[#261811] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fee3d6] shadow-xs">
          <span className="material-symbols-outlined text-[#6a020a] text-[14px]">stars</span>
          <span className="text-[10px] text-[#6a020a] uppercase font-bold tracking-wider">
            Bước 1 / 2 • Khởi đầu phả hệ
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#8b1e1e] text-white flex flex-col items-center justify-center shadow-xs">
          <span className="font-serif-heritage text-[9px] font-bold tracking-widest text-[#ffe08e]">GIA</span>
          <span className="font-serif-heritage text-[9px] font-bold tracking-widest text-[#ffe08e]">PHẢ</span>
        </div>
      </div>

      {/* Hero Welcome */}
      <div className="flex flex-col gap-1 my-2">
        <div className="flex items-center gap-1.5 text-[#755b00]">
          <span className="material-symbols-outlined text-[16px]">spa</span>
          <span className="text-[11px] font-semibold tracking-wide uppercase">Cội nguồn &amp; Dòng tộc</span>
        </div>
        <h1 className="font-serif-heritage text-lg text-[#6a020a] font-bold">
          Bắt đầu với dòng họ của bạn
        </h1>
        <p className="text-xs text-[#58413f] leading-relaxed">
          Hãy chọn cách thức bạn tham gia vào không gian gia tộc hôm nay để tiếp nối gia phong ngàn đời.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="p-1 rounded-xl bg-[#ffeae0] shadow-xs flex items-center gap-1 my-3">
        <button
          type="button"
          onClick={() => setMode('create')}
          className={`flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'create'
              ? 'bg-[#8b1e1e] text-white shadow-xs'
              : 'text-[#58413f] hover:text-[#261811]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">account_tree</span>
          <span>Tạo dòng họ mới</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('join')}
          className={`flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'join'
              ? 'bg-[#8b1e1e] text-white shadow-xs'
              : 'text-[#58413f] hover:text-[#261811]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">vpn_key</span>
          <span>Tham gia bằng mã</span>
        </button>
      </div>

      {/* Choice Highlights */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div
          onClick={() => setMode('create')}
          className={`p-3 rounded-2xl cursor-pointer transition-all flex flex-col justify-between border ${
            mode === 'create'
              ? 'bg-white shadow-sm border-[#6a020a] ring-1 ring-[#6a020a]'
              : 'bg-[#fff1eb] border-transparent opacity-80'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#ffeae0] flex items-center justify-center text-[#6a020a]">
              <span className="material-symbols-outlined text-[20px]">park</span>
            </div>
            <div>
              <span className="text-[10px] text-[#735a00] bg-[#fed255]/40 px-1.5 py-0.2 rounded font-bold">
                Tộc trưởng / Trưởng chi
              </span>
              <h2 className="font-serif-heritage text-xs font-bold text-[#261811] mt-1">Tạo mới</h2>
              <p className="text-[10px] text-[#58413f] line-clamp-2 mt-0.5">
                Người đầu tiên thiết lập phả hệ tổ tiên
              </p>
            </div>
          </div>
          <span className="text-[11px] text-[#6a020a] font-bold mt-2 flex items-center gap-0.5">
            Chọn tạo lập <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </div>

        <div
          onClick={() => setMode('join')}
          className={`p-3 rounded-2xl cursor-pointer transition-all flex flex-col justify-between border ${
            mode === 'join'
              ? 'bg-white shadow-sm border-[#6a020a] ring-1 ring-[#6a020a]'
              : 'bg-[#fff1eb] border-transparent opacity-80'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#ffeae0] flex items-center justify-center text-[#755b00]">
              <span className="material-symbols-outlined text-[20px]">vpn_key</span>
            </div>
            <div>
              <span className="text-[10px] text-[#58413f] bg-[#ffeae0] px-1.5 py-0.2 rounded font-bold">
                Thành viên kết nối
              </span>
              <h2 className="font-serif-heritage text-xs font-bold text-[#261811] mt-1">Vào chi tộc</h2>
              <p className="text-[10px] text-[#58413f] line-clamp-2 mt-0.5">
                Đã có người thân chia sẻ mã gia phả
              </p>
            </div>
          </div>
          <span className="text-[11px] text-[#755b00] font-bold mt-2 flex items-center gap-0.5">
            Nhập mã số <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </div>
      </div>

      {mode === 'create' ? (
        /* CREATE CLAN FORM */
        <form onSubmit={handleCreateClan} className="flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-1 border-b border-[#dfbfbc]/20">
              <span className="material-symbols-outlined text-[#6a020a] text-[18px]">edit_note</span>
              <h3 className="font-serif-heritage text-xs font-bold text-[#261811]">Thông tin cội nguồn</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Tên dòng họ <span className="text-[#ba1a1a]">*</span></label>
              <input
                type="text"
                required
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Ví dụ: Họ Nguyễn, Họ Trần..."
                className="w-full h-11 px-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Tên chi / nhánh gia phái</label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="Ví dụ: Đệ Nhị Chi, Phái Đông..."
                className="w-full h-11 px-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Quê quán / Nguyên quán <span className="text-[#ba1a1a]">*</span></label>
              <input
                type="text"
                required
                value={originLocation}
                onChange={(e) => setOriginLocation(e.target.value)}
                placeholder="Ví dụ: Xã Cự Khê, Thanh Oai, Hà Nội"
                className="w-full h-11 px-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Ancestral Temple Snapshot */}
            <div className="rounded-xl overflow-hidden relative mt-1 h-24">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF2b6f-6UMLrR6f_gIb_87X02yeqMzM4bTz1LmxTDeV-rpUosDm6cqYJGBItp6akuXdP974PuS8mICsO62lcTVdDkGhxGnbH1JkpnwNQZP75TQiSwSY5PECOn1txWU42B-JfLKKUQpMBZHuQdsgq97IzimNVTGYooAiI0v4CdXUUHU7OpNkQvgqclNALiu2gWkzAv9R1A64XXGYvjCihu-R0zc--nL9mS_wkwqHn8"
                alt="Từ đường"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-2.5">
                <p className="text-[11px] text-white italic">
                  "Cây có cội mới trổ cành xanh ngọn, nước có nguồn mới biển rộng sông sâu."
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#8b1e1e] text-white font-semibold text-xs shadow-md hover:bg-[#6a020a] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Tạo Dòng Họ &amp; Bắt Đầu Cây Phả Hệ</span>
            <span className="material-symbols-outlined text-[18px]">east</span>
          </button>
        </form>
      ) : (
        /* JOIN CLAN BY CODE */
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-1 border-b border-[#dfbfbc]/20">
              <span className="material-symbols-outlined text-[#755b00] text-[18px]">pin</span>
              <h3 className="font-serif-heritage text-xs font-bold text-[#261811]">Nhập mã định danh gia tộc</h3>
            </div>

            <p className="text-xs text-[#58413f]">
              Mã gồm 6 ký tự viết hoa hoặc số do Tộc trưởng hoặc Trưởng chi chia sẻ để mời con cháu vào hệ thống cây gia phả.
            </p>

            {/* Segmented OTP 6-box preview */}
            <div className="flex items-center justify-center gap-2 py-2">
              {joinCode.map((char, index) => (
                <div
                  key={index}
                  className="w-10 h-12 rounded-xl bg-[#fff1eb] text-[#6a020a] flex items-center justify-center font-serif-heritage text-lg font-bold shadow-inner border border-[#dfbfbc]/40"
                >
                  {char}
                </div>
              ))}
            </div>

            {/* Clan Found Preview */}
            <div className="p-3 rounded-xl bg-[#fee3d6] flex items-center gap-3 border border-[#dfbfbc]/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgONWBQaxhU99pZdSwWZyg9dzqZOr_BpDHCmb0bVKpGS_KaAVWFA-2_UCAjQaTlCDwvFZd1FP-kIHLMUNV-QCyJJnoIm4mpP0UpBfGxXU9JrfPcBciGraYv9l-EoBUuY5-TkhdkS0ATgXcuqhS74Fj3WfVMsni41POyugZPHwQ3yA2YF6-qpLA8aLpxJ22sLWoDkwrZvhRjAzPyJHC1bstd1LbSRDSa0C8xSPlxeU"
                alt="Ấn triện"
                className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-[#755b00]"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#6a020a] font-bold uppercase tracking-wider">Đã tìm thấy dòng họ</span>
                <span className="font-serif-heritage text-xs font-bold text-[#261811] truncate">Họ Nguyễn (Phái Tiên Điền - Chi 2)</span>
                <span className="text-[10px] text-[#58413f] truncate">Trưởng tộc: Cụ Nguyễn Văn Trọng (Đời 5)</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleJoinClan}
            className="w-full h-12 rounded-xl bg-[#8b1e1e] text-white font-semibold text-xs shadow-md hover:bg-[#6a020a] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Xác Nhận &amp; Tham Gia Dòng Họ</span>
          </button>
        </div>
      )}
    </div>
  );
};
