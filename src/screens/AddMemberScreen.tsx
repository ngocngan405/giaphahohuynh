import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { Gender } from '../types/genealogy';

export const AddMemberScreen: React.FC = () => {
  const { goBack, addMember, showToast } = useGenealogy();

  const [fullName, setFullName] = useState('');
  const [aliasName, setAliasName] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [birthOrder, setBirthOrder] = useState('1');
  const [motherLink, setMotherLink] = useState('tran_thi_mai');
  const [spouseRank, setSpouseRank] = useState('none');
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [isDeceased, setIsDeceased] = useState(false);
  const [deathDate, setDeathDate] = useState('');
  const [lifespan, setLifespan] = useState('');
  const [burialPlace, setBurialPlace] = useState('');
  const [hometown, setHometown] = useState('Làng Tiên Điền, Nghi Xuân, Hà Tĩnh');
  const [occupation, setOccupation] = useState('');
  const [biography, setBiography] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        showToast('Đã tải ảnh chân dung thành công');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast('Vui lòng nhập họ và tên thành viên');
      return;
    }

    const birthYear = birthDate ? new Date(birthDate).getFullYear() : 2000;
    const deathYear = deathDate ? new Date(deathDate).getFullYear() : undefined;

    addMember({
      fullName: fullName.trim(),
      aliasName: aliasName.trim() || undefined,
      gender,
      generation: 5,
      branchId: 'chi2',
      birthYear,
      deathYear,
      isDeceased,
      birthDate,
      deathDate: isDeceased ? deathDate : undefined,
      lunarDeathDate: isDeceased ? '15 tháng 8 Âm lịch' : undefined,
      burialPlace: isDeceased ? burialPlace : undefined,
      hometown,
      occupation: occupation.trim() || undefined,
      biography: biography.trim() || undefined,
      avatarUrl: avatarPreview || (gender === 'male'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY_8tvHZgwPP4h849UnMIfazRnYWtnXWWRJMJ7cl991UlL_3ULPWCZc-w87OfHhqBpss83vDhjDczf4FqwzMP2uJI6kfx9uDlF2dKnGWwrrP4Ul2dj7fHUXIE6vTvXeE8YeFIQGdlYnUctKX7uDWP7FokWV0ZxvREW0ow29eisQSNYr-8uU2IepbVSUoUDdgnjOd6SELsPaunyjQV4dh5126Ny_aAjqz7XOsAUViM'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOmM2Fu7fdXNthqHJ2_MS3CeJDJvIEu51KU6KZDueb1iRLVTpYXURlDyJ4uLchU90pHmHY9hJ6R6Dua2cPjf3e_ezNe64qnC7lrjCG1_Oo9ILAycfJe4XptMcZkU7ESzrAsJzfpxvZ61JoFigsfKkFZhZtKbQSnALJa7GDymjNmg7l9wqcniXVPExpRafJqh62ByeIc806WXpjN54HBVcX9xSgWw3uUYn8mM5Zhu4'),
      fatherId: 'nguyen-van-an',
      roleTitle: gender === 'male' ? 'Hậu Duệ Chi 2' : 'Ái Nữ Chi 2',
      birthOrder: birthOrder === '1' ? 'Con trưởng' : `Con thứ ${birthOrder}`,
    });
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#fff8f6]/95 backdrop-blur-xl border-b border-[#dfbfbc]/30 shadow-xs">
        <div className="h-16 px-4 flex items-center justify-between gap-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={goBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#261811] hover:bg-[#ffeae0] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0 flex-1">
              <h1 className="font-serif-heritage text-sm font-bold text-[#261811] truncate">
                Thêm Thành Viên
              </h1>
              <div className="flex items-center gap-1.5 text-[11px] text-[#58413f]">
                <span>Phả hệ Nguyễn Tộc - Chi 2</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#755b00]"></span>
                <span className="text-[#6a020a] font-semibold">Bước 1/2: Thông tin cơ bản</span>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#6a020a] text-white flex items-center justify-center text-xs shadow-xs">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1 bg-[#ffeae0]">
          <div className="h-full bg-[#6a020a] w-1/2 rounded-full"></div>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* Heritage Top Context Banner */}
        <section className="w-full">
          <div className="relative overflow-hidden rounded-2xl bg-[#fff1eb] p-4 shadow-xs border border-[#dfbfbc]/40">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-xs font-semibold text-[#6a020a] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#755b00]"></span>
                <span>Đời thứ V (Hậu duệ)</span>
              </div>
              <span className="text-xs text-[#58413f]">Chi 2 • Nhánh 2A</span>
            </div>

            {/* Pedigree Link Card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-xs">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#fed255]">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6i_fUKuLKJs6JZUXc1t88GVFQY2TLx2s_jE3LlLuzsMd0oo0H_O2T7HdPcWMYBqalMvniFmHXRqVrDSlQsy1biNLFrGQmkFPNYWNiiDjaAS5m7oNxQ6ZJ5i1-CJfhWTXe6uTF5ZGNextBehctiWqqhwmP1K2_RB-bdrDSTSoo2F5vPBubs2v-69ttnsktHogKdhSUT6SWR1R7N2DEY1CWFA29EBXhHrnhnZih0WU"
                  alt="Phụ thân Nguyễn Văn An"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#58413f]">Phụ thân:</span>
                  <span className="font-serif-heritage text-xs font-bold text-[#6a020a] truncate">Nguyễn Văn An</span>
                </div>
                <p className="text-[11px] text-[#58413f] truncate">
                  Đời IV — Con trưởng • Trưởng nhánh 2A
                </p>
              </div>
              <span className="material-symbols-outlined text-[#755b00] text-[20px] shrink-0">
                account_tree
              </span>
            </div>
          </div>
        </section>

        {/* Form Root */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 1. Photo Upload Section */}
          <section className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#fff1eb] shadow-xs border border-[#dfbfbc]/30 text-center">
            <label className="relative mb-2 group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#ffeae0] flex flex-col items-center justify-center text-[#8b1e1e]">
                    <span className="material-symbols-outlined text-[32px]">add_a_photo</span>
                    <span className="text-[10px] font-bold mt-0.5">Tải ảnh</span>
                  </div>
                )}
              </div>
              <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#755b00] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[16px]">camera_alt</span>
              </span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            <h3 className="font-serif-heritage text-sm font-bold text-[#261811]">Ảnh Chân Dung Phả Tộc</h3>
            <p className="text-[11px] text-[#58413f] max-w-xs mt-0.5">
              Định dạng JPG, PNG dưới 5MB. Ảnh trang nghiêm nhìn thẳng để lưu truyền trong gia phả vĩnh viễn.
            </p>
          </section>

          {/* 2. Danh tính & Thứ bậc */}
          <section className="p-4 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 pb-1 border-b border-[#dfbfbc]/20">
              <div className="w-1.5 h-4 rounded-full bg-[#6a020a]"></div>
              <h2 className="font-serif-heritage text-sm font-bold text-[#6a020a]">
                Danh Tính &amp; Thứ Bậc
              </h2>
            </div>

            {/* Họ và tên */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811] flex items-center justify-between">
                <span>Họ và tên chính thức <span className="text-[#ba1a1a]">*</span></span>
                <span className="text-[10px] text-[#58413f] font-normal">Theo khai sinh</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#58413f] text-[18px]">badge</span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn Bình"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6a020a]"
                />
              </div>
            </div>

            {/* Tên húy */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Tên húy / Tên gọi khác</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#58413f] text-[18px]">edit_note</span>
                <input
                  type="text"
                  value={aliasName}
                  onChange={(e) => setAliasName(e.target.value)}
                  placeholder="Tên tự, biệt danh, tên gọi ở quê..."
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6a020a]"
                />
              </div>
            </div>

            {/* Giới tính */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#261811]">Giới tính <span className="text-[#ba1a1a]">*</span></span>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#fff1eb]">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`h-10 flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all ${
                    gender === 'male'
                      ? 'bg-[#6a020a] text-white shadow-xs'
                      : 'text-[#58413f] hover:text-[#261811]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">male</span>
                  <span>Nam (Quý tử)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`h-10 flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all ${
                    gender === 'female'
                      ? 'bg-[#6a020a] text-white shadow-xs'
                      : 'text-[#58413f] hover:text-[#261811]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">female</span>
                  <span>Nữ (Ái nữ)</span>
                </button>
              </div>
            </div>

            {/* Thứ bậc trong nhà */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Thứ bậc trong gia đình <span className="text-[#ba1a1a]">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: '1', label: 'Con trưởng (Cả)' },
                  { val: '2', label: 'Con thứ 2' },
                  { val: '3', label: 'Con thứ 3' },
                  { val: '4', label: 'Con thứ 4' },
                  { val: '5', label: 'Con thứ 5' },
                  { val: 'last', label: 'Con út' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setBirthOrder(item.val)}
                    className={`h-10 flex items-center justify-center rounded-lg text-xs transition-all ${
                      birthOrder === item.val
                        ? 'bg-[#fed255] text-[#735a00] font-bold shadow-xs'
                        : 'bg-[#fff1eb] text-[#261811] hover:bg-[#ffeae0]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mẫu thân */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811] flex items-center justify-between">
                <span>Mẫu thân (Mẹ sinh dưỡng)</span>
                <span className="text-[10px] text-[#755b00]">Huyết thống</span>
              </label>
              <select
                value={motherLink}
                onChange={(e) => setMotherLink(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none"
              >
                <option value="tran_thi_mai">Bà Trần Thị Mai (Chính thất — Vợ cả)</option>
                <option value="le_thi_lan">Bà Lê Thị Lan (Kế thất — Vợ hai)</option>
                <option value="unknown">Chưa xác định / Khuyết danh</option>
              </select>
            </div>
          </section>

          {/* 3. Sinh thời & Kỷ nhật */}
          <section className="p-4 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-[#dfbfbc]/20">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 rounded-full bg-[#755b00]"></div>
                <h2 className="font-serif-heritage text-sm font-bold text-[#6a020a]">
                  Sinh Thời &amp; Kỷ Nhật
                </h2>
              </div>
              <span className="text-[10px] text-[#58413f]">Lịch Can Chi</span>
            </div>

            {/* Ngày sinh */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Ngày tháng năm sinh <span className="text-[#ba1a1a]">*</span></label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none"
              />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffeae0] text-xs text-[#261811] mt-1">
                <span className="material-symbols-outlined text-[16px] text-[#755b00]">brightness_4</span>
                <span>Âm lịch: <strong className="text-[#6a020a]">Mậu Dần (1998)</strong></span>
              </div>
            </div>

            {/* State Toggle: Đã mất */}
            <div className="p-3 rounded-xl bg-[#fff1eb] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#f8ddd1] flex items-center justify-center text-[#6a020a]">
                  <span className="material-symbols-outlined text-[18px]">yard</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#261811]">Đã tạ thế (Quy tiên)</span>
                  <span className="text-[10px] text-[#58413f]">Ghi nhận ngày kỵ giỗ &amp; phần mộ</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDeceased}
                  onChange={(e) => setIsDeceased(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dfbfbc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#6a020a] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Conditional Deceased Fields */}
            {isDeceased && (
              <div className="flex flex-col gap-3 p-3 rounded-xl bg-[#ffeae0]/50 border border-[#dfbfbc]/40">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#261811]">Ngày mất (Kỵ nhật giỗ tết)</label>
                  <input
                    type="date"
                    value={deathDate}
                    onChange={(e) => setDeathDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-white text-xs text-[#261811] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#261811]">Hưởng thọ / Hưởng dương</label>
                  <input
                    type="text"
                    value={lifespan}
                    onChange={(e) => setLifespan(e.target.value)}
                    placeholder="Ví dụ: 78 tuổi (Hưởng thọ)"
                    className="w-full h-11 px-3 rounded-xl bg-white text-xs text-[#261811] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#261811]">Nơi an táng / Mộ phần</label>
                  <input
                    type="text"
                    value={burialPlace}
                    onChange={(e) => setBurialPlace(e.target.value)}
                    placeholder="Ví dụ: Khu lăng mộ họ Nguyễn, nghĩa trang quê nhà..."
                    className="w-full h-11 px-3 rounded-xl bg-white text-xs text-[#261811] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </section>

          {/* 4. Quê quán & Đời sống */}
          <section className="p-4 rounded-2xl bg-white shadow-xs border border-[#dfbfbc]/30 flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-1 border-b border-[#dfbfbc]/20">
              <div className="w-1.5 h-4 rounded-full bg-[#6a020a]"></div>
              <h2 className="font-serif-heritage text-sm font-bold text-[#6a020a]">
                Nguyên Quán &amp; Sự Nghiệp
              </h2>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Quê quán / Nguyên quán</label>
              <input
                type="text"
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Nghề nghiệp, chức vụ &amp; học vị</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="Ví dụ: Kỹ sư xây dựng, Cử nhân Sư phạm..."
                className="w-full h-11 px-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Tiểu sử &amp; Ghi chú phả ký</label>
              <textarea
                rows={3}
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                placeholder="Ghi chép công trạng, dấu ấn cuộc đời, truyền thống gia phong để con cháu đời sau noi theo học hỏi..."
                className="w-full p-3 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:outline-none resize-none leading-relaxed"
              ></textarea>
            </div>
          </section>

          {/* Fixed bottom action buttons */}
          <div className="fixed bottom-0 inset-x-0 z-40 bg-[#fff8f6]/95 backdrop-blur-xl border-t border-[#dfbfbc]/30 p-3 shadow-md pb-safe">
            <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={goBack}
                className="flex-1 h-12 rounded-xl bg-[#fff1eb] text-[#6a020a] font-semibold text-xs hover:bg-[#ffeae0] active:scale-95 transition-all"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-[2] h-12 rounded-xl bg-[#6a020a] text-white font-semibold text-xs shadow-md hover:bg-[#8b1e1e] active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                <span>Lưu thành viên</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
