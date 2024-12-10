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

// xem bao cao
function xemBaoCao(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `xem_baocaoAD.html?id=${id}`;
}

function xuLyBaoCao(id) {
  const parsedToken = JSON.parse(token);
  const accessToken = parsedToken.accessToken; // Lấy accessToken từ token

  // Gọi API
  fetch(`http://localhost:8080/su-co/admin/${id}`, {
    method: "POST", // Phương thức POST
    headers: {
      Authorization: "Bearer " + accessToken, // Gửi accessToken trong header
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // API trả về JSON
      } else {
        throw new Error("Có lỗi xảy ra khi xử lý báo cáo.");
      }
    })
    .then((result) => {
      if (result) {
        alert("Xử lý báo cáo thành công.");
        // Tùy chọn: làm mới trang hoặc cập nhật giao diện
        location.reload();
      } else {
        alert("Xử lý báo cáo thất bại.");
      }
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    });
}

// hien thi xu co 1
function hienThiXuCo1() {
  // Lấy token từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;

  // Kiểm tra token
  if (!accessToken) {
    alert("Không tìm thấy access token, vui lòng đăng nhập lại.");
    return;
  }

  // Gọi API để lấy danh sách sự cố
  fetch(`http://localhost:8080/su-co/admin/1`, {
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
      const tbody = document.querySelector(".su-co-1 tbody");
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
                          <button class="btn btn-warning" onclick="xemBaoCao(${
                            suCo.id
                          })">
                            <i class="fa-solid fa-circle-info"></i>
                          </button>
                          <button class="btn btn-success" onclick="xuLyBaoCao(${
                            suCo.id
                          })">
                            <i class="fa-solid fa-square-check"></i>
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

// hien thi xu co 0
function hienThiXuCo0() {
  // Lấy token từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;

  // Kiểm tra token
  if (!accessToken) {
    alert("Không tìm thấy access token, vui lòng đăng nhập lại.");
    return;
  }

  // Gọi API để lấy danh sách sự cố
  fetch(`http://localhost:8080/su-co/admin/0`, {
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
      const tbody = document.querySelector(".su-co-0 tbody");
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
                            <button class="btn btn-warning" onclick="xemBaoCao(${
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
  hienThiXuCo1();
  hienThiXuCo0();
};
