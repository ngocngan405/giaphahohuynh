import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { CLAN_BRAND_INFO } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const { navigateTo, setSelectedEventId, newsList, likeNews, showToast } = useGenealogy();
  const [bovongCounts, setBovongCounts] = useState<{ [id: string]: number }>({
    'news-cong-tam-quan': 38,
    'news-mung-tho': 56,
    'news-khuyen-hoc': 42,
  });

  const handleBaiVong = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBovongCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    likeNews(id);
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-24">
      {/* 1. Header Card: Tôn Vinh Dòng Tộc */}
      <section className="relative w-full rounded-2xl bg-[#8b1e1e] text-white p-5 shadow-md overflow-hidden">
        {/* Traditional cloud & paper decorative texture */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#fed255]/10 pointer-events-none blur-xl"></div>
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#fed255] to-transparent opacity-60"></div>

        <div className="relative z-10 flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-[#fed255]/40 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  alt="Huy hiệu Nguyễn Tộc"
                  className="w-full h-full object-contain rounded-full"
                  src={CLAN_BRAND_INFO.logoUrl}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#ffe08e] font-semibold tracking-wider uppercase">
                  Tộc Phả Danh Gia
                </span>
                <h1 className="font-serif-heritage text-xl text-white font-bold tracking-tight">
                  {CLAN_BRAND_INFO.fullTitle}
                </h1>
              </div>
            </div>
            <div className="flex items-center px-2.5 py-1 rounded-full bg-[#6a020a]/80 text-[#fed255] text-xs font-semibold border border-[#fed255]/30">
              Chính Chi
            </div>
          </div>

          {/* Gia huấn tiêu ngữ */}
          <div className="p-2.5 rounded-xl bg-black/25 flex items-center justify-center text-center">
            <p className="font-serif-heritage text-sm italic text-[#ffe08e]">
              “{CLAN_BRAND_INFO.motto}”
            </p>
          </div>

          {/* Thống kê cốt lõi dòng tộc */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div 
              onClick={() => navigateTo('tree')}
              className="flex flex-col p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
            >
              <span className="font-serif-heritage text-lg text-[#ffe08e] font-bold">7</span>
              <span className="text-[11px] text-white/85">Đời Truyền Thừa</span>
            </div>
            <div 
              onClick={() => navigateTo('members')}
              className="flex flex-col p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
            >
              <span className="font-serif-heritage text-lg text-[#ffe08e] font-bold">142</span>
              <span className="text-[11px] text-white/85">Đinh Nam Nữ</span>
            </div>
            <div 
              onClick={() => navigateTo('tree')}
              className="flex flex-col p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
            >
              <span className="font-serif-heritage text-lg text-[#ffe08e] font-bold">3</span>
              <span className="text-[11px] text-white/85">Chi Phái Lớn</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Lối Tắt Nhanh (Quick Actions) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-heritage text-base font-semibold text-[#261811]">Tiện Ích Tộc Vụ</h2>
          <span className="text-xs text-[#755b00] font-medium">Truy cập nhanh</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Cây Phả Hệ */}
          <button
            onClick={() => navigateTo('tree')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0] transition-all text-left shadow-sm active:scale-[0.98]"
            type="button"
          >
            <div className="w-11 h-11 rounded-xl bg-[#fed255]/40 text-[#735a00] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_tree
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate">Cây Phả Hệ</span>
              <span className="text-xs text-[#58413f] truncate">Toàn cảnh 7 đời</span>
            </div>
          </button>

          {/* Ngày Giỗ Sắp Tới */}
          <button
            onClick={() => navigateTo('calendar')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0] transition-all text-left shadow-sm active:scale-[0.98]"
            type="button"
          >
            <div className="w-11 h-11 rounded-xl bg-[#f8ddd1] text-[#8b1e1e] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate">Ngày Giỗ Tới</span>
              <span className="text-xs text-[#58413f] truncate">Lịch tế lễ trọng</span>
            </div>
          </button>

          {/* Quản Trị & Mã Mời */}
          <button
            onClick={() => navigateTo('admin')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0] transition-all text-left shadow-sm active:scale-[0.98]"
            type="button"
          >
            <div className="w-11 h-11 rounded-xl bg-[#fed255]/40 text-[#735a00] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                admin_panel_settings
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate">Quản Trị Tộc</span>
              <span className="text-xs text-[#58413f] truncate">Mã mời & Duyệt đơn</span>
            </div>
          </button>

          {/* Xuất & In Phả Ký */}
          <button
            onClick={() => navigateTo('export-backup')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0] transition-all text-left shadow-sm active:scale-[0.98]"
            type="button"
          >
            <div className="w-11 h-11 rounded-xl bg-[#275134]/15 text-[#0e3a1f] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                menu_book
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate">In & Xuất PDF</span>
              <span className="text-xs text-[#58413f] truncate">A4/A3 & Sao lưu</span>
            </div>
          </button>
        </div>
      </section>

      {/* 3. Thẻ Thông Báo Sự Kiện Trọng Đại / Giỗ Chạp Gần Nhất */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#8b1e1e] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              campaign
            </span>
            <h2 className="font-serif-heritage text-base font-semibold text-[#261811]">
              Sự Kiện Trọng Đại Sắp Tới
            </h2>
          </div>
          <span className="text-xs text-[#6a020a] font-semibold">Tế Lễ Dòng Tộc</span>
        </div>

        <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-[#dfbfbc]/30 flex flex-col gap-4 overflow-hidden">
          {/* Decorative gold top band */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#755b00]"></div>

          {/* Header dòng sự kiện & Countdown Badge */}
          <div className="flex items-start justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-[#fed255] text-[#735a00] text-xs font-bold flex items-center gap-1 shadow-xs">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Còn 5 ngày nữa
            </span>
            <span className="text-xs text-[#58413f] bg-[#ffeae0] px-2.5 py-0.5 rounded-full font-medium">
              Thu Tế 2024
            </span>
          </div>

          {/* Tên sự kiện */}
          <div className="flex flex-col gap-1">
            <h3 className="font-serif-heritage text-lg text-[#8b1e1e] font-bold tracking-tight leading-snug">
              Đại Lễ Giỗ Tổ Thủy Tộc (Nguyễn Quý Công)
            </h3>
            <p className="text-xs text-[#58413f] leading-relaxed">
              Nghi thức cúng giỗ truyền thống tụ hội đầy đủ con cháu nội ngoại ba chi phái.
            </p>
          </div>

          {/* Thời gian & Địa điểm (Split Meta details) */}
          <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#fff1eb] text-[#261811]">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#755b00] text-[20px] shrink-0 mt-0.5">
                calendar_month
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-[#8b1e1e]">18 tháng 8 Âm lịch (Giáp Thìn)</span>
                <span className="text-[11px] text-[#58413f]">Nhằm ngày 20/09/2024 (Dương lịch) • Khởi lễ lúc 08:30</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 pt-1 border-t border-[#dfbfbc]/30">
              <span className="material-symbols-outlined text-[#755b00] text-[20px] shrink-0 mt-0.5">
                temple_buddhist
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#261811]">Từ đường Họ Nguyễn Chi 2</span>
                <span className="text-[11px] text-[#58413f]">Thôn Phủ Lỗ, Xã Phủ Lỗ, Sóc Sơn, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* CTA Button to view event detail */}
          <button
            onClick={() => {
              setSelectedEventId('event-gio-to-thuy-toc');
              navigateTo('event-detail');
            }}
            className="w-full h-12 rounded-xl bg-[#8b1e1e] hover:bg-[#6a020a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            Xem Kế Hoạch &amp; Đăng Ký Dự Lễ
          </button>
        </div>
      </section>

      {/* 4. Lời Dạy Của Tiên Tổ */}
      <section className="relative rounded-2xl bg-[#fee3d6] p-4 shadow-xs overflow-hidden flex items-center gap-3.5 border border-[#dfbfbc]/30">
        <div className="w-11 h-11 rounded-full bg-[#fed255]/60 text-[#735a00] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
        </div>
        <div className="flex flex-col min-w-0 pr-1">
          <span className="text-[11px] text-[#755b00] uppercase font-bold tracking-wider">Gia Huấn Trọng Đạo</span>
          <blockquote className="font-serif-heritage text-xs text-[#261811] italic leading-relaxed mt-0.5">
            “{CLAN_BRAND_INFO.proverb}”
          </blockquote>
        </div>
      </section>

      {/* 5. Bảng Tin Sinh Hoạt Dòng Họ (Clan Bulletin / Feed) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-heritage text-base font-semibold text-[#261811]">
              Tin Tức &amp; Hoạt Động Dòng Tộc
            </h2>
            <p className="text-xs text-[#58413f]">Gắn kết tình thân, lưu dấu truyền thống</p>
          </div>
          <button 
            onClick={() => showToast('Đang hiển thị toàn bộ tin tức mới nhất của dòng họ')}
            className="text-xs text-[#6a020a] hover:text-[#8b1e1e] font-semibold" 
            type="button"
          >
            Xem tất cả
          </button>
        </div>

        {/* Bài viết 1 */}
        {newsList.map((news) => (
          <article 
            key={news.id} 
            className="rounded-2xl bg-white p-4 shadow-sm border border-[#dfbfbc]/30 flex flex-col gap-2.5"
          >
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#ffeae0]">
              <img
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                src={news.imageUrl}
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-[#8b1e1e]/90 text-white text-[11px] font-semibold backdrop-blur-xs">
                {news.category}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[#58413f] text-xs">
                <span>{news.author}</span>
                <span>{news.timeAgo}</span>
              </div>
              <h3 className="font-serif-heritage text-sm text-[#261811] font-bold hover:text-[#6a020a] transition-colors leading-snug">
                {news.title}
              </h3>
              <p className="text-xs text-[#58413f] line-clamp-2 leading-relaxed">
                {news.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#dfbfbc]/20">
              <div className="flex items-center gap-4 text-[#58413f] text-xs">
                <button
                  onClick={(e) => handleBaiVong(news.id, e)}
                  className="flex items-center gap-1 text-[#8b1e1e] font-semibold hover:opacity-80 active:scale-95 transition-all"
                  title="Dâng hương bái vọng"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    volunteer_activism
                  </span>
                  <span>{bovongCounts[news.id] || news.reverenceCount} Lượt bái vọng</span>
                </button>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                  <span>{news.discussionsCount} Thảo luận</span>
                </span>
              </div>
              <button
                onClick={() => showToast('Đã sao chép liên kết bài viết để chia sẻ!')}
                className="w-8 h-8 rounded-full bg-[#fff1eb] text-[#6a020a] flex items-center justify-center hover:bg-[#ffeae0] transition-all"
                type="button"
                title="Chia sẻ"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Floating Action Button (+ Thêm thành viên) */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          onClick={() => navigateTo('add-member')}
          className="flex items-center gap-2 px-4 h-12 rounded-full bg-[#8b1e1e] text-white shadow-xl hover:bg-[#6a020a] active:scale-95 transition-all"
          title="Thêm thành viên mới vào gia phả"
        >
          <span className="material-symbols-outlined text-[22px]">person_add</span>
          <span className="text-xs font-bold pr-1">Thêm thành viên</span>
        </button>
      </div>
    </div>
  );
};
