import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';

export const EventDetailScreen: React.FC = () => {
  const { events, selectedEventId, goBack, rsvpEvent, addEventComment, showToast } = useGenealogy();

  const event = events.find(e => e.id === selectedEventId) || events[0];
  const [guestCount, setGuestCount] = useState<number>(event.guestCount || 2);
  const [isAttending, setIsAttending] = useState<boolean>(event.userRsvp !== 'declined');
  const [commentText, setCommentText] = useState<string>('');

  const adjustCount = (delta: number) => {
    const nextCount = Math.max(0, guestCount + delta);
    setGuestCount(nextCount);
    if (isAttending) {
      rsvpEvent(event.id, 'attending', nextCount);
    }
  };

  const handleToggleRsvp = (attending: boolean) => {
    setIsAttending(attending);
    rsvpEvent(event.id, attending ? 'attending' : 'declined', guestCount);
  };

  const handlePostComment = () => {
    if (!commentText.trim()) {
      showToast('Vui lòng nhập nội dung tâm hương hoặc lời dâng lễ');
      return;
    }
    addEventComment(event.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="flex flex-col w-full pb-20">
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
                Chi Tiết Sự Kiện • Giỗ Cụ Nguyễn Văn Tổ
              </h1>
              <div className="flex items-center gap-1.5 text-[11px] text-[#58413f]">
                <span>Phả hệ Nguyễn Tộc • Chi 2</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#755b00]"></span>
                <span className="text-[#755b00] font-semibold">Đại Lễ</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => showToast('Đã sao chép liên kết sự kiện để chia sẻ lên nhóm dòng họ!')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#58413f] hover:text-[#6a020a] hover:bg-[#ffeae0]"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Ancestral Temple Visual */}
      <div className="relative w-full h-64 overflow-hidden bg-[#8b1e1e]">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUifBMIdgQMV20aCpLV0466zh5lPnxwtzMmhSNbMCA8e47qUs7dRThQToftRnKGKBIHfiFVx9j32yQtRNDyQIBHcnCOcRKy7L8b6F6UtZ0PTLNNZuPRjjpMoSlSZGLw5HTh2ygk27i3QGvU2okUlvBifx9te9F_mn0-nIrk41uHgeARY2y15UXvfI25OQ3DPAO4MHHyvm4Fj-Wv6XAJ6mX438K9aGbOeaU392m5Vc')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#6a020a]/95 via-[#6a020a]/40 to-transparent"></div>

        {/* Top-left Auspicious Tag */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#fed255] text-[#735a00] px-3 py-1 rounded-full shadow-md">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
          <span className="text-xs font-bold tracking-wide uppercase">Đại Kỵ Gia Tộc</span>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col gap-1">
          <span className="text-xs text-[#ffe08e] font-semibold tracking-widest uppercase">
            {event.ancestorTitle || 'Đời Thứ 1 • Thủy Tổ Chi 2'}
          </span>
          <h2 className="font-serif-heritage text-xl text-white font-bold leading-tight drop-shadow-sm">
            {event.title}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-[#ffdad6] text-xs">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Nghi lễ truyền thống Họ Nguyễn thường niên</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* Song Hành Âm - Dương Lịch Card */}
        <div className="bg-[#fff1eb] rounded-2xl p-4 shadow-xs border border-[#dfbfbc]/40 flex flex-col gap-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#755b00] font-bold uppercase">Ngày Chính Kỵ (Âm Lịch)</span>
              <div className="font-serif-heritage text-lg text-[#6a020a] font-bold mt-0.5">
                {event.lunarDate}
              </div>
              <span className="text-xs text-[#58413f]">Năm Giáp Thìn (2024)</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-xl border border-[#dfbfbc]/30 flex flex-col items-end shrink-0 shadow-xs">
              <span className="text-[11px] text-[#58413f]">Dương lịch</span>
              <span className="font-bold text-sm text-[#261811]">{event.solarDate}</span>
              <span className="text-[11px] text-[#755b00] font-semibold">Thứ Sáu</span>
            </div>
          </div>

          <div className="h-px w-full bg-[#dfbfbc]/30"></div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center gap-2.5 text-[#261811]">
              <span className="material-symbols-outlined text-[#6a020a] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                schedule
              </span>
              <span className="font-bold">{event.timeRange}</span>
              <span className="text-[#58413f]">(Lễ dâng hương &amp; Thụ lộc)</span>
            </div>
            <div className="flex items-center gap-2 bg-[#fed255]/30 px-3 py-1.5 rounded-lg text-[#735a00] font-semibold">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span>Giờ hoàng đạo: Giờ Tỵ (09:00 - 11:00)</span>
            </div>
          </div>
        </div>

        {/* RSVP & Attendance Action Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dfbfbc]/40 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-serif-heritage text-sm font-bold text-[#261811]">
                Xác nhận tham dự giỗ Tổ
              </span>
              <span className="text-xs text-[#58413f]">
                Kính báo ban tổ chức để chuẩn bị thụ lộc chu đáo
              </span>
            </div>
            <span className="material-symbols-outlined text-[#6a020a] text-[24px]">how_to_reg</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleToggleRsvp(true)}
              className={`h-11 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all shadow-xs ${
                isAttending
                  ? 'bg-[#6a020a] text-white ring-2 ring-[#fed255]'
                  : 'bg-[#fff1eb] text-[#58413f] hover:bg-[#ffeae0]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Sẽ tham dự</span>
            </button>
            <button
              onClick={() => handleToggleRsvp(false)}
              className={`h-11 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                !isAttending
                  ? 'bg-[#6a020a] text-white shadow-xs'
                  : 'bg-[#fff1eb] text-[#58413f] hover:bg-[#ffeae0]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              <span>Cáo bận</span>
            </button>
          </div>

          {/* Guest Counter Stepper */}
          {isAttending && (
            <div className="flex items-center justify-between bg-[#fff1eb] p-3 rounded-xl border border-[#dfbfbc]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#58413f] text-[18px]">group_add</span>
                <span className="text-xs font-semibold text-[#261811]">Số người đi cùng:</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustCount(-1)}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#261811] hover:bg-[#ffeae0] shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="font-serif-heritage text-sm font-bold text-[#6a020a] w-5 text-center">
                  {guestCount}
                </span>
                <button
                  onClick={() => adjustCount(1)}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#261811] hover:bg-[#ffeae0] shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          )}

          {/* Attendees Summary */}
          <div className="flex flex-col gap-1.5 pt-1 border-t border-[#dfbfbc]/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#58413f]">Con cháu tề tựu:</span>
              <span className="text-[#6a020a] font-bold">{event.attendeesCount} thành viên đã báo</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <div className="flex -space-x-2">
                {['Tuấn', 'An', 'Mai', 'Bình'].map((name, i) => (
                  <div
                    key={name}
                    className="w-8 h-8 rounded-full bg-[#8b1e1e] text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-2 ring-white"
                  >
                    {name}
                  </div>
                ))}
              </div>
              <span className="text-xs text-[#58413f] pl-1">+{event.attendeesCount - 4} người khác</span>
            </div>
          </div>
        </div>

        {/* Địa Điểm & Bản Đồ */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6a020a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Địa Điểm Tổ Chức</h3>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#dfbfbc]/30 flex flex-col">
            <div className="w-full h-36 bg-[#ffeae0] relative flex items-center justify-center">
              <div className="flex items-center gap-1.5 bg-[#6a020a] text-white px-3 py-1.5 rounded-full shadow-md">
                <span className="material-symbols-outlined text-[18px]">temple_buddhist</span>
                <span className="text-xs font-semibold">Nhà Thờ Họ Nguyễn Chi 2</span>
              </div>
            </div>
            <div className="p-3.5 flex flex-col gap-2.5">
              <div>
                <span className="font-serif-heritage text-xs font-bold text-[#261811] block">Từ đường Họ Nguyễn Chi 2</span>
                <span className="text-xs text-[#58413f]">Thôn Phủ Lỗ, Xã Phủ Lỗ, Huyện Sóc Sơn, TP. Hà Nội</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => showToast('Đang kết nối GPS mở bản đồ chỉ đường...')}
                  className="h-10 bg-[#6a020a] text-white rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold active:opacity-90 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">directions</span>
                  <span>Chỉ đường</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('Từ đường Họ Nguyễn Chi 2, Thôn Phủ Lỗ, Sóc Sơn, Hà Nội');
                    showToast('Đã sao chép địa chỉ từ đường!');
                  }}
                  className="h-10 bg-[#fff1eb] text-[#261811] rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-[#ffeae0]"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>Sao chép</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chủ Tế / Chủ Lễ */}
        {event.masterOfCeremony && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#6a020a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                person_apron
              </span>
              <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Chủ Tế Đại Lễ</h3>
            </div>
            <div className="bg-[#fff1eb] rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs border border-[#dfbfbc]/30">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#755b00]">
                  <img
                    src={event.masterOfCeremony.avatarUrl}
                    alt={event.masterOfCeremony.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-serif-heritage text-xs font-bold text-[#261811] truncate">
                    {event.masterOfCeremony.name}
                  </span>
                  <span className="text-xs text-[#755b00] font-semibold">{event.masterOfCeremony.title}</span>
                  <span className="text-[11px] text-[#58413f]">Điều hành Ban khánh tiết lễ tế</span>
                </div>
              </div>
              <a
                href={`tel:${event.masterOfCeremony.phone}`}
                className="w-10 h-10 rounded-full bg-[#fed255] text-[#735a00] flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-xs"
                title="Gọi điện"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
            </div>
          </div>
        )}

        {/* Chương Trình Nghi Lễ Timeline */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6a020a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              menu_book
            </span>
            <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Chương Trình Nghi Lễ</h3>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
            <p className="text-xs text-[#261811] leading-relaxed">
              Giỗ cụ Thuỷ Tổ là ngày trọng đại quy tụ con cháu tứ xứ về thắp nén tâm hương, tưởng nhớ công đức gây dựng cơ nghiệp của cụ Thuỷ Tổ. Ban Khánh tiết tổ chức lễ tế cổ truyền, tổng kết khuyến học và liên hoan thụ lộc gia tộc thân mật.
            </p>
            <div className="h-px w-full bg-[#dfbfbc]/30"></div>
            <div className="flex flex-col gap-3">
              {event.schedule.map((s, idx) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-[#6a020a] text-white flex items-center justify-center text-[10px] font-bold">
                      {s.step}
                    </div>
                    {idx < event.schedule.length - 1 && (
                      <div className="w-0.5 h-8 bg-[#dfbfbc] mt-1"></div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#6a020a]">{s.time}</span>
                      <span className="font-serif-heritage text-xs font-bold text-[#261811]">{s.title}</span>
                    </div>
                    <span className="text-[11px] text-[#58413f] leading-snug">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thảo Luận & Lời Chúc Con Cháu */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#6a020a] text-[20px]">forum</span>
              <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Tâm Hương &amp; Trao Đổi</h3>
            </div>
            <span className="text-xs text-[#58413f]">{event.comments.length} đóng góp</span>
          </div>

          {/* Comment Input */}
          <div className="bg-white rounded-2xl p-3 shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-2">
            <textarea
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Gửi lời kính viếng hoặc đăng ký đóng góp phẩm vật mâm lễ..."
              className="w-full bg-[#fff1eb] rounded-xl p-3 text-xs text-[#261811] placeholder:text-[#8b716e] focus:outline-none resize-none leading-relaxed"
            ></textarea>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#58413f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#755b00]">volunteer_activism</span>
                Góp giỗ &amp; Lễ vật
              </span>
              <button
                type="button"
                onClick={handlePostComment}
                className="h-9 px-4 bg-[#6a020a] text-white rounded-xl text-xs font-semibold flex items-center gap-1 active:scale-95 shadow-xs"
              >
                <span>Gửi lời nhắn</span>
                <span className="material-symbols-outlined text-[15px]">send</span>
              </button>
            </div>
          </div>

          {/* Comments Feed */}
          <div className="flex flex-col gap-2.5">
            {event.comments.map(c => (
              <div key={c.id} className="bg-[#fff1eb] rounded-2xl p-3.5 flex flex-col gap-1.5 shadow-xs border border-[#dfbfbc]/25">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#8b1e1e] text-white flex items-center justify-center text-[10px] font-bold">
                      {c.author[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#261811]">{c.author}</span>
                      <span className="text-[10px] text-[#58413f]">{c.time}</span>
                    </div>
                  </div>
                  {c.branchTag && (
                    <span className="bg-[#fed255]/50 text-[#735a00] px-2 py-0.2 rounded text-[10px] font-bold">
                      {c.branchTag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#261811] leading-relaxed pt-0.5">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
