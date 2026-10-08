# Gia Phả Đại Việt (Nguyễn Tộc • Đệ Nhị Chi)
Ứng dụng số hóa phả hệ, gia phả trực quan 7 đời, lịch giỗ chạp tế tự âm dương và quản lý thành viên dòng họ.

---

## 📁 Cấu Trúc Bộ Mã Nguồn & Tệp Nén

```
gia-pha-dai-viet/
├── index.html                   # Entry point ứng dụng React + Tailwind CSS
├── metadata.json                # Thông tin cấu hình ứng dụng
├── package.json                 # Khai báo thư viện & kịch bản chạy
├── tsconfig.json                # Cấu hình TypeScript
├── vite.config.ts               # Cấu hình Vite build
├── src/                         # Toàn bộ mã nguồn TypeScript & React
│   ├── App.tsx                  # Điều hướng chính & khung mô phỏng
│   ├── main.tsx                 # Khởi tạo React DOM
│   ├── index.css                # Thiết lập phong cách di sản & biến màu sắc
│   ├── types/                   # Định nghĩa kiểu dữ liệu dòng họ
│   ├── data/                    # Cơ sở dữ liệu mẫu 7 đời & hình ảnh
│   ├── context/                 # Quản lý trạng thái dòng họ toàn cục
│   ├── components/              # Các thành phần tái sử dụng
│   └── screens/                 # 12 màn hình chức năng chi tiết
├── html_exports/                # 12 tệp HTML độc lập (mở trực tiếp không cần cài đặt)
│   ├── 01_trang_chu.html
│   ├── 02_cay_gia_pha.html
│   ├── 03_thanh_vien.html
│   ├── 04_them_thanh_vien.html
│   ├── 05_lich_te_tu.html
│   ├── 06_chi_tiet_le_gio.html
│   ├── 07_them_su_kien.html
│   ├── 08_quan_tri_dong_ho.html
│   ├── 09_xuat_va_sao_luu.html
│   ├── 10_ca_nhan.html
│   ├── 11_dang_nhap.html
│   └── 12_khoi_tao_dong_ho.html
└── README.md                    # Tài liệu hướng dẫn sử dụng
```

---

## 🚀 Cách Sử Dụng

### Cách 1: Mở Trực Tiếp Tệp HTML (Nhanh nhất, không cần cài đặt)
1. Giải nén tệp `gia-pha-dai-viet.zip`.
2. Vào thư mục `html_exports/`.
3. Nhấp đúp chuột vào bất kỳ tệp nào (ví dụ: `01_trang_chu.html`, `02_cay_gia_pha.html`) để mở ngay trên trình duyệt (Chrome, Cốc Cốc, Safari, Edge).

### Cách 2: Chạy Ứng Dụng Đầy Đủ (React + Vite + TypeScript)
Yêu cầu: Máy tính đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 18 trở lên).

```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Chạy máy chủ phát triển
npm run dev

# 3. Mở trình duyệt tại địa chỉ:
# http://localhost:3000
```

Để đóng gói thành bản web xuất bản (Production Build):
```bash
npm run build
```
Thư mục `dist/` tạo ra có thể tải lên bất kỳ máy chủ lưu trữ web nào (Netlify, Vercel, cPanel, Cloudflare Pages).
