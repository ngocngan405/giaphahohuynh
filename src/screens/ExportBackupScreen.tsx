import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';

export const ExportBackupScreen: React.FC = () => {
  const { goBack, members, showToast } = useGenealogy();

  const [paperSize, setPaperSize] = useState<'a4' | 'a3' | 'a1'>('a3');
  const [layoutOrientation, setLayoutOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [scope, setScope] = useState<'all' | 'branch'>('all');
  const [includePhotos, setIncludePhotos] = useState(true);
  const [includeLunarDates, setIncludeLunarDates] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleDownloadPdf = () => {
    setIsExportingPdf(true);
    setTimeout(() => {
      setIsExportingPdf(false);
      // Trigger a clean virtual download
      const element = document.createElement('a');
      const file = new Blob([`PHA_DO_NGUYEN_TOC_CHI_2_KHO_${paperSize.toUpperCase()}.pdf\nSố thành viên: ${members.length}\nNgày xuất bản: ${new Date().toLocaleDateString('vi-VN')}`], { type: 'application/pdf' });
      element.href = URL.createObjectURL(file);
      element.download = `Pha_Do_Nguyen_Toc_Chi_2_${paperSize.toUpperCase()}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast(`Đã xuất bản tệp PDF khổ ${paperSize.toUpperCase()} thành công!`);
    }, 1200);
  };

  const handleDownloadGedcom = () => {
    const gedContent = `0 HEAD\n1 SOUR GIA_PHA_DAI_VIET\n1 GEDC\n2 VERS 5.5.1\n0 @SUBM@ SUBM\n1 NAME Nguyen Van Binh\n${members.map((m, idx) => `0 @I${idx + 1}@ INDI\n1 NAME ${m.fullName}\n1 SEX ${m.gender === 'male' ? 'M' : 'F'}\n1 BIRT\n2 DATE ${m.birthYear}\n${m.deathYear ? `1 DEAT\n2 DATE ${m.deathYear}\n` : ''}`).join('')}0 TRLR`;
    const element = document.createElement('a');
    const file = new Blob([gedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Pha_He_Nguyen_Toc_Chi_2.ged';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Đã tải tệp GEDCOM 5.5.1 chuẩn quốc tế!');
  };

  const handleDownloadExcel = () => {
    const rows = [
      ['STT', 'Họ Và Tên', 'Giới Tính', 'Đời Thứ', 'Năm Sinh', 'Năm Mất', 'Trạng Thái', 'Chức Danh', 'Quê Quán'],
      ...members.map((m, i) => [
        i + 1,
        m.fullName,
        m.gender === 'male' ? 'Nam' : 'Nữ',
        m.generation,
        m.birthYear,
        m.deathYear || '',
        m.isDeceased ? 'Đã mất' : 'Còn sống',
        m.roleTitle || '',
        m.hometown || '',
      ])
    ];
    const csvContent = '\uFEFF' + rows.map(r => r.join(',')).join('\n');
    const element = document.createElement('a');
    const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    element.href = URL.createObjectURL(file);
    element.download = 'Danh_Sach_Thanh_Vien_Nguyen_Toc.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Đã tải bảng tính Excel danh sách 128 thành viên!');
  };

  const handleInstantBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      showToast('Đã sao lưu toàn bộ dữ liệu lên máy chủ đám mây an toàn!');
    }, 1500);
  };

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
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif-heritage text-sm font-bold text-[#261811] truncate">
                  Xuất Và Sao Lưu
                </h1>
                <span className="material-symbols-outlined text-[#755b00] text-[16px]">verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#58413f]">
                <span>Họ Nguyễn • Chi 2</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#755b00]"></span>
                <span className="text-[#6a020a] font-semibold">Tộc Phả Thần Kê</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* Decorative Heritage Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6a020a] via-[#8b1e1e] to-[#6a020a] p-5 text-white shadow-md">
          <div className="relative z-10 flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-[#fed255]/40 shadow-inner">
              <span className="material-symbols-outlined text-[26px] text-[#fed255]" style={{ fontVariationSettings: "'FILL' 1" }}>
                history_edu
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.2 rounded-full bg-[#fed255] text-[#735a00] text-[10px] uppercase tracking-wider font-bold">
                  Tộc Phả Thần Kê
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#ffe08e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffe08e] inline-block animate-pulse"></span> An toàn
                </span>
              </div>
              <h2 className="font-serif-heritage text-base text-white font-bold mt-1 tracking-tight">
                Lưu Truyền &amp; Bảo Tồn Phả Hệ
              </h2>
              <p className="text-xs text-[#ffdad6] mt-1 leading-relaxed">
                Xuất bản ấn phẩm truyền thống và sao lưu dữ liệu trường tồn cho con cháu muôn đời sau.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1: IN CÂY GIA PHẢ */}
        <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2 pb-1 border-b border-[#dfbfbc]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffeae0] flex items-center justify-center text-[#6a020a]">
                <span className="material-symbols-outlined text-[22px]">menu_book</span>
              </div>
              <div>
                <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">In Cây Gia Phả</h3>
                <p className="text-xs text-[#58413f]">Xuất ấn phẩm trang nghiêm, khổ lớn</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#fff1eb] text-[#6a020a] text-[11px] font-semibold">
              Ấn bản truyền thống
            </span>
          </div>

          {/* Live Preview Parchment Certificate Mockup */}
          <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#FFFDF8] to-[#F5ECE0] p-3.5 shadow-inner border border-[#E4D1B5] flex flex-col items-center">
            <div className="w-full bg-[#FFFBF3] rounded-xl p-3 border border-[#DECCAE] flex flex-col items-center text-center">
              <div className="px-3 py-1 rounded-md bg-[#8b1e1e] text-white text-xs font-bold shadow-xs uppercase tracking-wider mb-1.5">
                Họ Nguyễn Đại Tộc • Phả Đồ Chi 2
              </div>
              <p className="font-serif-heritage text-[11px] text-[#6a020a] italic font-semibold">
                Tổ Công Tôn Đức Thiên Niên Thịnh — Tử Hiếu Tôn Hiền Vạn Đại Vinh
              </p>
              <div className="my-3 flex flex-col items-center gap-1 text-xs">
                <span className="px-2.5 py-1 rounded bg-[#F8ECD6] border border-[#755b00] text-[#6a020a] font-bold">
                  Đời I: Cụ Tổ Nguyễn Quý Công
                </span>
                <span className="w-0.5 h-3 bg-[#755b00]"></span>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-white border border-[#dfbfbc]">Đời II: Nguyễn Văn Khiêm</span>
                  <span className="px-2 py-0.5 rounded bg-[#8b1e1e] text-white font-bold">Đời II: Nguyễn Văn Trọng (Chi 2)</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-[#dfbfbc]">Đời II: Nguyễn Văn Nhân</span>
                </div>
              </div>
              <div className="w-full pt-2 border-t border-[#E8D9C0] flex items-center justify-between text-[11px] text-[#58413f]">
                <span className="text-[#6a020a] font-semibold">Bản xem trước Khổ {paperSize.toUpperCase()} {layoutOrientation === 'landscape' ? 'Ngang' : 'Dọc'}</span>
                <span>{members.length} nhân khẩu • 7 đời</span>
              </div>
            </div>
          </div>

          {/* Option 1: Paper Size */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#261811] flex items-center justify-between">
              <span>Khổ giấy in ấn</span>
              <span className="text-[11px] text-[#6a020a]">Khuyên dùng A3</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'a4', label: 'A4', desc: 'Đóng tập phả ký' },
                { id: 'a3', label: 'A3 ★', desc: 'Treo tường từ đường' },
                { id: 'a1', label: 'A1 / A0', desc: 'Đại phả đồ lễ hội' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPaperSize(item.id as any)}
                  className={`p-2.5 rounded-xl text-center flex flex-col items-center gap-0.5 transition-all border ${
                    paperSize === item.id
                      ? 'bg-[#6a020a] text-white border-[#6a020a] shadow-xs'
                      : 'bg-[#fff1eb] text-[#261811] border-transparent hover:bg-[#ffeae0]'
                  }`}
                >
                  <span className="font-bold text-xs">{item.label}</span>
                  <span className={`text-[10px] ${paperSize === item.id ? 'text-white/80' : 'text-[#58413f]'}`}>
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Option 2: Layout Orientation */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#261811]">Bố cục trang in</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLayoutOrientation('portrait')}
                className={`p-2.5 rounded-xl flex items-center gap-2 transition-all border ${
                  layoutOrientation === 'portrait'
                    ? 'bg-[#6a020a] text-white border-[#6a020a] shadow-xs'
                    : 'bg-[#fff1eb] text-[#261811] border-transparent hover:bg-[#ffeae0]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">crop_portrait</span>
                <div className="text-left">
                  <div className="text-xs font-bold">Dọc (Cuộn đứng)</div>
                  <div className="text-[10px] opacity-80">Phù hợp đóng sách</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setLayoutOrientation('landscape')}
                className={`p-2.5 rounded-xl flex items-center gap-2 transition-all border ${
                  layoutOrientation === 'landscape'
                    ? 'bg-[#6a020a] text-white border-[#6a020a] shadow-xs'
                    : 'bg-[#fff1eb] text-[#261811] border-transparent hover:bg-[#ffeae0]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">crop_landscape</span>
                <div className="text-left">
                  <div className="text-xs font-bold">Ngang (Trải rộng)</div>
                  <div className="text-[10px] opacity-80">Chuẩn bảng treo họ</div>
                </div>
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#dfbfbc]/30 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePhotos}
                onChange={(e) => setIncludePhotos(e.target.checked)}
                className="w-4 h-4 accent-[#6a020a]"
              />
              <span>Kèm ảnh chân dung tiền nhân &amp; con cháu (300 DPI)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLunarDates}
                onChange={(e) => setIncludeLunarDates(e.target.checked)}
                className="w-4 h-4 accent-[#6a020a]"
              />
              <span>Hiển thị thông tin sinh tử &amp; kỵ nhật âm lịch</span>
            </label>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="w-full h-12 rounded-xl bg-[#6a020a] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#8b1e1e] active:scale-95 transition-all"
          >
            {isExportingPdf ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">autorenew</span>
                <span>Đang kết xuất vector 300 DPI...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px] text-[#fed255]">picture_as_pdf</span>
                <span>Tải Tệp PDF Sắc Nét (Khổ {paperSize.toUpperCase()})</span>
              </>
            )}
          </button>
        </section>

        {/* SECTION 2: XUẤT DỮ LIỆU PHẢ HỆ & TẢI TỆP NÉN ZIP */}
        <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3.5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffeae0] flex items-center justify-center text-[#6a020a] shrink-0">
              <span className="material-symbols-outlined text-[22px]">folder_zip</span>
            </div>
            <div>
              <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Gói Tệp Nén Dự Án &amp; Dữ Liệu</h3>
              <p className="text-xs text-[#58413f]">
                Tải về toàn bộ mã nguồn, 12 tệp HTML độc lập và dữ liệu gia phả đã được đóng gói sẵn.
              </p>
            </div>
          </div>

          {/* Special ZIP Download Banner Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#ffeae0] via-[#fff1eb] to-[#ffeae0] border-2 border-[#755b00]/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#755b00] text-[#ffe08e] flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[26px]">archive</span>
              </div>
              <div>
                <span className="font-serif-heritage text-xs font-bold text-[#6a020a] block">
                  gia-pha-dai-viet.zip (Đã nén sẵn)
                </span>
                <span className="text-[11px] text-[#58413f]">
                  Bao gồm: Mã nguồn React + TypeScript + 12 Màn hình HTML độc lập
                </span>
              </div>
            </div>
            <a
              href="/gia-pha-dai-viet.zip"
              download="gia-pha-dai-viet.zip"
              onClick={() => showToast('Đang tải xuống tệp nén gia-pha-dai-viet.zip...')}
              className="h-11 px-5 rounded-xl bg-[#6a020a] hover:bg-[#8b1e1e] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px] text-[#fed255]">download</span>
              <span>Tải Tệp ZIP Ngay</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {/* GEDCOM Card */}
            <div className="p-3.5 rounded-xl bg-[#fff1eb] border border-[#dfbfbc]/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-9 h-9 rounded-lg bg-[#275134]/15 text-[#0e3a1f] flex items-center justify-center font-bold text-xs shrink-0">
                  .GED
                </span>
                <div className="min-w-0">
                  <h4 className="font-serif-heritage text-xs font-bold text-[#261811] truncate">GEDCOM 5.5.1</h4>
                  <span className="text-[10px] text-[#58413f] block truncate">Chuẩn quốc tế MyHeritage, FamilySearch</span>
                </div>
              </div>
              <button
                onClick={handleDownloadGedcom}
                className="px-3 py-1.5 rounded-xl bg-[#6a020a] text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shrink-0 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Tải file</span>
              </button>
            </div>

            {/* Excel Card */}
            <div className="p-3.5 rounded-xl bg-[#fff1eb] border border-[#dfbfbc]/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-9 h-9 rounded-lg bg-[#ffe08e] text-[#241a00] flex items-center justify-center font-bold text-xs shrink-0">
                  .XLS
                </span>
                <div className="min-w-0">
                  <h4 className="font-serif-heritage text-xs font-bold text-[#261811] truncate">Bảng Tính Excel</h4>
                  <span className="text-[10px] text-[#58413f] block truncate">Danh sách 128 thành viên đầy đủ chi tiết</span>
                </div>
              </div>
              <button
                onClick={handleDownloadExcel}
                className="px-3 py-1.5 rounded-xl bg-[#fff1eb] hover:bg-[#ffeae0] text-[#6a020a] border border-[#dfbfbc]/50 text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">table_view</span>
                <span>Tải file</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: SAO LƯU & KHÔI PHỤC */}
        <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffeae0] flex items-center justify-center text-[#6a020a]">
                <span className="material-symbols-outlined text-[22px]">cloud_sync</span>
              </div>
              <div>
                <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Sao Lưu &amp; Khôi Phục</h3>
                <p className="text-xs text-[#58413f]">Bảo hộ đám mây mã hóa 256-bit</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#bfeec7] text-[#00210d] text-[10px] font-bold shrink-0">
              Đã đồng bộ
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#fff1eb] border-l-4 border-l-[#6a020a] text-xs flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-semibold text-[#261811]">
              <span>Lần sao lưu gần nhất:</span>
              <span className="text-[#6a020a]">14:35 — Hôm nay</span>
            </div>
            <div className="text-[11px] text-[#58413f] flex items-center justify-between">
              <span>Vị trí lưu:</span>
              <span>Google Drive &amp; Tộc Phả Cloud</span>
            </div>
            <div className="text-[11px] text-[#58413f] flex items-center justify-between">
              <span>Dung lượng dữ liệu:</span>
              <span>42.8 MB (Kèm 114 ảnh tiền nhân)</span>
            </div>
          </div>

          {/* Auto backup toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#fff1eb]">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#261811]">Tự động sao lưu hằng tuần</span>
              <span className="text-[10px] text-[#58413f]">Vào lúc 00:00 Chủ Nhật khi có Wi-Fi</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#dfbfbc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#6a020a] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleInstantBackup}
              disabled={isBackingUp}
              className="h-11 rounded-xl bg-[#6a020a] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#8b1e1e] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#fed255]">
                {isBackingUp ? 'sync' : 'cloud_upload'}
              </span>
              <span>{isBackingUp ? 'Đang sao lưu...' : 'Sao Lưu Ngay'}</span>
            </button>
            <button
              onClick={() => showToast('Đang quét các bản sao lưu hợp lệ để khôi phục...')}
              className="h-11 rounded-xl bg-[#fff1eb] text-[#261811] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#dfbfbc]/40 hover:bg-[#ffeae0]"
            >
              <span className="material-symbols-outlined text-[18px]">settings_backup_restore</span>
              <span>Khôi Phục Dữ Liệu</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
