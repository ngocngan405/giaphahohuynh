import React from 'react';
import { useGenealogy } from '../context/GenealogyContext';

export const NotificationModal: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen, navigateTo, setSelectedEventId } = useGenealogy();

  if (!notificationsOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Nhắc giỗ: Kỵ Nhật Cụ Bà Nguyễn Thị Đoan',
      time: 'Còn 5 ngày nữa (18/08 Âm lịch)',
      icon: 'local_fire_department',
      color: 'text-[#8b1e1e]',
      action: () => {
        setSelectedEventId('event-gio-to-thuy-toc');
        setNotificationsOpen(false);
        navigateTo('event-detail');
      },
    },
    {
      id: 'n2',
      title: 'Họp mặt Ban Khánh Tiết chuẩn bị Tế Thu',
      time: '08:30 sáng Thứ Sáu này tại Từ đường',
      icon: 'groups',
      color: 'text-[#755b00]',
      action: () => {
        setNotificationsOpen(false);
        navigateTo('calendar');
      },
    },
    {
      id: 'n3',
      title: 'Có 3 thành viên mới xin gia nhập dòng họ',
      time: 'Nguyễn Hải Đăng và 2 người khác đang chờ duyệt',
      icon: 'person_add',
      color: 'text-[#0e3a1f]',
      action: () => {
        setNotificationsOpen(false);
        navigateTo('admin');
      },
    },
    {
      id: 'n4',
      title: 'Sao lưu dữ liệu phả tộc định kỳ hoàn tất',
      time: '14:35 hôm nay • Google Drive an toàn',
      icon: 'cloud_done',
      color: 'text-[#755b00]',
      action: () => {
        setNotificationsOpen(false);
        navigateTo('export-backup');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-[#dfbfbc]/40 flex flex-col gap-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfbfbc]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6a020a] text-[22px]">notifications</span>
            <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Thông Báo Dòng Tộc</h3>
          </div>
          <button
            onClick={() => setNotificationsOpen(false)}
            className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#58413f] flex items-center justify-center hover:text-[#261811]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto custom-scrollbar">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={n.action}
              className="p-3 rounded-xl bg-white hover:bg-[#ffeae0] transition-colors cursor-pointer border border-[#dfbfbc]/30 flex items-start gap-3 shadow-xs"
            >
              <div className={`w-8 h-8 rounded-full bg-[#fff1eb] flex items-center justify-center shrink-0 ${n.color}`}>
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif-heritage text-xs font-bold text-[#261811] leading-snug">
                  {n.title}
                </span>
                <span className="text-[11px] text-[#58413f] mt-0.5">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setNotificationsOpen(false)}
          className="w-full h-10 rounded-xl bg-[#6a020a] text-white text-xs font-semibold hover:bg-[#8b1e1e]"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
