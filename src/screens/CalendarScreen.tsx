import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { ClanEvent } from '../types/genealogy';

export const CalendarScreen: React.FC = () => {
  const { events, navigateTo, setSelectedEventId, showToast } = useGenealogy();

  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [filterType, setFilterType] = useState<'all' | 'ky-nhat' | 'hop-ho'>('all');
  const [currentMonth, setCurrentMonth] = useState('Tháng 09 / 2024');
  const [lunarMonth, setLunarMonth] = useState('Tháng 8 Âm lịch (Quý Dậu)');

  const calendarDays = [
    // Pre-pad with previous month (August)
    { solar: 26, lunar: '23', isCurrentMonth: false },
    { solar: 27, lunar: '24', isCurrentMonth: false },
    { solar: 28, lunar: '25', isCurrentMonth: false },
    { solar: 29, lunar: '26', isCurrentMonth: false },
    { solar: 30, lunar: '27', isCurrentMonth: false },
    { solar: 31, lunar: '28', isCurrentMonth: false },
    // September
    { solar: 1, lunar: '29/7', isCurrentMonth: true },
    { solar: 2, lunar: '30', isCurrentMonth: true },
    { solar: 3, lunar: '1/8', isCurrentMonth: true, hasEvent: true, eventType: 'hop-ho' },
    { solar: 4, lunar: '2', isCurrentMonth: true },
    { solar: 5, lunar: '3', isCurrentMonth: true },
    { solar: 6, lunar: '4', isCurrentMonth: true },
    { solar: 7, lunar: '5', isCurrentMonth: true },
    { solar: 8, lunar: '6', isCurrentMonth: true },
    { solar: 9, lunar: '7', isCurrentMonth: true },
    { solar: 10, lunar: '8', isCurrentMonth: true },
    { solar: 11, lunar: '9', isCurrentMonth: true },
    { solar: 12, lunar: '10', isCurrentMonth: true },
    { solar: 13, lunar: '11', isCurrentMonth: true },
    { solar: 14, lunar: '12', isCurrentMonth: true },
    { solar: 15, lunar: '13', isCurrentMonth: true },
    { solar: 16, lunar: '14', isCurrentMonth: true },
    // 17 Sep (Selected Major Memorial)
    { solar: 17, lunar: '15/8', isCurrentMonth: true, hasEvent: true, eventType: 'ky-nhat', isMajor: true },
    { solar: 18, lunar: '16', isCurrentMonth: true },
    { solar: 19, lunar: '17', isCurrentMonth: true },
    // 20 Sep (Giỗ Tổ & Họp)
    { solar: 20, lunar: '18', isCurrentMonth: true, hasEvent: true, eventType: 'hop-ho', isMajor: true },
    { solar: 21, lunar: '19', isCurrentMonth: true },
    { solar: 22, lunar: '20', isCurrentMonth: true },
    { solar: 23, lunar: '21', isCurrentMonth: true },
    { solar: 24, lunar: '22', isCurrentMonth: true },
    { solar: 25, lunar: '23', isCurrentMonth: true },
    { solar: 26, lunar: '24', isCurrentMonth: true },
    { solar: 27, lunar: '25', isCurrentMonth: true },
    // 28 Sep (Giỗ Cụ Cẩn & Khuyến học)
    { solar: 28, lunar: '26', isCurrentMonth: true, hasEvent: true, eventType: 'ky-nhat' },
    { solar: 29, lunar: '27', isCurrentMonth: true },
    { solar: 30, lunar: '28', isCurrentMonth: true },
  ];

  const filteredEvents = events.filter(e => {
    if (filterType === 'ky-nhat') return e.type === 'ky-nhat';
    if (filterType === 'hop-ho') return e.type === 'hop-ho' || e.type === 'khac';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Top Banner & Motto */}
      <section className="pt-2 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-[#fff1eb] p-4 shadow-xs border border-[#dfbfbc]/30">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-xs text-[#58413f] w-fit shadow-xs">
                <span className="material-symbols-outlined text-[14px] text-[#755b00]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  spa
                </span>
                <span className="font-semibold text-[11px]">Kính tổ phụ • Vẹn đạo hiếu</span>
              </div>
              <h1 className="font-serif-heritage text-base text-[#6a020a] font-bold tracking-tight mt-1">
                Lịch Tế Tự &amp; Kỵ Nhật
              </h1>
              <p className="text-xs text-[#58413f]">Tháng 9/2024 • Chi 2 Đại Tộc Nguyễn</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="px-2.5 py-1 rounded-lg bg-[#ffe08e] text-[#241a00] text-xs font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                Giáp Thìn
              </span>
              <span className="text-[11px] text-[#755b00] font-semibold">Năm Thịnh Vượng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Month Navigation Bar */}
      <section className="py-2">
        <div className="flex items-center justify-between rounded-xl bg-white p-2 shadow-xs border border-[#dfbfbc]/30">
          <button
            onClick={() => showToast('Đang xem lịch các tháng trước')}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5">
              <span className="font-serif-heritage text-sm font-bold text-[#261811]">{currentMonth}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e1e]"></span>
            </div>
            <span className="text-[11px] text-[#755b00] font-semibold">{lunarMonth}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setSelectedDay(17);
                showToast('Đã về ngày hiện tại');
              }}
              className="px-2.5 py-1 rounded-lg bg-[#ffeae0] text-[#6a020a] text-xs font-bold hover:bg-[#fee3d6]"
            >
              Hôm nay
            </button>
            <button
              onClick={() => showToast('Đang xem lịch các tháng tiếp theo')}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Legend bar */}
        <div className="flex items-center justify-around mt-2 px-2 py-1.5 rounded-lg bg-[#fff1eb] text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6a020a]"></span>
            <span className="text-[#58413f]">Ngày giỗ (Kỵ nhật)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#755b00]"></span>
            <span className="text-[#58413f]">Tế lễ / Họp họ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8b1e1e]"></span>
            <span className="text-[#261811] font-semibold">Đang chọn</span>
          </div>
        </div>
      </section>

      {/* Dual Calendar (Solar & Lunar) Grid */}
      <section className="py-2">
        <div className="p-3 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((w, idx) => (
              <span 
                key={w} 
                className={`text-[11px] font-bold py-1 ${idx === 6 ? 'text-[#6a020a]' : 'text-[#58413f]'}`}
              >
                {w}
              </span>
            ))}
          </div>

          {/* Days Matrix */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((d, index) => {
              const isSelected = d.isCurrentMonth && d.solar === selectedDay;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    if (d.isCurrentMonth) {
                      setSelectedDay(d.solar);
                    }
                  }}
                  className={`h-12 rounded-xl p-1 flex flex-col items-center justify-between transition-all ${
                    !d.isCurrentMonth
                      ? 'opacity-35 bg-[#fff1eb]/40 cursor-default'
                      : isSelected
                      ? 'bg-[#6a020a] text-white shadow-sm ring-1 ring-[#fed255]'
                      : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
                  }`}
                >
                  <span className={`text-xs font-bold leading-none ${isSelected ? 'text-white' : ''}`}>
                    {d.solar}
                  </span>
                  <span className={`text-[10px] leading-none ${isSelected ? 'text-[#ffe08e] font-semibold' : 'text-[#755b00]'}`}>
                    {d.lunar}
                  </span>
                  {d.hasEvent ? (
                    <div className="flex items-center gap-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#fed255]' : d.eventType === 'ky-nhat' ? 'bg-[#6a020a]' : 'bg-[#755b00]'}`}></span>
                    </div>
                  ) : (
                    <span className="h-1.5"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Segmented Control */}
      <section className="py-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
              filterType === 'all'
                ? 'bg-[#6a020a] text-white'
                : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
            }`}
          >
            Tất cả ({events.length})
          </button>
          <button
            onClick={() => setFilterType('ky-nhat')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
              filterType === 'ky-nhat'
                ? 'bg-[#6a020a] text-white'
                : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
            }`}
          >
            Ngày giỗ ({events.filter(e => e.type === 'ky-nhat').length})
          </button>
          <button
            onClick={() => setFilterType('hop-ho')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
              filterType === 'hop-ho'
                ? 'bg-[#6a020a] text-white'
                : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
            }`}
          >
            Họp họ &amp; Tế lễ ({events.filter(e => e.type !== 'ky-nhat').length})
          </button>
        </div>
      </section>

      {/* Agenda & Ritual Events Feed */}
      <section className="pt-2 flex flex-col gap-3">
        {/* Day Context Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="font-serif-heritage text-sm font-bold text-[#261811]">
              Ngày {selectedDay}/09/2024
            </span>
            <span className="text-xs text-[#755b00] font-medium">
              {selectedDay === 17 ? '15 Tháng 8 Âm Lịch • Rằm Trung Thu' : selectedDay === 20 ? '18 Tháng 8 Âm Lịch • Giỗ Tổ' : 'Tháng 8 Âm Lịch'}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#bfeec7] text-[#00210d] text-[11px] font-bold flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            Hoàng Đạo
          </span>
        </div>

        {/* Event Cards */}
        {filteredEvents.map(event => (
          <article
            key={event.id}
            onClick={() => {
              setSelectedEventId(event.id);
              navigateTo('event-detail');
            }}
            className="p-4 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3 cursor-pointer hover:bg-[#fff1eb]/60 transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Date Badge */}
              <div className="flex flex-col items-center justify-center min-w-[56px] p-2 rounded-xl bg-[#fee3d6] text-[#6a020a] shrink-0">
                <span className="text-[10px] text-[#58413f] font-medium leading-none">Rằm</span>
                <span className="font-serif-heritage text-xl font-bold text-[#6a020a] leading-tight my-0.5">
                  {event.solarDate.split('/')[0]}
                </span>
                <span className="text-[10px] text-[#755b00] font-semibold leading-none">{event.lunarDate.split(' ')[0]} {event.lunarDate.split(' ')[1]}</span>
              </div>

              {/* Info Column */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.2 rounded-full bg-[#8b1e1e] text-white text-[10px] font-semibold">
                    {event.type === 'ky-nhat' ? 'Đại Kỵ' : 'Họp Họ'}
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-[#ffeae0] text-[#261811] text-[10px]">
                    Chi 2 • Nhánh Trưởng
                  </span>
                </div>
                <h2 className="font-serif-heritage text-sm font-bold text-[#261811] mt-1 leading-snug hover:text-[#6a020a]">
                  {event.title}
                </h2>
                <p className="text-xs text-[#58413f] truncate mt-0.5">{event.ancestorTitle || event.location}</p>
              </div>
            </div>

            {/* Detail Rows */}
            <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#6a020a]">schedule</span>
                <span className="font-semibold">{event.timeRange}</span>
              </div>
              <div className="flex items-center gap-2 text-[#58413f]">
                <span className="material-symbols-outlined text-[16px] text-[#755b00]">location_on</span>
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* Attendance & Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#58413f]">
                {event.attendeesCount} con cháu đã xác nhận
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEventId(event.id);
                  navigateTo('event-detail');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#8b1e1e] text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-transform"
              >
                <span>Xem chi tiết</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Floating Action Button (FAB) */}
      <div className="fixed right-4 bottom-20 z-30">
        <button
          onClick={() => navigateTo('add-event')}
          className="h-12 px-4 rounded-full bg-[#8b1e1e] text-white flex items-center gap-2 shadow-xl hover:bg-[#6a020a] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-[#fed255]">add</span>
          <span className="text-xs font-bold tracking-wide">Báo ngày giỗ / Lễ</span>
        </button>
      </div>
    </div>
  );
};
