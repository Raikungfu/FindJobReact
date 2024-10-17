export const API_BASE_URL: string = (() => {
  const mode: string = import.meta.env.VITE_MODE;
  const urls: Record<string, string> = {
    DEV: import.meta.env.VITE_DEV_API_URL,
    PROD: import.meta.env.VITE_PROD_API_URL,
  };

  return urls[mode];
})();

export type FormDataOrOther<T> = T;

export interface errorData {
  error?: string;
  status?: number;
}

export enum JobType {
  FullTime = "FullTime",
  PartTime = "PartTime",
  Contract = "Contract",
  Internship = "Internship",
}


export enum JobLocation  {
  HaNoi = "Thành phố Hà Nội",
  HoChiMinh = "Thành phố Hồ Chí Minh",
  DaNang = "Thành phố Đà Nẵng",
  HaiPhong = "Thành phố Hải Phòng",
  CanTho = "Thành phố Cần Thơ",
  Hue = "Thành phố Huế",
  QuangNinh = "Tỉnh Quảng Ninh",
  KhanhHoa = "Tỉnh Khánh Hòa",
  DongNai = "Tỉnh Đồng Nai",
  BinhDuong = "Tỉnh Bình Dương",
  BacGiang = "Tỉnh Bắc Giang",
  BacKan = "Tỉnh Bắc Kạn",
  BacLieu = "Tỉnh Bạc Liêu",
  BacNinh = "Tỉnh Bắc Ninh",
  BenTre = "Tỉnh Bến Tre",
  BinhDinh = "Tỉnh Bình Định",
  BinhPhuoc = "Tỉnh Bình Phước",
  CaMau = "Tỉnh Cà Mau",
  CaoBang = "Tỉnh Cao Bằng",
  DakLak = "Tỉnh Đắk Lắk",
  DakNong = "Tỉnh Đắk Nông",
  DienBien = "Tỉnh Điện Biên",
  DongThap = "Tỉnh Đồng Tháp",
  GiaLai = "Tỉnh Gia Lai",
  HaGiang = "Tỉnh Hà Giang",
  HaNam = "Tỉnh Hà Nam",
  HaTinh = "Tỉnh Hà Tĩnh",
  HaiDuong = "Tỉnh Hải Dương",
  HauGiang = "Tỉnh Hậu Giang",
  HoaBinh = "Tỉnh Hòa Bình",
  HungYen = "Tỉnh Hưng Yên",
  KonTum = "Tỉnh Kon Tum",
  LaiChau = "Tỉnh Lai Châu",
  LamDong = "Tỉnh Lâm Đồng",
  LangSon = "Tỉnh Lạng Sơn",
  LaoCai = "Tỉnh Lào Cai",
  LongAn = "Tỉnh Long An",
  NamDinh = "Tỉnh Nam Định",
  NgheAn = "Tỉnh Nghệ An",
  NinhBinh = "Tỉnh Ninh Bình",
  NinhThuan = "Tỉnh Ninh Thuận",
  PhuTho = "Tỉnh Phú Thọ",
  PhuYen = "Tỉnh Phú Yên",
  QuangBinh = "Tỉnh Quảng Bình",
  QuangNam = "Tỉnh Quảng Nam",
  QuangNgai = "Tỉnh Quảng Ngãi",
  QuangTri = "Tỉnh Quảng Trị",
  SocTrang = "Tỉnh Sóc Trăng",
  SonLa = "Tỉnh Sơn La",
  TayNinh = "Tỉnh Tây Ninh",
  ThaiBinh = "Tỉnh Thái Bình",
  ThaiNguyen = "Tỉnh Thái Nguyên",
  ThanhHoa = "Tỉnh Thanh Hóa",
  ThuaThienHue = "Tỉnh Thừa Thiên Huế",
  TienGiang = "Tỉnh Tiền Giang",
  TraVinh = "Tỉnh Trà Vinh",
  TuyenQuang = "Tỉnh Tuyên Quang",
  VinhLong = "Tỉnh Vĩnh Long",
  VinhPhuc = "Tỉnh Vĩnh Phúc",
  YenBai = "Tỉnh Yên Bái",
  
  Quan1_HoChiMinh = "Quận 1, Thành phố Hồ Chí Minh",
  Quan3_HoChiMinh = "Quận 3, Thành phố Hồ Chí Minh",
  QuanBinhThanh_HoChiMinh = "Quận Bình Thạnh, Thành phố Hồ Chí Minh",
  QuanGoVap_HoChiMinh = "Quận Gò Vấp, Thành phố Hồ Chí Minh",
  Quan7_HoChiMinh = "Quận 7, Thành phố Hồ Chí Minh",
  QuanThuDuc_HoChiMinh = "Quận Thủ Đức, Thành phố Hồ Chí Minh",
  
  PhuongDongDa_HaNoi = "Phường Đống Đa, Hà Nội",
  PhuongBaDinh_HaNoi = "Phường Ba Đình, Hà Nội",
  PhuongHoanKiem_HaNoi = "Phường Hoàn Kiếm, Hà Nội",
  QuanCauGiay_HaNoi = "Quận Cầu Giấy, Hà Nội",
  QuanThanhXuan_HaNoi = "Quận Thanh Xuân, Hà Nội",
  QuanHaDong_HaNoi = "Quận Hà Đông, Hà Nội",
  
  QuanHaiChau_DaNang = "Quận Hải Châu, Thành phố Đà Nẵng",
  QuanThanhKhe_DaNang = "Quận Thanh Khê, Thành phố Đà Nẵng",
  QuanSonTra_DaNang = "Quận Sơn Trà, Thành phố Đà Nẵng",
  QuanNguHanhSon_DaNang = "Quận Ngũ Hành Sơn, Thành phố Đà Nẵng",
}

