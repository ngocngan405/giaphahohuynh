import React, { useState, useRef } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { Member, BranchId } from '../types/genealogy';

export const TreeScreen: React.FC = () => {
  const { 
    members, 
    activeBranch, 
    setActiveBranch, 
    selectedMember, 
    setSelectedMember, 
    navigateTo, 
    showToast 
  } = useGenealogy();

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
  const [selectedGeneration, setSelectedGeneration] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sheetExpanded, setSheetExpanded] = useState<boolean>(true);
  const [expandGen4, setExpandGen4] = useState<boolean>(true);

  // Pan state for the virtual canvas
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - panX, y: e.clientY - panY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPanX(e.clientX - dragStart.current.x);
    setPanY(e.clientY - dragStart.current.y);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX - panX, y: e.touches[0].clientY - panY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    setPanX(e.touches[0].clientX - dragStart.current.x);
    setPanY(e.touches[0].clientY - dragStart.current.y);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(140, Math.max(70, prev + delta)));
  };

  const resetCanvas = () => {
    setZoomLevel(100);
    setPanX(0);
    setPanY(0);
    showToast('Đã căn giữa toàn cảnh phả đồ');
  };

  const locateMe = () => {
    const me = members.find(m => m.id === 'nguyen-van-binh') || members[2];
    setSelectedMember(me);
    setZoomLevel(110);
    setPanX(-60);
    setPanY(-80);
    showToast(`Đã định vị vị trí: ${me.fullName} (Đời ${me.generation})`);
  };

  const currentMember = selectedMember || members[0];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* 1. Lineage Filter & Search Toolbar */}
      <section className="flex flex-col gap-2.5 mb-3">
        {/* Search Bar */}
        <div className="relative w-full flex items-center bg-[#fff1eb] rounded-xl px-3.5 py-1.5 shadow-xs border border-[#dfbfbc]/30">
          <span className="material-symbols-outlined text-[#8b716e] text-[22px] mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên cụ tổ, thành viên, đời thứ..."
            className="w-full bg-transparent py-2 text-xs text-[#261811] placeholder:text-[#8b716e] focus:outline-none font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#8b716e] hover:text-[#6a020a]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={() => showToast('Bộ lọc nâng cao theo phân cành phái')}
            className="flex items-center justify-center p-1.5 rounded-lg text-[#6a020a] hover:bg-[#ffeae0]"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Branch Selection Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveBranch('all')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-semibold transition-all shadow-xs ${
              activeBranch === 'all'
                ? 'bg-[#8b1e1e] text-white'
                : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
            }`}
          >
            Toàn Dòng Họ
          </button>
          <button
            onClick={() => setActiveBranch('chi1')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-semibold transition-all shadow-xs ${
              activeBranch === 'chi1'
                ? 'bg-[#8b1e1e] text-white'
                : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
            }`}
          >
            Đệ Nhất Chi
          </button>
          <button
            onClick={() => setActiveBranch('chi2')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 ${
              activeBranch === 'chi2'
                ? 'bg-[#8b1e1e] text-white ring-1 ring-[#fed255]'
                : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffe08e]"></span>
            Đệ Nhị Chi (Đang xem)
          </button>
          <button
            onClick={() => setActiveBranch('chi3')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-semibold transition-all shadow-xs ${
              activeBranch === 'chi3'
                ? 'bg-[#8b1e1e] text-white'
                : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
            }`}
          >
            Đệ Tam Chi
          </button>
        </div>

        {/* Generation Quick Filter & Canvas Viewport Actions */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedGeneration('all')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                selectedGeneration === 'all'
                  ? 'bg-[#6a020a] text-white'
                  : 'bg-[#ffeae0] text-[#58413f]'
              }`}
            >
              Tất cả
            </button>
            {[1, 2, 3, 4, 5].map(gen => (
              <button
                key={gen}
                onClick={() => setSelectedGeneration(gen)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  selectedGeneration === gen
                    ? 'bg-[#6a020a] text-white'
                    : 'bg-[#ffeae0] text-[#58413f]'
                }`}
              >
                Đời {gen}
              </button>
            ))}
          </div>

          {/* Canvas Tools: Zoom + Mode */}
          <div className="flex items-center gap-1 shrink-0 bg-[#fff1eb] p-1 rounded-xl shadow-xs border border-[#dfbfbc]/30">
            <button
              onClick={() => handleZoom(-10)}
              className="w-6 h-6 flex items-center justify-center rounded-lg text-[#261811] hover:bg-[#ffeae0]"
              title="Thu nhỏ"
            >
              <span className="material-symbols-outlined text-[15px]">remove</span>
            </button>
            <span className="text-[11px] text-[#755b00] font-bold px-1 tabular-nums">
              {zoomLevel}%
            </span>
            <button
              onClick={() => handleZoom(10)}
              className="w-6 h-6 flex items-center justify-center rounded-lg text-[#261811] hover:bg-[#ffeae0]"
              title="Phóng to"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
            </button>
            <div className="w-[1px] h-3 bg-[#dfbfbc] mx-0.5"></div>
            <button
              onClick={() => setViewMode(viewMode === 'tree' ? 'list' : 'tree')}
              className="p-1 rounded-lg text-[#6a020a] hover:bg-[#ffeae0]"
              title="Chuyển chế độ xem cây / danh sách"
            >
              <span className="material-symbols-outlined text-[16px]">
                {viewMode === 'tree' ? 'format_list_bulleted' : 'account_tree'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Tree Canvas Container */}
      {viewMode === 'tree' ? (
        <section 
          className="relative w-full h-[520px] rounded-2xl bg-[#fff1eb] p-4 shadow-sm border border-[#dfbfbc]/40 overflow-hidden select-none cursor-grab active:cursor-grabbing touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Traditional Watermark Motif */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#ffe08e]/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 bottom-12 w-40 h-40 rounded-full bg-[#ffdad6]/30 blur-xl pointer-events-none"></div>

          {/* Canvas Tools Floating (Right Edge) */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 z-20">
            <button
              onClick={locateMe}
              className="w-9 h-9 rounded-full bg-[#8b1e1e] text-white shadow-md flex items-center justify-center active:scale-95 transition-transform"
              title="Vị trí của tôi trong phả hệ"
            >
              <span className="material-symbols-outlined text-[18px]">my_location</span>
            </button>
            <button
              onClick={resetCanvas}
              className="w-9 h-9 rounded-full bg-white/95 text-[#58413f] shadow-md flex items-center justify-center active:scale-95 transition-transform border border-[#dfbfbc]/40"
              title="Căn giữa toàn đồ"
            >
              <span className="material-symbols-outlined text-[18px]">filter_center_focus</span>
            </button>
          </div>

          {/* Generational Ruler (Sticky Left Edge) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/70 backdrop-blur-md z-20 flex flex-col justify-around items-center py-4 border-r border-[#dfbfbc]/30 shadow-xs pointer-events-none">
            <div className="flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-[#8b1e1e] text-white text-[10px] font-bold flex items-center justify-center">I</span>
              <span className="text-[10px] text-[#6a020a] font-bold mt-0.5">1820</span>
            </div>
            <div className="w-3 h-px bg-[#dfbfbc]"></div>
            <div className="flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-[#8b1e1e] text-white text-[10px] font-bold flex items-center justify-center ring-1 ring-[#fed255]">II</span>
              <span className="text-[10px] text-[#6a020a] font-bold mt-0.5">1856</span>
            </div>
            <div className="w-3 h-px bg-[#dfbfbc]"></div>
            <div className="flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-[#ffeae0] text-[#6a020a] text-[10px] font-bold flex items-center justify-center">III</span>
              <span className="text-[10px] text-[#58413f] mt-0.5">1888</span>
            </div>
            <div className="w-3 h-px bg-[#dfbfbc]"></div>
            <div className="flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-[#ffeae0] text-[#6a020a] text-[10px] font-bold flex items-center justify-center">IV</span>
              <span className="text-[10px] text-[#58413f] mt-0.5">1945</span>
            </div>
          </div>

          {/* Virtual Canvas Pan/Zoom Container */}
          <div 
            className="absolute left-14 top-0 w-[780px] h-[700px] transition-transform duration-100 ease-out origin-top-left"
            style={{
              transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel / 100})`
            }}
          >
            {/* SVG Connecting Branch Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Gen 1 to Gen 2 Connector */}
              <path d="M 370 145 L 370 190" stroke="#ecc246" strokeWidth="2.5" fill="none" />
              {/* Gen 2 Horizontal Spanning Bar */}
              <path d="M 140 190 L 600 190" stroke="#ecc246" strokeWidth="2.5" fill="none" />
              {/* Drops to Gen 2 Nodes */}
              <path d="M 140 190 L 140 220" stroke="#ecc246" strokeWidth="2" fill="none" />
              <path d="M 370 190 L 370 220" stroke="#8b1e1e" strokeWidth="3" fill="none" />
              <path d="M 600 190 L 600 220" stroke="#ecc246" strokeWidth="2" fill="none" />
              {/* Gen 2 (Trong) to Gen 3 Connector */}
              <path d="M 370 325 L 370 360" stroke="#8b1e1e" strokeWidth="2.5" fill="none" />
              {/* Gen 3 Horizontal Bar */}
              <path d="M 220 360 L 520 360" stroke="#8b1e1e" strokeWidth="2" fill="none" />
              <path d="M 220 360 L 220 380" stroke="#8b1e1e" strokeWidth="2" fill="none" />
              <path d="M 370 360 L 370 380" stroke="#8b1e1e" strokeWidth="2" fill="none" />
              <path d="M 520 360 L 520 380" stroke="#8b1e1e" strokeWidth="2" fill="none" />
            </svg>

            {/* ==================== ĐỜI 1: THỦY TỔ ==================== */}
            <div className="absolute left-[200px] top-[10px] w-[340px]">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ffe08e] text-[#241a00] text-[11px] font-bold shadow-xs mb-1.5">
                <span className="material-symbols-outlined text-[13px]">stars</span>
                ĐỜI THỨ NHẤT • THỦY TỔ KHỞI DỰNG
              </div>

              {/* Thẻ Thủy Tổ Uy Nghiêm */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(members[0]);
                }}
                className={`w-full bg-white rounded-2xl p-3 shadow-md relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] border ${
                  selectedMember?.id === members[0].id ? 'ring-2 ring-[#6a020a] border-[#6a020a]' : 'border-[#dfbfbc]/40'
                }`}
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#ecc246] via-[#755b00] to-[#ecc246]"></div>
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      className="w-14 h-14 rounded-full object-cover shadow-inner"
                      src={members[0].avatarUrl}
                      alt={members[0].fullName}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#fed255] flex items-center justify-center text-[#6a020a] shadow-xs">
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        spa
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-heritage text-sm text-[#6a020a] font-bold truncate">
                        {members[0].fullName}
                      </h3>
                      <span className="text-[10px] text-[#8b716e] bg-[#ffeae0] px-1.5 py-0.5 rounded font-medium">
                        1820 – 1888
                      </span>
                    </div>
                    <p className="text-[11px] text-[#755b00] font-semibold mt-0.5">Tri Huyện Vĩnh Lộc</p>
                    <div className="mt-1.5 text-[10px] bg-[#fff1eb] p-1.5 rounded-lg text-[#261811] flex items-center justify-between">
                      <span>Phu nhân: Lê Thị Ngọc Mai</span>
                      <span className="text-[#6a020a] font-bold">142 Hậu duệ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== ĐỜI 2: 3 CHI PHÁI ==================== */}
            {/* Chi 1: Khiêm */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMember(members[2]);
              }}
              className="absolute left-[70px] top-[220px] w-[140px] bg-white rounded-xl p-2.5 shadow-sm border border-[#dfbfbc]/40 text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="text-[10px] text-[#755b00] px-1.5 py-0.5 rounded bg-[#ffeae0] font-semibold">
                Đệ Nhất Chi
              </span>
              <div className="w-10 h-10 rounded-full mx-auto my-1.5 overflow-hidden bg-[#ffeae0]">
                <img src={members[2].avatarUrl} alt={members[2].fullName} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-serif-heritage text-xs text-[#261811] font-bold truncate">
                {members[2].fullName}
              </h4>
              <span className="text-[10px] text-[#8b716e]">1852 – 1920</span>
            </div>

            {/* Chi 2: Nguyễn Văn Trọng (Active Highlighted) */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMember(members[3]);
              }}
              className="absolute left-[290px] top-[215px] w-[170px] bg-[#f8ddd1] rounded-2xl p-3 shadow-md border-2 border-[#6a020a] text-center cursor-pointer scale-105 transition-transform relative"
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#8b1e1e] text-white text-[10px] font-bold shadow-xs whitespace-nowrap">
                Đang xem • Trưởng Chi 2
              </div>
              <div className="relative w-12 h-12 rounded-full mx-auto mt-1 mb-1.5 ring-2 ring-[#755b00] overflow-hidden shadow-xs">
                <img src={members[3].avatarUrl} alt={members[3].fullName} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-serif-heritage text-sm text-[#6a020a] font-bold leading-tight">
                {members[3].fullName}
              </h4>
              <span className="text-[11px] text-[#755b00] font-semibold block mt-0.5">1856 – 1931</span>
              <span className="text-[10px] text-[#58413f] bg-white/70 px-1.5 py-0.5 rounded-md inline-block mt-1">
                Hiền thê: Lê Thị Mai
              </span>
            </div>

            {/* Chi 3: Nhân */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMember(members[5]);
              }}
              className="absolute left-[530px] top-[220px] w-[140px] bg-white rounded-xl p-2.5 shadow-sm border border-[#dfbfbc]/40 text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="text-[10px] text-[#755b00] px-1.5 py-0.5 rounded bg-[#ffeae0] font-semibold">
                Đệ Tam Chi
              </span>
              <div className="w-10 h-10 rounded-full mx-auto my-1.5 overflow-hidden bg-[#ffeae0]">
                <img src={members[5].avatarUrl} alt={members[5].fullName} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-serif-heritage text-xs text-[#261811] font-bold truncate">
                {members[5].fullName}
              </h4>
              <span className="text-[10px] text-[#8b716e]">1862 – 1940</span>
            </div>

            {/* ==================== ĐỜI 3: HẬU DUỆ CHI 2 ==================== */}
            <div className="absolute left-[140px] top-[380px] w-[460px] bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-sm border border-[#dfbfbc]/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6a020a]"></span>
                  <span className="font-serif-heritage text-xs text-[#261811] font-bold">
                    Thế Hệ Thứ 3 (Hậu Duệ Cụ Trọng)
                  </span>
                </div>
                <span className="text-[10px] text-[#8b716e]">3 Người con</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {/* Person 1 */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMember(members[6]);
                  }}
                  className={`p-2 rounded-xl bg-[#fff1eb] flex flex-col cursor-pointer transition-colors ${
                    selectedMember?.id === members[6].id ? 'ring-1 ring-[#6a020a] bg-[#fee3d6]' : 'hover:bg-[#ffeae0]'
                  }`}
                >
                  <span className="text-[10px] text-[#6a020a] font-bold">Trưởng Nam</span>
                  <p className="font-serif-heritage text-xs text-[#261811] font-bold truncate mt-0.5">{members[6].fullName}</p>
                  <span className="text-[10px] text-[#8b716e]">1888 – 1965</span>
                  <span className="mt-1 text-[9px] bg-white px-1.5 py-0.5 rounded text-[#58413f] text-center font-medium">22 Hậu duệ</span>
                </div>
                {/* Person 2 */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMember(members[7]);
                  }}
                  className="p-2 rounded-xl bg-[#fff1eb] flex flex-col cursor-pointer hover:bg-[#ffeae0]"
                >
                  <span className="text-[10px] text-[#58413f] font-medium">Thứ Nam</span>
                  <p className="font-serif-heritage text-xs text-[#261811] font-bold truncate mt-0.5">{members[7].fullName}</p>
                  <span className="text-[10px] text-[#8b716e]">1893 – 1972</span>
                  <span className="mt-1 text-[9px] bg-white px-1.5 py-0.5 rounded text-[#58413f] text-center font-medium">18 Hậu duệ</span>
                </div>
                {/* Person 3 */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMember(members[8]);
                  }}
                  className="p-2 rounded-xl bg-[#fff1eb] flex flex-col cursor-pointer hover:bg-[#ffeae0]"
                >
                  <span className="text-[10px] text-[#755b00] font-bold">Trưởng Nữ</span>
                  <p className="font-serif-heritage text-xs text-[#261811] font-bold truncate mt-0.5">{members[8].fullName}</p>
                  <span className="text-[10px] text-[#8b716e]">1898 – 1978</span>
                  <span className="mt-1 text-[9px] bg-white px-1.5 py-0.5 rounded text-[#58413f] text-center font-medium">Xuất giá</span>
                </div>
              </div>
            </div>

            {/* ==================== ĐỜI 4 & 5: NHÁNH MỞ RỘNG ==================== */}
            <div className="absolute left-[140px] top-[490px] w-[460px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandGen4(!expandGen4);
                }}
                className="w-full bg-[#ffeae0] hover:bg-[#fee3d6] transition-colors rounded-xl p-2.5 flex items-center justify-between shadow-xs border border-[#dfbfbc]/40"
              >
                <div className="flex items-center gap-2 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#8b1e1e] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">family_history</span>
                  </div>
                  <div>
                    <div className="font-serif-heritage text-xs text-[#6a020a] font-bold">Thế Hệ Đời Thứ 4, 5 &amp; 6</div>
                    <div className="text-[11px] text-[#58413f]">Nhánh cụ Đạt: Cụ An (Đời 4), Bác Bình (Đời 5), Tuấn (Đời 6)</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#6a020a] text-[20px]">
                  {expandGen4 ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                </span>
              </button>

              {expandGen4 && (
                <div className="mt-2 grid grid-cols-2 gap-2 bg-white/90 p-2.5 rounded-xl border border-[#dfbfbc]/30 shadow-xs">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(members[10]);
                    }}
                    className="p-2 bg-[#fff1eb] rounded-lg text-left cursor-pointer hover:bg-[#fee3d6]"
                  >
                    <span className="text-[10px] text-[#6a020a] font-bold">Đời 4 • Trưởng nhánh</span>
                    <p className="font-serif-heritage text-xs font-bold text-[#261811]">Nguyễn Văn An (1945-2018)</p>
                  </div>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(members[13]);
                    }}
                    className="p-2 bg-[#fff1eb] rounded-lg text-left cursor-pointer hover:bg-[#fee3d6]"
                  >
                    <span className="text-[10px] text-[#755b00] font-bold">Đời 5 • Tôi (Biên tập)</span>
                    <p className="font-serif-heritage text-xs font-bold text-[#261811]">Nguyễn Văn Bình (1978)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mini-Map Interactive Preview (Bottom-Left) */}
          <div className="absolute left-14 bottom-3 z-20 bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-[#dfbfbc]/50 flex flex-col gap-1 w-28">
            <div className="flex items-center justify-between px-1">
              <span className="text-[9px] uppercase tracking-wider text-[#58413f] font-bold">Toàn Đồ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#755b00]"></span>
            </div>
            <div className="relative w-full h-12 bg-[#ffeae0] rounded-lg overflow-hidden flex items-center justify-center">
              <div className="w-3 h-1.5 bg-[#8b1e1e]/70 rounded-xs absolute top-1 left-5"></div>
              <div className="w-2.5 h-1.5 bg-[#755b00]/70 rounded-xs absolute top-4 left-2"></div>
              <div className="w-3.5 h-2 bg-[#6a020a] rounded-xs absolute top-4 left-6"></div>
              <div className="w-2.5 h-1.5 bg-[#755b00]/70 rounded-xs absolute top-4 left-10"></div>
              <div className="w-3 h-1.5 bg-[#8b1e1e]/60 rounded-xs absolute top-7 left-6"></div>
              {/* Active Viewport Bounding Box */}
              <div 
                className="absolute w-12 h-7 border border-[#8b1e1e] bg-[#8b1e1e]/15 rounded pointer-events-none transition-all"
                style={{
                  transform: `translate(${-panX / 20}px, ${-panY / 20}px)`
                }}
              ></div>
            </div>
          </div>
        </section>
      ) : (
        /* Alternate List View */
        <section className="flex flex-col gap-2.5 bg-white rounded-2xl p-4 shadow-sm border border-[#dfbfbc]/30">
          <div className="flex items-center justify-between pb-2 border-b border-[#dfbfbc]/20">
            <h3 className="font-serif-heritage text-sm font-bold text-[#6a020a]">Danh Sách Thành Viên Phả Đồ</h3>
            <span className="text-xs text-[#58413f]">{members.length} người</span>
          </div>
          <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto custom-scrollbar">
            {members.map(member => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                  selectedMember?.id === member.id ? 'bg-[#fee3d6] border border-[#6a020a]' : 'bg-[#fff1eb] hover:bg-[#ffeae0]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={member.avatarUrl} alt={member.fullName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif-heritage text-xs font-bold text-[#261811] truncate">{member.fullName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ffeae0] text-[#6a020a] font-semibold shrink-0">
                        Đời {member.generation}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#58413f] truncate">
                      {member.birthYear} {member.deathYear ? `– ${member.deathYear}` : '– Nay'} • {member.roleTitle || 'Thành viên'}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#8b716e] text-[18px]">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Selected Member Bottom Sheet / Detail Card */}
      <section className="mt-3 bg-white rounded-2xl p-4 shadow-md border border-[#dfbfbc]/40 flex flex-col gap-3">
        {/* Handle Bar */}
        <div className="w-10 h-1 bg-[#dfbfbc] rounded-full mx-auto -mt-1 opacity-70"></div>

        {/* Selected Member Summary Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 rounded-full p-0.5 bg-[#8b1e1e] shrink-0 shadow-xs">
              <img
                src={currentMember.avatarUrl}
                alt={currentMember.fullName}
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#755b00] flex items-center justify-center text-white text-[9px]">
                <span className="material-symbols-outlined text-[10px]">family_history</span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif-heritage text-sm font-bold text-[#6a020a] truncate">
                  {currentMember.fullName}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fed255] text-[#735a00] text-[10px] font-bold shrink-0">
                  Đời {currentMember.generation}
                </span>
              </div>
              <p className="text-xs text-[#58413f] flex items-center gap-1 mt-0.5 truncate">
                <span>{currentMember.birthYear} – {currentMember.deathYear || 'Nay'}</span>
                <span>•</span>
                <span className="text-[#755b00] font-semibold">{currentMember.roleTitle || 'Hậu duệ'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setSheetExpanded(!sheetExpanded)}
            className="w-8 h-8 rounded-full bg-[#fff1eb] flex items-center justify-center text-[#58413f] hover:text-[#6a020a]"
          >
            <span className="material-symbols-outlined text-[18px]">
              {sheetExpanded ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>

        {/* Quick Action Buttons Grid */}
        {sheetExpanded && (
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            <button
              onClick={() => showToast(`Đang mở Phả Ký toàn văn của ${currentMember.fullName}...`)}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#ffdad6]/60 hover:bg-[#ffdad6] text-[#6a020a] active:scale-95 transition-all gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#6a020a] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </div>
              <span className="text-[10px] font-semibold text-center leading-tight">Phả ký</span>
            </button>
            <button
              onClick={() => navigateTo('add-member')}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#fff1eb] hover:bg-[#ffeae0] text-[#261811] active:scale-95 transition-all gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#6a020a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">child_care</span>
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">Thêm con</span>
            </button>
            <button
              onClick={() => navigateTo('add-member')}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#fff1eb] hover:bg-[#ffeae0] text-[#261811] active:scale-95 transition-all gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#755b00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">favorite</span>
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">Phối ngẫu</span>
            </button>
            <button
              onClick={() => navigateTo('add-member')}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#fff1eb] hover:bg-[#ffeae0] text-[#261811] active:scale-95 transition-all gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#ffeae0] text-[#58413f] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">Tiền nhân</span>
            </button>
            <button
              onClick={() => showToast(`Đã dâng một nén tâm hương bái vọng ${currentMember.fullName}`)}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#fff1eb] hover:bg-[#ffeae0] text-[#261811] active:scale-95 transition-all gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#fed255] text-[#735a00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">Dâng hương</span>
            </button>
          </div>
        )}

        {/* Auspicious Memorial Reminder Strip */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#fff1eb] border border-[#dfbfbc]/30 text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#755b00] text-[18px]">notifications_active</span>
            <span className="text-[#261811]">
              Đại Lễ Giỗ Tổ: <strong>18 tháng 8 (Âm lịch)</strong>
            </span>
          </div>
          <span className="text-[11px] text-[#6a020a] font-bold">Còn 5 ngày</span>
        </div>
      </section>

      {/* 4. Legend & Family Tree Summary Card */}
      <section className="mt-3 w-full bg-[#fff1eb] rounded-2xl p-4 shadow-sm border border-[#dfbfbc]/30">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="font-serif-heritage text-xs font-bold text-[#261811] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#755b00] text-[18px]">info</span>
            Chú Giải Phả Đồ
          </h4>
          <span className="text-[11px] text-[#755b00] font-semibold">Tổng: 128 Thành Viên</span>
        </div>

        {/* Badges Explanation */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white text-xs">
            <span className="w-3 h-3 rounded-full bg-[#ecc246]"></span>
            <span>Trưởng Tộc / Chi</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white text-xs">
            <span className="w-3 h-3 rounded-full bg-[#8b1e1e]"></span>
            <span>Nam Đinh (Họ Nội)</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white text-xs">
            <span className="w-3 h-3 rounded-full bg-[#755b00]"></span>
            <span>Nữ Quyến / Dâu</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white text-xs">
            <span className="material-symbols-outlined text-[15px] text-[#8b716e]">spa</span>
            <span>Đã Tạ Thế</span>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigateTo('add-member')}
            className="w-full h-11 bg-[#8b1e1e] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#6a020a] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Thêm Thành Viên Mới Vào Cây
          </button>
          <button
            onClick={() => navigateTo('export-backup')}
            className="w-full h-11 bg-white text-[#6a020a] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-[#ffeae0] transition-all border border-[#dfbfbc]/40"
          >
            <span className="material-symbols-outlined text-[18px] text-[#755b00]">picture_as_pdf</span>
            In Cây Gia Phả Khổ A3 / A0
          </button>
        </div>
      </section>
    </div>
  );
};
