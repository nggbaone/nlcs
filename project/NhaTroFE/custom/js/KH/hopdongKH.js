// Kiểm tra sự tồn tại của token
const token = localStorage.getItem("token"); // Thay 'accessToken' bằng tên mà bạn đã sử dụng để lưu token

if (!token) {
  // Nếu không có token, chuyển hướng đến trang đăng nhập
  window.location.href = "/login.html"; // Thay '/login' bằng URL của trang đăng nhập của bạn
} else {
  // Nếu có token, bạn có thể lấy role từ token nếu cần
  const role = localStorage.getItem("role"); // Thay 'role' bằng tên mà bạn đã sử dụng để lưu role

  // Chuyển hướng đến trang home dựa trên role
  if (role != "2") {
    window.location.href = "/homeKH.html"; // Chuyển đến trang home cho admin
  }
}

// js dang xuat
document.getElementById("btn-dangxuat").addEventListener("click", function () {
  // Xóa toàn bộ key-value trong local storage
  localStorage.clear();

  // Có thể chuyển hướng đến trang đăng nhập hoặc trang chính
  window.location.href = "/login.html"; // Thay đổi đường dẫn đến trang đăng nhập của bạn
});

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

// xem hopdong
function xemHopDong(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `xem_hopdongKH.html?id=${id}`;
}

// Hàm để gọi API và hiển thị dữ liệu con-han
function loadHopDongDangThue() {
  // Lấy accessToken và taiKhoanId từ localStorage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;
  const taiKhoanId = tokenData ? tokenData.taiKhoanId : null;

  // Gọi API lấy danh sách hợp đồng đang thuê
  fetch(`http://localhost:8080/hop-dong/khach/con-han/${taiKhoanId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json()) // Chuyển đổi dữ liệu nhận về thành JSON
    .then((data) => {
      // Lấy phần tbody của bảng
      const tbody = document.querySelector(".dang-thue tbody");
      tbody.innerHTML = ""; // Xóa dữ liệu cũ trong bảng

      // Duyệt qua dữ liệu và tạo các dòng trong bảng
      data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <th scope="row">${item.id}</th>
              <td>${item.tenKhachHang}</td>
              <td class="text-truncate">${item.tenNhaTro}</td>
              <td>${item.ngayBatDau}</td>
              <td>${item.ngayKetThuc}</td>
              <td>
                  <button class="btn btn-warning" onclick="xemHopDong(${item.id})"><i class="fa-solid fa-circle-info"></i></button>
              </td>
          `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi khi tải dữ liệu.");
    });
}

// Hàm để gọi API và hiển thị dữ liệu het-han
function loadHopDongHetHan() {
  // Lấy accessToken và taiKhoanId từ localStorage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;
  const taiKhoanId = tokenData ? tokenData.taiKhoanId : null;

  // Gọi API lấy danh sách hợp đồng đang thuê
  fetch(`http://localhost:8080/hop-dong/khach/het-han/${taiKhoanId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json()) // Chuyển đổi dữ liệu nhận về thành JSON
    .then((data) => {
      // Lấy phần tbody của bảng
      const tbody = document.querySelector(".het-han tbody");
      tbody.innerHTML = ""; // Xóa dữ liệu cũ trong bảng

      // Duyệt qua dữ liệu và tạo các dòng trong bảng
      data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <th scope="row">${item.id}</th>
              <td>${item.tenKhachHang}</td>
              <td class="text-truncate">${item.tenNhaTro}</td>
              <td>${item.ngayBatDau}</td>
              <td>${item.ngayKetThuc}</td>
              <td>
                  <button class="btn btn-warning" onclick="xemHopDong(${item.id})"><i class="fa-solid fa-circle-info"></i></button>
              </td>
          `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi khi tải dữ liệu.");
    });
}

window.onload = function () {
  getHoTenFromToken();
  loadHopDongDangThue();
  loadHopDongHetHan();
};
