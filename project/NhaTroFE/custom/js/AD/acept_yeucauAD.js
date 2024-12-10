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

// Hàm định dạng số theo kiểu tiền VNĐ
function formatVND(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

// Hàm để lấy id từ URL
function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Hàm gọi API và đổ dữ liệu vào các trường
function getChiTietYeuCau() {
  const id = getIdFromUrl();
  const token = JSON.parse(localStorage.getItem("token")).accessToken;

  if (!id) {
    console.error("ID không có trong URL");
    return;
  }

  fetch(`http://localhost:8080/yeu-cau/admin/chi-tiet/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("ho_va_ten").value = data.ten_khach;
      document.getElementById("dia_chi").value = data.dia_chi_khach;
      document.getElementById("so_dien_thoai").value = data.so_dien_thoai;
      document.getElementById("email").value = data.email;

      document.getElementById("ten_tro").value = data.ten_tro;
      document.getElementById("dien_tich").value = data.dien_tich;
      document.getElementById("gia_thue").value = formatVND(data.gia_thue);
      document.getElementById("gia_dien").value = formatVND(data.gia_dien);
      document.getElementById("gia_nuoc").value = formatVND(data.gia_nuoc);
      document.getElementById("noi_that").value = data.noi_that;
      document.getElementById("mo_ta").value = data.mo_ta;
      document.getElementById("dia_chi_tro").value = data.dia_chi_tro;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi gọi API:", error);
    });
}

// acept yeu cau
document
  .querySelector(".acept_yeucau")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy idYeuCau từ URL
    const params = new URLSearchParams(window.location.search);
    const idYeuCau = params.get("id");

    // Lấy giá trị từ form và định dạng ngày
    const ngayBatDau = document.getElementById("ngay_bat_dau").value;
    const ngayKetThuc = document.getElementById("ngay_ket_thuc").value;

    // Chuẩn bị payload cho request
    const requestBody = {
      id_YeuCau: idYeuCau,
      ngay_bat_dau: ngayBatDau,
      ngay_ket_thuc: ngayKetThuc,
    };

    // Gửi token từ local storage
    const token = JSON.parse(localStorage.getItem("token")).accessToken;

    // Gọi API thêm hợp đồng
    fetch("http://localhost:8080/hop-dong/admin/them", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          alert("Hợp đồng đã được thêm thành công!");
          // Reload lại trang hoặc chuyển hướng
          window.location.href = "ql_yeucauAD.html";
        } else {
          alert("Thêm hợp đồng thất bại. Vui lòng thử lại.");
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
      });
  });

window.onload = function () {
  getHoTenFromToken();
  getChiTietYeuCau();
};
