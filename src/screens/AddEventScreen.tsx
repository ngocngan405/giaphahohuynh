import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { ClanEvent } from '../types/genealogy';

export const AddEventScreen: React.FC = () => {
  const { goBack, addEvent, members, showToast } = useGenealogy();

  const [eventType, setEventType] = useState<'ky-nhat' | 'hop-ho' | 'tao-mo' | 'khac'>('ky-nhat');
  const [title, setTitle] = useState('Lễ Giỗ Cụ Nguyễn Văn An (Trưởng Nhánh 2A)');
  const [selectedAncestorId, setSelectedAncestorId] = useState('nguyen-van-an');
  const [lunarDate, setLunarDate] = useState('15 tháng 8 Âm lịch');
  const [solarDate, setSolarDate] = useState('2024-09-17');
  const [repeatYearly, setRepeatYearly] = useState(true);
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('12:00');
  const [location, setLocation] = useState('Từ đường Họ Nguyễn Chi 2, Thôn Phủ Lỗ, Huyện Sóc Sơn, Hà Nội');
  const [reminders, setReminders] = useState<number[]>([3, 7]);
  const [notes, setNotes] = useState('Ban khánh tiết tập trung trước 1 tiếng. Nhánh 2A chuẩn bị mâm lễ chính và văn tế tiên tổ. Đội dâng hương phụ trách trang hoàng bàn thờ từ đường. Dự kiến 10 mâm cỗ truyền thống đón con cháu xa quê.');

  const ancestor = members.find(m => m.id === selectedAncestorId) || members[0];

  const handleToggleReminder = (days: number) => {
    if (reminders.includes(days)) {
      setReminders(reminders.filter(d => d !== days));
    } else {
      setReminders([...reminders, days]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Vui lòng nhập tiêu đề sự kiện');
      return;
    }

    addEvent({
      title: title.trim(),
      type: eventType,
      ancestorId: ancestor.id,
      ancestorName: ancestor.fullName,
      ancestorTitle: ancestor.roleTitle,
      solarDate: solarDate,
      lunarDate: lunarDate,
      timeRange: `${startTime} - ${endTime}`,
      location: location.trim(),
      attendeesCount: 1,
      attendeesAvatars: [],
      schedule: [
        { step: 1, time: startTime, title: 'Đón tiếp & Dâng hương', desc: 'Con cháu tề tựu tại từ đường' },
        { step: 2, time: '09:30', title: 'Hành lễ tế tự', desc: 'Ban khánh tiết tuyên xướng văn tế' },
        { step: 3, time: '11:30', title: 'Thụ lộc gia tộc', desc: 'Dùng bữa cơm thân mật gắn kết gia đình' },
      ],
      comments: [],
    });
  };

  const locationChips = [
    'Từ đường Họ Nguyễn Chi 2, Thôn Phủ Lỗ, Huyện Sóc Sơn, Hà Nội',
    'Nhà Trưởng Họ Nguyễn Văn Chính, Ngõ 12 Đường Hùng Vương, Hà Nội',
    'Khu Lăng Mộ Tổ Tiên, Nghĩa trang Đồng Gốc, Sóc Sơn',
  ];

  return (
    <div className="flex flex-col w-full pb-32">
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
              <h1 className="font-serif-heritage text-sm font-bold text-[#261811] truncate">
                Thêm Sự Kiện Dòng Họ
              </h1>
              <div className="flex items-center gap-1.5 text-[11px] text-[#58413f]">
                <span>Phả hệ Nguyễn Tộc • Chi 2</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#755b00]"></span>
                <span className="text-[#755b00] font-semibold">Tế Tự &amp; Hội Họ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* Banner */}
        <div className="p-4 rounded-2xl bg-[#fff1eb] shadow-xs border border-[#dfbfbc]/30 flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#8b1e1e]/10 flex items-center justify-center shrink-0 text-[#8b1e1e]">
            <span className="material-symbols-outlined text-[22px]">temple_buddhist</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif-heritage text-sm font-bold text-[#6a020a]">
              Thiết Lập Sự Kiện Tộc Ước
            </span>
            <span className="text-xs text-[#58413f] mt-0.5 leading-relaxed">
              Lưu giữ phong tục, nhắc nhở con cháu phụng sự hiếu nghĩa vẹn tròn.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 1. Loại sự kiện */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#261811] flex items-center gap-1">
              <span>Loại sự kiện họ tộc</span>
              <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ky-nhat', title: 'Ngày giỗ (Kỵ nhật)', sub: 'Tế lễ tiên tổ', icon: 'candle' },
                { id: 'hop-ho', title: 'Họp họ niên lệ', sub: 'Bàn việc chung', icon: 'groups' },
                { id: 'tao-mo', title: 'Tảo mộ & Thanh minh', sub: 'Chăm sóc từ phần', icon: 'nature_people' },
                { id: 'khac', title: 'Việc khác', sub: 'Khuyến học, mừng thọ', icon: 'workspace_premium' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEventType(item.id as any)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-left transition-all border ${
                    eventType === item.id
                      ? 'bg-[#6a020a] text-white shadow-xs border-[#6a020a]'
                      : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0] border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${eventType === item.id ? 'bg-white/20 text-[#fed255]' : 'bg-[#ffeae0] text-[#755b00]'}`}>
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">{item.title}</span>
                    <span className={`text-[10px] truncate ${eventType === item.id ? 'text-white/80' : 'text-[#58413f]'}`}>{item.sub}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Tiêu đề sự kiện */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#261811]">Tiêu đề sự kiện <span className="text-[#ba1a1a]">*</span></label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Giỗ Cụ Nguyễn Văn An, Họp họ đầu xuân..."
              className="w-full h-11 px-3.5 rounded-xl bg-white text-xs text-[#261811] shadow-xs border border-[#dfbfbc]/40 focus:outline-none focus:ring-1 focus:ring-[#6a020a]"
            />
          </div>

          {/* 3. Người được giỗ */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#261811]">Người được phụng giỗ</label>
              <span className="text-[11px] text-[#6a020a] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">account_tree</span>
                Liên kết gia phả
              </span>
            </div>

            <div className="rounded-2xl bg-white p-3.5 flex items-center justify-between gap-3 shadow-xs border border-[#dfbfbc]/30">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={ancestor.avatarUrl}
                  alt={ancestor.fullName}
                  className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-[#fed255]"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-heritage text-xs font-bold text-[#261811] truncate">{ancestor.fullName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ffeae0] text-[#6a020a] font-semibold">Đời {ancestor.generation}</span>
                  </div>
                  <span className="text-[11px] text-[#58413f] mt-0.5 truncate">{ancestor.roleTitle || 'Hậu duệ Chi 2'}</span>
                  <span className="text-[10px] text-[#755b00]">Kỵ nhật: {ancestor.lunarDeathDate || '15 tháng 8 ÂL'}</span>
                </div>
              </div>
              <select
                value={selectedAncestorId}
                onChange={(e) => setSelectedAncestorId(e.target.value)}
                className="text-xs font-semibold bg-[#fff1eb] text-[#6a020a] px-2 py-1.5 rounded-lg outline-none"
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.fullName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Ngày & Thời gian */}
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Ngày tổ chức (Âm lịch)</label>
              <input
                type="text"
                value={lunarDate}
                onChange={(e) => setLunarDate(e.target.value)}
                placeholder="Ví dụ: 18 Tháng 8 Âm Lịch"
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Tương ứng Dương lịch</label>
              <input
                type="date"
                value={solarDate}
                onChange={(e) => setSolarDate(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none"
              />
            </div>

            {/* Repeat yearly toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#fff1eb]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#6a020a] text-[20px]">update</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#261811]">Lặp lại hằng năm theo Âm lịch</span>
                  <span className="text-[10px] text-[#58413f]">Tự động thông báo giỗ vào ngày này mỗi năm</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={repeatYearly}
                  onChange={(e) => setRepeatYearly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dfbfbc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#6a020a] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Time range */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[#58413f]">Khai lễ</label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#fff1eb] text-xs font-semibold text-[#261811] focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[#58413f]">Thụ lộc</label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#fff1eb] text-xs font-semibold text-[#261811] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 5. Địa điểm tổ chức */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#261811]">Địa điểm tổ chức</label>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {locationChips.map((loc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLocation(loc)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                    location === loc ? 'bg-[#6a020a] text-white' : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
                  }`}
                >
                  {i === 0 ? 'Từ đường Chi 2' : i === 1 ? 'Nhà Trưởng họ' : 'Lăng mộ tổ'}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white text-xs text-[#261811] shadow-xs border border-[#dfbfbc]/40 focus:outline-none"
            />
          </div>

          {/* 6. Cài đặt nhắc trước */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#261811]">Nhắc nhở con cháu trước ngày lễ</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { days: 1, label: '1 ngày trước' },
                { days: 3, label: '3 ngày trước' },
                { days: 7, label: '7 ngày trước (Khuyên dùng)' },
                { days: 15, label: '15 ngày trước' },
              ].map(item => (
                <button
                  key={item.days}
                  type="button"
                  onClick={() => handleToggleReminder(item.days)}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all border ${
                    reminders.includes(item.days)
                      ? 'bg-[#ffeae0] text-[#6a020a] border-[#6a020a]'
                      : 'bg-[#fff1eb] text-[#58413f] border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    {reminders.includes(item.days) ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 7. Ghi chú & Phân công */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#261811]">Ghi chú &amp; Phân công chuẩn bị</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-white text-xs text-[#261811] shadow-xs border border-[#dfbfbc]/40 focus:outline-none resize-none leading-relaxed"
            ></textarea>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="fixed bottom-0 inset-x-0 z-40 bg-[#fff8f6]/95 backdrop-blur-xl border-t border-[#dfbfbc]/30 p-3 shadow-md pb-safe">
            <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={goBack}
                className="flex-1 h-12 rounded-xl bg-[#fff1eb] text-[#6a020a] font-semibold text-xs hover:bg-[#ffeae0] active:scale-95 transition-all"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="flex-[2] h-12 rounded-xl bg-[#6a020a] text-white font-semibold text-xs shadow-md hover:bg-[#8b1e1e] active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px] text-[#fed255]">bookmark_add</span>
                <span>Lưu &amp; Ban Bố Sự Kiện</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
