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
        document.getElementById("trang_thai").value =
          data.trangThai === 1 ? "Đang hoạt động" : "Ngừng hoạt động";
        document.getElementById("tai_khoan").value = data.taiKhoan;
        document.getElementById("chuc_vu").value =
          data.chucVu === 1 ? "Quản trị viên" : "Khách hàng";
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

// Hàm tạo carousel tùy chỉnh
function createCustomCarousel(hinhAnhArray) {
  const carouselImages = document.getElementById("carousel-images");

  if (hinhAnhArray.length > 0) {
    // Tạo các phần tử ảnh trong carousel
    const imagesHTML = hinhAnhArray
      .map((hinhAnh, index) => {
        return `<div class="carousel-item ${index === 0 ? "active" : ""}">
                      <img src="http://localhost:8080/files/${hinhAnh.trim()}" class="d-block" alt="Hình ảnh">
                  </div>`;
      })
      .join("");

    carouselImages.innerHTML = imagesHTML;
  } else {
    carouselImages.innerHTML = "<p>Không có ảnh để hiển thị.</p>";
  }
}

// Hàm gọi API và hiển thị dữ liệu
function hienThiGiayTo() {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;
  // Lấy id từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // Lấy giá trị của tham số 'id'

  fetch(`http://localhost:8080/tai-khoan/hien-giay-to/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải dữ liệu chi tiết sự cố.");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        const hinhAnhChuoi = data.giayTo; // Chuỗi ảnh, ví dụ: "image1.jpg;image2.jpg"
        let hinhAnhArray = []; // Đổi từ const sang let
        if (hinhAnhChuoi !== null && hinhAnhChuoi.trim() !== "") {
          hinhAnhArray = hinhAnhChuoi
            .split(";")
            .filter((hinhAnh) => hinhAnh.trim() !== "");
        }

        // Tạo carousel nếu có hình ảnh
        if (hinhAnhArray.length > 0) {
          createCustomCarousel(hinhAnhArray);
        } else {
          document.getElementById("carousel-images").innerHTML =
            "<p>Không có ảnh để hiển thị.</p>";
        }
      } else {
        alert("Không tìm thấy dữ liệu giấy tờ.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra: " + error.message);
    });
}

window.onload = function () {
  getHoTenFromToken();
  loadChiTietTaiKhoan();
  hienThiGiayTo();
};
