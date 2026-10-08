import React, { useState, useMemo } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { Member } from '../types/genealogy';

export const MembersScreen: React.FC = () => {
  const { members, setSelectedMember, navigateTo, showToast } = useGenealogy();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'living' | 'deceased' | 'male' | 'female'>('all');
  const [showEmptyDemo, setShowEmptyDemo] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredMembers = useMemo(() => {
    if (showEmptyDemo) return [];

    return members.filter(m => {
      // Filter type
      if (filterType === 'living' && m.isDeceased) return false;
      if (filterType === 'deceased' && !m.isDeceased) return false;
      if (filterType === 'male' && m.gender !== 'male') return false;
      if (filterType === 'female' && m.gender !== 'female') return false;

      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchName = m.fullName.toLowerCase().includes(query);
        const matchAlias = m.aliasName?.toLowerCase().includes(query);
        const matchRole = m.roleTitle?.toLowerCase().includes(query);
        const matchHometown = m.hometown?.toLowerCase().includes(query);
        const matchGen = `đời ${m.generation}`.includes(query);
        return matchName || matchAlias || matchRole || matchHometown || matchGen;
      }

      return true;
    });
  }, [members, filterType, searchTerm, showEmptyDemo]);

  // Group by first letter of last name / first word
  const groupedMembers = useMemo(() => {
    const groups: { [key: string]: Member[] } = {};
    filteredMembers.forEach(m => {
      // Vietnamese sorting usually by given name (last word in full name)
      const parts = m.fullName.trim().split(' ');
      const givenName = parts[parts.length - 1] || 'A';
      const firstLetter = givenName[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(m);
    });
    return Object.keys(groups).sort((a, b) => a.localeCompare(b, 'vi')).map(letter => ({
      letter,
      list: groups[letter],
    }));
  }, [filteredMembers]);

  const alphabetList = ['A', 'B', 'C', 'D', 'Đ', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'Q', 'S', 'T', 'V', 'X'];

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      showToast(`Chưa có thành viên nào mang tên chữ ${letter}`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Quick Heritage Stats Subheader Banner */}
      <div className="pt-1 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#fff1eb] px-3 py-1.5 rounded-full shadow-xs border border-[#dfbfbc]/30">
          <span className="material-symbols-outlined text-[#755b00] text-[18px]">family_restroom</span>
          <span className="text-xs text-[#261811] font-semibold">{members.length} thành viên</span>
          <span className="text-[#dfbfbc] text-xs">•</span>
          <span className="text-xs text-[#6a020a] font-bold">7 đời gia tộc</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#755b00]">
          <span className="material-symbols-outlined text-[16px]">temple_buddhist</span>
          <span className="text-xs text-[#58413f] italic">Từ đường Phủ Lỗ</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-2 mb-3">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#8b716e] text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (showEmptyDemo) setShowEmptyDemo(false);
            }}
            placeholder="Tìm theo tên, đời, chi, tên tự, quê quán..."
            className="w-full h-11 pl-10 pr-10 bg-white text-xs text-[#261811] rounded-xl shadow-xs border border-[#dfbfbc]/40 focus:outline-none focus:ring-1 focus:ring-[#6a020a]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 w-6 h-6 rounded-full flex items-center justify-center text-[#8b716e] hover:text-[#6a020a]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="inline-flex items-center gap-1 text-xs text-[#58413f]">
            <span className="material-symbols-outlined text-[16px] text-[#755b00]">sort_by_alpha</span>
            <span>Sắp xếp: <strong>Theo vần A-Z</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowEmptyDemo(false)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                !showEmptyDemo
                  ? 'bg-[#8b1e1e] text-white shadow-xs'
                  : 'bg-[#fff1eb] text-[#58413f] hover:bg-[#ffeae0]'
              }`}
            >
              Danh bạ
            </button>
            <button
              onClick={() => setShowEmptyDemo(true)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                showEmptyDemo
                  ? 'bg-[#8b1e1e] text-white shadow-xs'
                  : 'bg-[#fff1eb] text-[#58413f] hover:bg-[#ffeae0]'
              }`}
            >
              Thử rỗng
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips Horizontal Scroller */}
      <div className="w-full overflow-x-auto no-scrollbar pb-2 flex items-center gap-2">
        <button
          onClick={() => {
            setFilterType('all');
            setShowEmptyDemo(false);
          }}
          className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            filterType === 'all' && !showEmptyDemo
              ? 'bg-[#8b1e1e] text-white'
              : 'bg-white text-[#261811] hover:bg-[#ffeae0]'
          }`}
        >
          <span>Tất cả</span>
          <span className="w-4 h-4 rounded-full bg-[#fed255] text-[#735a00] text-[10px] flex items-center justify-center font-bold">
            {members.length}
          </span>
        </button>

        <button
          onClick={() => {
            setFilterType('living');
            setShowEmptyDemo(false);
          }}
          className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            filterType === 'living' && !showEmptyDemo
              ? 'bg-[#8b1e1e] text-white'
              : 'bg-white text-[#261811] hover:bg-[#ffeae0]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#0e3a1f]"></span>
          <span>Còn sống</span>
          <span className="text-xs opacity-75">
            ({members.filter(m => !m.isDeceased).length})
          </span>
        </button>

        <button
          onClick={() => {
            setFilterType('deceased');
            setShowEmptyDemo(false);
          }}
          className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            filterType === 'deceased' && !showEmptyDemo
              ? 'bg-[#8b1e1e] text-white'
              : 'bg-white text-[#261811] hover:bg-[#ffeae0]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px] text-[#755b00]">candle</span>
          <span>Đã quy tiên</span>
          <span className="text-xs opacity-75">
            ({members.filter(m => m.isDeceased).length})
          </span>
        </button>

        <button
          onClick={() => {
            setFilterType('male');
            setShowEmptyDemo(false);
          }}
          className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            filterType === 'male' && !showEmptyDemo
              ? 'bg-[#8b1e1e] text-white'
              : 'bg-white text-[#261811] hover:bg-[#ffeae0]'
          }`}
        >
          <span>Nam (Đinh)</span>
          <span className="text-xs opacity-75">
            ({members.filter(m => m.gender === 'male').length})
          </span>
        </button>

        <button
          onClick={() => {
            setFilterType('female');
            setShowEmptyDemo(false);
          }}
          className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            filterType === 'female' && !showEmptyDemo
              ? 'bg-[#8b1e1e] text-white'
              : 'bg-white text-[#261811] hover:bg-[#ffeae0]'
          }`}
        >
          <span>Nữ (Quyến)</span>
          <span className="text-xs opacity-75">
            ({members.filter(m => m.gender === 'female').length})
          </span>
        </button>
      </div>

      {/* Main Directory Container with Side Alphabet Index */}
      <div className="relative w-full flex">
        {/* Content Column */}
        <div className="flex-1 min-w-0 space-y-4 pr-7">
          {showEmptyDemo || filteredMembers.length === 0 ? (
            /* Empty State Container */
            <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-[#dfbfbc]/30 flex flex-col items-center text-center my-4">
              <div className="w-20 h-20 rounded-full bg-[#ffeae0] flex items-center justify-center mb-3">
                <svg className="w-12 h-12 text-[#8b1e1e] opacity-80" fill="none" viewBox="0 0 48 48">
                  <path d="M24 6C20 12 16 15 11 17C9 22 12 28 17 30C16 32 14 34 11 36H37C34 34 32 32 31 30C36 28 39 22 37 17C32 15 28 12 24 6Z" fill="currentColor" fillOpacity="0.2"></path>
                  <path d="M24 16V36M24 24L18 20M24 28L30 22M24 33L19 30M24 34L29 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
                  <circle cx="17" cy="18" r="2.5" fill="#755b00"></circle>
                  <circle cx="31" cy="20" r="2.5" fill="#755b00"></circle>
                  <circle cx="24" cy="12" r="3" fill="#8b1e1e"></circle>
                </svg>
              </div>
              <h3 className="font-serif-heritage text-base text-[#6a020a] font-bold mb-1">
                Chưa có thành viên nào
              </h3>
              <p className="text-xs text-[#58413f] leading-relaxed max-w-xs mb-4">
                Không tìm thấy thành viên phù hợp với bộ lọc hiện tại hoặc nhánh này chưa được cập nhật dữ liệu.
              </p>
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowEmptyDemo(false);
                    setFilterType('all');
                    setSearchTerm('');
                  }}
                  className="w-full h-11 rounded-xl bg-[#8b1e1e] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  <span>Đặt lại bộ lọc tìm kiếm</span>
                </button>
                <button
                  onClick={() => navigateTo('add-member')}
                  className="w-full h-11 rounded-xl bg-[#fff1eb] text-[#6a020a] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#ffeae0] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>+ Thêm thành viên mới</span>
                </button>
              </div>
            </div>
          ) : (
            groupedMembers.map(({ letter, list }) => (
              <section key={letter} id={`section-${letter}`} className="space-y-2">
                <div className="flex items-center justify-between sticky top-16 z-10 bg-[#fff8f6]/95 backdrop-blur-xs py-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif-heritage text-base text-[#6a020a] font-bold">
                      {letter}
                    </span>
                    <span className="text-[11px] text-[#58413f] font-medium">
                      {list.length} thành viên
                    </span>
                  </div>
                  <span className="h-0.5 flex-1 ml-3 bg-gradient-to-r from-[#dfbfbc] to-transparent rounded-full opacity-40"></span>
                </div>

                {list.map(member => (
                  <article
                    key={member.id}
                    onClick={() => {
                      setSelectedMember(member);
                      navigateTo('tree');
                    }}
                    className="w-full bg-white rounded-xl p-3 shadow-xs border border-[#dfbfbc]/30 flex items-center gap-3 cursor-pointer hover:bg-[#fff1eb] transition-all active:scale-[0.99] relative overflow-hidden"
                  >
                    {member.isDeceased && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#755b00]"></div>
                    )}
                    <div className="relative shrink-0">
                      <img
                        src={member.avatarUrl}
                        alt={member.fullName}
                        className="w-12 h-12 rounded-full object-cover shadow-inner bg-[#ffeae0]"
                      />
                      {member.isDeceased ? (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#755b00] text-[12px]">spa</span>
                        </div>
                      ) : (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#0e3a1f] ring-2 ring-white flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-white"></span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="font-serif-heritage text-xs font-bold text-[#261811] truncate">
                          {member.fullName}
                        </h4>
                        <span className="shrink-0 px-2 py-0.2 rounded-full bg-[#ffeae0] text-[#735a00] text-[10px] font-semibold">
                          {member.roleTitle || `Đời ${member.generation}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#58413f] truncate">
                        Đời {member.generation} • Chi 2 - {member.hometown || 'Thôn Phủ Lỗ'}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                        <span className="text-[#8b716e]">
                          {member.birthYear} – {member.deathYear || 'Nay'}
                        </span>
                        <span className={member.isDeceased ? 'text-[#8b1e1e] font-medium' : 'text-[#0e3a1f] font-semibold'}>
                          {member.isDeceased ? 'Đã quy tiên' : 'Còn sống'}
                        </span>
                      </div>
                    </div>

                    <span className="material-symbols-outlined text-[#dfbfbc] text-[18px] shrink-0">
                      chevron_right
                    </span>
                  </article>
                ))}
              </section>
            ))
          )}
        </div>

        {/* Vertical Alphabet Side Index Column (A-Z) */}
        <aside
          aria-label="Chỉ mục vần chữ cái"
          className="w-6 select-none shrink-0 flex flex-col items-center justify-start space-y-0.5 fixed right-1 top-32 z-20 text-[10px] font-semibold text-[#8b716e] bg-[#fff8f6]/80 p-0.5 rounded-full backdrop-blur-xs"
        >
          {alphabetList.map(letter => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                activeLetter === letter
                  ? 'bg-[#6a020a] text-white font-bold'
                  : 'hover:text-[#6a020a]'
              }`}
            >
              {letter}
            </button>
          ))}
        </aside>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed right-4 bottom-20 z-30">
        <button
          onClick={() => navigateTo('add-member')}
          className="h-12 px-4 rounded-full bg-[#8b1e1e] text-white shadow-xl flex items-center gap-2 hover:bg-[#6a020a] active:scale-95 transition-all"
        >
          <span className="w-5 h-5 rounded-full bg-[#fed255] text-[#735a00] flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">add</span>
          </span>
          <span className="text-xs font-bold tracking-wide pr-1">Thêm thành viên</span>
        </button>
      </div>
    </div>
  );
};
