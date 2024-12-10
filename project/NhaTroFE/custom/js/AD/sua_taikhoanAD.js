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

// ham do du lieu xem tai khoan
function loadChiTietTaiKhoan() {
  // Lấy id từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // Lấy giá trị của tham số 'id'

  if (!id) {
    console.error("Không tìm thấy id trong URL");
    return;
  }

  const tokenData = JSON.parse(localStorage.getItem("token")); // Lấy token từ local storage
  const accessToken = tokenData ? tokenData.accessToken : null;

  if (!accessToken) {
    console.error("Không tìm thấy accessToken");
    return;
  }

  fetch(`http://localhost:8080/tai-khoan/admin/chi-tiet/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Thêm token vào header
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("ho_va_ten").value = data.hoTen;
        document.getElementById("tai_khoan").value = data.taiKhoan;
        document.getElementById("mat_khau").value = data.matKhau;
        document.getElementById("dia_chi").value = data.diaChi;
        document.getElementById("email").value = data.email;
        document.getElementById("so_dien_thoai").value = data.soDienThoai;
      } else {
        console.error("Không tìm thấy thông tin tài khoản");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}

// sua tai khoan
document
  .getElementById("sua-taikhoan")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn form tự động submit

    // Lấy dữ liệu từ các trường trong form
    const id = new URLSearchParams(window.location.search).get("id"); // Lấy id từ URL
    const hoTen = document.getElementById("ho_va_ten").value;
    const taiKhoan = document.getElementById("tai_khoan").value;
    const matKhau = document.getElementById("mat_khau").value;
    const diaChi = document.getElementById("dia_chi").value;
    const email = document.getElementById("email").value;
    const soDienThoai = document.getElementById("so_dien_thoai").value;
    const chucVu = document.getElementById("chuc_vu").value;
    const trangThai = document.getElementById("trang_thai").value;

    // Tạo payload để gửi lên API
    const requestPayload = {
      id: parseInt(id),
      hoTen: hoTen,
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      email: email,
      soDienThoai: soDienThoai,
      diaChi: diaChi,
      chucVu: parseInt(chucVu),
      trangThai: parseInt(trangThai),
    };

    const tokenData = JSON.parse(localStorage.getItem("token")); // Lấy token từ local storage
    const accessToken = tokenData ? tokenData.accessToken : null;

    if (!accessToken) {
      console.error("Không tìm thấy accessToken");
      return;
    }

    // Gọi API cập nhật
    fetch("http://localhost:8080/tai-khoan/admin/cap-nhat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Thêm token vào header
      },
      body: JSON.stringify(requestPayload),
    })
      .then((response) => response.json())
      .then((success) => {
        if (success) {
          alert("Cập nhật tài khoản thành công");
          // Tùy chọn: làm mới lại trang hoặc điều hướng người dùng đến trang khác
          location.reload();
        } else {
          alert("Cập nhật tài khoản không thành công");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        alert("Lỗi khi gọi API. Vui lòng thử lại sau.");
      });
  });

window.onload = function () {
  getHoTenFromToken();
  loadChiTietTaiKhoan();
};
