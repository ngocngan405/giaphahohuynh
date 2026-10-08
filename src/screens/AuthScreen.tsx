import React, { useState } from 'react';
import { useGenealogy } from '../context/GenealogyContext';
import { CLAN_BRAND_INFO } from '../data/mockData';

export const AuthScreen: React.FC = () => {
  const { currentScreen, navigateTo, showToast } = useGenealogy();

  const [isRegister, setIsRegister] = useState<boolean>(currentScreen === 'register');
  const [account, setAccount] = useState('0912 345 678');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register fields
  const [regName, setRegName] = useState('Nguyễn Văn An');
  const [regPhone, setRegPhone] = useState('0912 345 678');
  const [regEmail, setRegEmail] = useState('email@giapha.vn');
  const [regPassword, setRegPassword] = useState('12345678');
  const [regConfirmPassword, setRegConfirmPassword] = useState('12345678');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đăng nhập gia tộc thành công! Chào mừng bà con quy tụ về cội nguồn.');
    navigateTo('home');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      showToast('Vui lòng đồng ý với Điều khoản sử dụng dòng họ');
      return;
    }
    showToast(`Đăng ký tài khoản cho ${regName} thành công! Mời tiếp tục kết nối vào dòng họ.`);
    navigateTo('clan-onboarding');
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pt-4 pb-12 px-4 max-w-lg mx-auto">
      {/* Brand Hero Header */}
      <header className="flex flex-col items-center text-center mt-2 mb-5 w-full">
        {/* Portal Sub-badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fee3d6] shadow-xs mb-3">
          <span className="material-symbols-outlined text-[#755b00] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_balance
          </span>
          <span className="text-[10px] text-[#58413f] tracking-wider uppercase font-semibold">
            Cổng Thông Tin Dòng Tộc Toàn Quốc
          </span>
        </div>

        {/* Sacred Emblem / Logo */}
        <div className="relative flex items-center justify-center mb-2">
          <div className="w-20 h-20 rounded-2xl p-1 bg-white shadow-md flex items-center justify-center border border-[#dfbfbc]/40">
            <img
              alt="Gia Phả Logo Ấn Triện Cây Cội Nguồn"
              className="w-full h-full object-contain rounded-xl"
              src={CLAN_BRAND_INFO.sealUrl}
            />
          </div>
        </div>

        {/* Brand Identity Title */}
        <h1 className="font-serif-heritage text-2xl text-[#6a020a] tracking-tight font-bold mb-1">
          Gia Phả Đại Việt
        </h1>

        {/* Traditional Filial Underline Ribbon */}
        <div className="flex items-center justify-center gap-2 mb-2 w-32">
          <div className="h-[1px] flex-1 bg-[#ecc246]"></div>
          <span className="material-symbols-outlined text-[#755b00] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
          <div className="h-[1px] flex-1 bg-[#ecc246]"></div>
        </div>

        {/* Brand Mission Tagline */}
        <p className="font-serif-heritage text-xs italic text-[#58413f]">
          “Gìn giữ cội nguồn, kết nối các thế hệ”
        </p>
      </header>

      {/* Mode Switcher Tabs */}
      <div className="p-1 rounded-xl bg-[#ffeae0] flex items-center gap-1 mb-4 shadow-xs">
        <button
          type="button"
          onClick={() => setIsRegister(false)}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            !isRegister ? 'bg-[#6a020a] text-white shadow-xs' : 'text-[#58413f] hover:text-[#261811]'
          }`}
        >
          Đăng Nhập
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(true)}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            isRegister ? 'bg-[#6a020a] text-white shadow-xs' : 'text-[#58413f] hover:text-[#261811]'
          }`}
        >
          Đăng Ký Gia Nhập
        </button>
      </div>

      {!isRegister ? (
        /* LOGIN FORM */
        <section className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#dfbfbc]/30 mb-5">
          <div className="mb-4 text-center">
            <h2 className="font-serif-heritage text-base text-[#261811] font-bold">
              Đăng Nhập Gia Tộc
            </h2>
            <p className="text-xs text-[#58413f] mt-0.5">
              Chào mừng quý bà con quy tụ về với cội nguồn
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
            {/* Phone or Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811] flex items-center gap-1.5" htmlFor="login-account">
                <span className="material-symbols-outlined text-[#6a020a] text-[16px]">contact_phone</span>
                <span>Số điện thoại hoặc Email</span>
              </label>
              <input
                id="login-account"
                type="text"
                required
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="0912 345 678 hoặc email@giapha.vn"
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6a020a] transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811] flex items-center gap-1.5" htmlFor="login-password">
                <span className="material-symbols-outlined text-[#6a020a] text-[16px]">lock</span>
                <span>Mật khẩu</span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu gia đình"
                  className="w-full h-11 pl-3.5 pr-10 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6a020a] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#58413f] hover:text-[#6a020a]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#6a020a] rounded"
                />
                <span className="text-[#261811]">Ghi nhớ đăng nhập</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Vui lòng liên hệ Trưởng Tộc hoặc dùng mã SMS để đặt lại mật khẩu.')}
                className="text-[#6a020a] hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 mt-1 rounded-xl bg-[#6a020a] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#8b1e1e] active:scale-[0.99] transition-all"
            >
              <span>Đăng nhập</span>
              <span className="material-symbols-outlined text-[18px]">login</span>
            </button>
          </form>
        </section>
      ) : (
        /* REGISTER FORM */
        <section className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#dfbfbc]/30 mb-5">
          <div className="mb-4 text-center">
            <h2 className="font-serif-heritage text-base text-[#261811] font-bold">
              Đăng Ký Gia Nhập
            </h2>
            <p className="text-xs text-[#58413f] mt-0.5">
              Ghi danh vào cội nguồn dòng họ, kết nối các thế hệ con cháu
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Họ và tên <span className="text-[#ba1a1a]">*</span></label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Số điện thoại <span className="text-[#ba1a1a]">*</span></label>
              <input
                type="tel"
                required
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="0912 345 678"
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Email (Không bắt buộc)</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="email@giapha.vn"
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Mật khẩu <span className="text-[#ba1a1a]">*</span></label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Tối thiểu 8 ký tự"
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#261811]">Nhập lại mật khẩu <span className="text-[#ba1a1a]">*</span></label>
              <input
                type="password"
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="w-full h-11 px-3.5 rounded-xl bg-[#fff1eb] text-xs text-[#261811] focus:bg-white focus:outline-none"
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-[#261811] mt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#6a020a]"
              />
              <span>Tôi đồng ý với Điều khoản và Tộc ước gia phong của dòng họ Gia Phả.</span>
            </label>

            <button
              type="submit"
              className="w-full h-12 mt-1 rounded-xl bg-[#6a020a] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#8b1e1e] active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#fed255]">how_to_reg</span>
              <span>Tạo Tài Khoản &amp; Gia Nhập</span>
            </button>
          </form>
        </section>
      )}

      {/* Social / Quick Access Sign-In */}
      <div className="w-full flex flex-col items-center mb-5">
        <div className="relative w-full flex items-center justify-center my-2">
          <div className="w-full h-[1px] bg-[#dfbfbc]/50"></div>
          <span className="absolute px-3 bg-[#fff8f6] text-xs text-[#58413f] italic">
            hoặc đăng nhập bằng
          </span>
        </div>

        <div className="w-full flex flex-col gap-2.5 mt-3">
          {/* Zalo button */}
          <button
            type="button"
            onClick={() => {
              showToast('Đang kết nối đăng nhập nhanh qua tài khoản Zalo...');
              setTimeout(() => navigateTo('home'), 600);
            }}
            className="w-full h-11 px-4 rounded-xl bg-white shadow-xs border border-[#dfbfbc]/40 flex items-center justify-center gap-2.5 text-xs font-semibold text-[#261811] hover:bg-[#fff1eb] active:scale-[0.99]"
          >
            <div className="w-5 h-5 rounded bg-[#0068FF] text-white flex items-center justify-center font-bold text-[10px]">
              Zalo
            </div>
            <span>Tiếp tục với Zalo</span>
          </button>

          {/* Google button */}
          <button
            type="button"
            onClick={() => {
              showToast('Đang đăng nhập bằng tài khoản Google...');
              setTimeout(() => navigateTo('home'), 600);
            }}
            className="w-full h-11 px-4 rounded-xl bg-white shadow-xs border border-[#dfbfbc]/40 flex items-center justify-center gap-2.5 text-xs font-semibold text-[#261811] hover:bg-[#fff1eb] active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
            </svg>
            <span>Tiếp tục với Google</span>
          </button>
        </div>
      </div>

      {/* Footer reassurance */}
      <footer className="w-full flex flex-col items-center text-center gap-2 mt-auto">
        <div className="flex items-center justify-center gap-1.5 text-[#58413f]">
          <span className="material-symbols-outlined text-[#755b00] text-[16px]">verified</span>
          <span className="text-[11px] tracking-wide">
            Bảo tồn văn hóa truyền thống &amp; kết nối tình thân tộc
          </span>
        </div>
      </footer>
    </div>
  );
};
