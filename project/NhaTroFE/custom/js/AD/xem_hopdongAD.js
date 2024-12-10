// Kiểm tra sự tồn tại của token
const token = localStorage.getItem("token"); // Thay 'accessToken' bằng tên mà bạn đã sử dụng để lưu token

if (!token) {
  // Nếu không có token, chuyển hướng đến trang đăng nhập
  window.location.href = "/login.html"; // Thay '/login' bằng URL của trang đăng nhập của bạn
} else {
  // Nếu có token, bạn có thể lấy role từ token nếu cần
  const role = localStorage.getItem("role"); // Thay 'role' bằng tên mà bạn đã sử dụng để lưu role

  // Chuyển hướng đến trang home dựa trên role
  if (role != "1") {
    window.location.href = "/login.html"; // Chuyển đến trang home cho admin
  }
}

// lấy tên người dùng
function getHoTenFromToken() {
  const parsedToken = JSON.parse(token);
  const accessToken = parsedToken.accessToken; // Lấy accessToken từ token
  const taiKhoanId = parsedToken.taiKhoanId; // Lấy taiKhoanId từ token

  // Gọi API để lấy thông tin tài khoản khách hàng
  fetch(`http://localhost:8080/tai-khoan/${taiKhoanId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, // Gửi accessToken trong header
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Giả sử API trả về dữ liệu có thuộc tính 'hoTen'
      const hoTen = data.hoTen; // Lấy họ tên từ dữ liệu API trả về

      // Cập nhật họ tên vào phần tử có id là 'hoTen'
      document.getElementById("hoTen").textContent = hoTen;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

// js dang xuat
document.getElementById("btn-dangxuat").addEventListener("click", function () {
  // Xóa toàn bộ key-value trong local storage
  localStorage.clear();

  // Có thể chuyển hướng đến trang đăng nhập hoặc trang chính
  window.location.href = "/login.html"; // Thay đổi đường dẫn đến trang đăng nhập của bạn
});

// Hàm để định dạng số tiền thành dạng VNĐ
function formatCurrencyVND(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

// Hàm xemHopDong sử dụng id từ URL
function xemHopDong() {
  // Lấy id từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    console.error("Không tìm thấy id trong URL");
    return;
  }

  // Lấy accessToken từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;

  if (!accessToken) {
    console.error("Access token không tìm thấy trong local storage");
    return;
  }

  // Gọi API lấy chi tiết hợp đồng
  fetch(`http://localhost:8080/hop-dong/admin/chi-tiet/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi gọi API: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Chi tiết hợp đồng:", data);

      // Đổ dữ liệu vào các phần tử HTML
      document.getElementById("id_hopdong").value = data.id;
      document.getElementById("ngayBatDau").value = new Date(
        data.ngayBatDau
      ).toLocaleDateString();
      document.getElementById("ngayKetThuc").value = new Date(
        data.ngayKetThuc
      ).toLocaleDateString();
      document.getElementById("ten_khach").value = data.ten_khach;
      document.getElementById("so_dien_thoai").value = data.so_dien_thoai;
      document.getElementById("dia_chi_khach").value = data.dia_chi_khach;
      document.getElementById("ten_tro").value = data.ten_tro;
      document.getElementById("dien_tich").value = data.dien_tich + " m²";
      document.getElementById("gia_thue").value = formatCurrencyVND(
        data.gia_thue
      );
      document.getElementById("gia_dien").value = formatCurrencyVND(
        data.gia_dien
      );
      document.getElementById("gia_nuoc").value = formatCurrencyVND(
        data.gia_nuoc
      );
      document.getElementById("noi_that").value = data.noi_that;
      document.getElementById("hang").value = data.hang;
      document.getElementById("mo_ta").value = data.mo_ta;
      document.getElementById("dia_chi_tro").value = data.dia_chi_tro;
    })
    .catch((error) => {
      console.error("Đã xảy ra lỗi:", error);
    });
}

window.onload = function () {
  getHoTenFromToken();
  xemHopDong();
};
