import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, ClanEvent, ClanNews, JoinRequest, ClanUser, BranchId, RolePermission } from '../types/genealogy';
import { INITIAL_MEMBERS, INITIAL_EVENTS, CLAN_NEWS_LIST, INITIAL_JOIN_REQUESTS, APP_USERS, CLAN_BRAND_INFO } from '../data/mockData';

export type ScreenId = 
  | 'home'
  | 'tree'
  | 'members'
  | 'calendar'
  | 'profile'
  | 'add-member'
  | 'event-detail'
  | 'add-event'
  | 'admin'
  | 'export-backup'
  | 'login'
  | 'register'
  | 'clan-onboarding';

interface GenealogyContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  previousScreen: ScreenId;
  navigateTo: (screen: ScreenId) => void;
  goBack: () => void;
  
  // Data
  members: Member[];
  addMember: (member: Omit<Member, 'id'>) => void;
  events: ClanEvent[];
  addEvent: (event: Omit<ClanEvent, 'id'>) => void;
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  rsvpEvent: (eventId: string, rsvp: 'attending' | 'declined', guests?: number) => void;
  addEventComment: (eventId: string, text: string) => void;
  
  // Selected Member for Modal / Detail Sheet
  selectedMember: Member | null;
  setSelectedMember: (member: Member | null) => void;
  
  // Branch & Filter
  activeBranch: BranchId;
  setActiveBranch: (branch: BranchId) => void;
  
  // Clan Administration
  joinRequests: JoinRequest[];
  approveJoinRequest: (id: string) => void;
  rejectJoinRequest: (id: string) => void;
  appUsers: ClanUser[];
  updateUserRole: (userId: string, role: RolePermission) => void;
  
  // UI Helpers
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isDeviceFrame: boolean;
  setIsDeviceFrame: (val: boolean) => void;
  newsList: ClanNews[];
  likeNews: (id: string) => void;
  
  // Notification Modal
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
}

const GenealogyContext = createContext<GenealogyContextType | undefined>(undefined);

export const GenealogyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['home']);
  
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('gia_pha_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [events, setEvents] = useState<ClanEvent[]>(() => {
    const saved = localStorage.getItem('gia_pha_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [newsList, setNewsList] = useState<ClanNews[]>(CLAN_NEWS_LIST);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(INITIAL_JOIN_REQUESTS);
  const [appUsers, setAppUsers] = useState<ClanUser[]>(APP_USERS);
  
  const [selectedEventId, setSelectedEventId] = useState<string>('event-gio-to-thuy-toc');
  const [selectedMember, setSelectedMember] = useState<Member | null>(INITIAL_MEMBERS[2]); // Cụ Nguyễn Văn Trọng selected by default
  const [activeBranch, setActiveBranch] = useState<BranchId>('chi2');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('gia_pha_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('gia_pha_events', JSON.stringify(events));
  }, [events]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const navigateTo = (screen: ScreenId) => {
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const prev = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
    }
  };

  const previousScreen = screenHistory[Math.max(0, screenHistory.length - 2)] || 'home';

  const addMember = (memberData: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...memberData,
      id: 'mem-' + Date.now(),
    };
    setMembers(prev => [newMember, ...prev]);
    showToast(`Đã thêm thành viên "${memberData.fullName}" vào phả hệ!`);
    navigateTo('members');
  };

  const addEvent = (eventData: Omit<ClanEvent, 'id'>) => {
    const newEvent: ClanEvent = {
      ...eventData,
      id: 'event-' + Date.now(),
      comments: [],
      attendeesAvatars: [],
      attendeesCount: 1,
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast(`Đã ghi sự kiện "${eventData.title}" vào lịch tế tự!`);
    navigateTo('calendar');
  };

  const rsvpEvent = (eventId: string, rsvp: 'attending' | 'declined', guests = 1) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return {
          ...ev,
          userRsvp: rsvp,
          guestCount: guests,
          attendeesCount: rsvp === 'attending' ? ev.attendeesCount + 1 : Math.max(0, ev.attendeesCount - 1),
        };
      }
      return ev;
    }));
    showToast(rsvp === 'attending' ? 'Đã xác nhận tham dự đại lễ giỗ Tổ!' : 'Đã gửi lời cáo bận đến ban khánh tiết.');
  };

  const addEventComment = (eventId: string, text: string) => {
    const newComment = {
      id: 'c-' + Date.now(),
      author: 'Nguyễn Văn Bình (Tôi)',
      branchTag: 'Chi 2A • Hà Nội',
      time: 'Vừa xong',
      text,
      isNew: true,
    };

    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return {
          ...ev,
          comments: [newComment, ...ev.comments],
        };
      }
      return ev;
    }));
    showToast('Đã đăng lời tâm hương thành công!');
  };

  const approveJoinRequest = (id: string) => {
    setJoinRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    showToast('Đã duyệt thành viên vào hệ thống gia phả Họ Nguyễn!');
  };

  const rejectJoinRequest = (id: string) => {
    setJoinRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    showToast('Đã từ chối yêu cầu tham gia.');
  };

  const updateUserRole = (userId: string, role: RolePermission) => {
    setAppUsers(prev => prev.map(u => u.id === userId ? {
      ...u,
      role,
      roleName: role === 'admin' ? 'Quản trị' : role === 'editor' ? 'Biên tập' : 'Chỉ xem'
    } : u));
    showToast('Đã cập nhật quyền hạn thành viên.');
  };

  const likeNews = (id: string) => {
    setNewsList(prev => prev.map(n => n.id === id ? { ...n, reverenceCount: n.reverenceCount + 1 } : n));
    showToast('Đã bái vọng tưởng nhớ công đức dòng tộc');
  };

  return (
    <GenealogyContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        previousScreen,
        navigateTo,
        goBack,
        members,
        addMember,
        events,
        addEvent,
        selectedEventId,
        setSelectedEventId,
        rsvpEvent,
        addEventComment,
        selectedMember,
        setSelectedMember,
        activeBranch,
        setActiveBranch,
        joinRequests,
        approveJoinRequest,
        rejectJoinRequest,
        appUsers,
        updateUserRole,
        toastMessage,
        showToast,
        isDeviceFrame,
        setIsDeviceFrame,
        newsList,
        likeNews,
        notificationsOpen,
        setNotificationsOpen,
      }}
    >
      {children}
    </GenealogyContext.Provider>
  );
};

export const useGenealogy = () => {
  const context = useContext(GenealogyContext);
  if (!context) {
    throw new Error('useGenealogy must be used within a GenealogyProvider');
  }
  return context;
};
