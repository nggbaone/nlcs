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

// xem hopdong
function xemHopDong(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `xem_hopdongKH.html?id=${id}`;
}

// xem hopdong
function baoCaoSuCo(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `them_baocaoKH.html?id=${id}`;
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
                    <button class="btn btn-danger" onclick="baoCaoSuCo(${item.id})"><i class="fa-solid fa-screwdriver-wrench"></i></button>
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

// Hàm xử lý khi nhấn nút "Xem chi tiết"
function xemChiTiet(id) {
  // Chuyển hướng sang trang chi tiết với id sự cố
  window.location.href = `xem_baocaoKH.html?id=${id}`;
}

function hienThiBaoCaoDaGui() {
  // Lấy token từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;
  const id = tokenData ? tokenData.taiKhoanId : null;

  // Kiểm tra token
  if (!accessToken) {
    alert("Không tìm thấy access token, vui lòng đăng nhập lại.");
    return;
  }

  // Gọi API để lấy danh sách sự cố
  fetch(`http://localhost:8080/su-co/khach/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken, // Gửi accessToken trong header
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải danh sách sự cố.");
      }
      return response.json(); // Parse dữ liệu JSON từ API
    })
    .then((data) => {
      // Lấy tbody của bảng
      const tbody = document.querySelector(".su-co-list tbody");
      tbody.innerHTML = ""; // Xóa nội dung cũ

      // Lặp qua danh sách dữ liệu và thêm vào bảng
      data.forEach((suCo) => {
        console.log(suCo.id);

        const row = document.createElement("tr");

        const ngayGuiFormatted = suCo.ngayGui
          ? new Date(suCo.ngayGui)
              .toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, "-")
          : "Null";
        row.innerHTML = `
                    <th scope="row" class="id">${suCo.id}</th>
                    <td class="hoTen">${suCo.ten_Khach}</td>
                    <td class="tenTro text-truncate">${suCo.ten_Tro}</td>
                    <td class="ngayGui">${ngayGuiFormatted}</td>
                    <td class="trangThai">${
                      suCo.trangThai === 1 ? "Chưa xử lý" : "Đã xử lý"
                    }</td>
                    <td>
                        <button class="btn btn-warning" onclick="xemChiTiet(${
                          suCo.id
                        })">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                    </td>
                `;

        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra: " + error.message);
    });
}

// Gọi cả hai hàm khi trang được tải
window.onload = function () {
  getHoTenFromToken();
  loadHopDongDangThue();
  hienThiBaoCaoDaGui();
};
