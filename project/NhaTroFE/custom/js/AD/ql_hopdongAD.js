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

// xem hopdong
function xemHopDong(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `xem_hopdongAD.html?id=${id}`;
}

// xoa hop dong
function xoaHopDong(id) {
  // Lấy accessToken từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;

  if (!accessToken) {
    console.error("Access token không tìm thấy trong local storage");
    return;
  }

  // Xác nhận trước khi xóa
  if (!confirm("Bạn có chắc chắn muốn xóa hợp đồng này?")) {
    return;
  }

  // Gọi API xóa hợp đồng
  fetch(`http://localhost:8080/hop-dong/admin/xoa/${id}`, {
    method: "DELETE",
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
    .then((result) => {
      if (result === true) {
        alert("Hợp đồng đã được xóa thành công");
        // Tải lại trang hoặc cập nhật giao diện nếu cần
        location.reload();
      } else {
        alert("Xóa hợp đồng thất bại");
      }
    })
    .catch((error) => {
      console.error("Đã xảy ra lỗi:", error);
      alert("Có lỗi xảy ra khi xóa hợp đồng");
    });
}

// Hàm gọi API và đổ dữ liệu vào bảng
async function loadHopDongData() {
  // Lấy token từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token")); // Đảm bảo "token" là tên đúng của khóa lưu trữ
  const accessToken = tokenData.accessToken;

  // Kiểm tra token có tồn tại không
  if (!accessToken) {
    console.error("Access token không tồn tại.");
    return;
  }

  try {
    // Gọi API lấy dữ liệu hợp đồng
    const response = await fetch(
      "http://localhost:8080/hop-dong/admin/con-han",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      throw new Error("Không thể lấy dữ liệu từ API");
    }

    const hopDongData = await response.json();

    // Lấy tbody từ bảng HTML để đổ dữ liệu
    const tbody = document.querySelector(".table-hover.dang-thue tbody");
    tbody.innerHTML = ""; // Xóa dữ liệu cũ

    // Đổ dữ liệu vào bảng
    hopDongData.forEach((hopDong) => {
      const row = document.createElement("tr");

      row.innerHTML = `
              <th scope="row">${hopDong.id}</th>
              <td>${hopDong.tenKhachHang}</td>
              <td class="text-truncate">${hopDong.tenNhaTro}</td>
              <td>${hopDong.ngayBatDau}</td>
              <td>${hopDong.ngayKetThuc}</td>
              <td>
                  <button class="btn btn-warning" onclick="xemHopDong(${hopDong.id})"><i class="fa-solid fa-circle-info"></i></button>
                  <button class="btn btn-danger" onclick="xoaHopDong(${hopDong.id})"><i class="fa-solid fa-trash"></i></button>
              </td>
          `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
}

// Hàm gọi API và đổ dữ liệu vào bảng "HỢP ĐỒNG HẾT HẠN"
async function loadHopDongHetHanData() {
  // Lấy token từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData.accessToken;

  // Kiểm tra nếu không có accessToken
  if (!accessToken) {
    console.error("Access token không tồn tại.");
    return;
  }

  try {
    // Gọi API để lấy danh sách hợp đồng hết hạn
    const response = await fetch(
      "http://localhost:8080/hop-dong/admin/het-han",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      throw new Error("Không thể lấy dữ liệu từ API");
    }

    const hopDongData = await response.json();

    // Lấy tbody từ bảng HTML để đổ dữ liệu
    const tbody = document.querySelector(".table-hover.het-han tbody");
    tbody.innerHTML = ""; // Xóa dữ liệu cũ nếu có

    // Đổ dữ liệu vào bảng
    hopDongData.forEach((hopDong) => {
      const row = document.createElement("tr");

      row.innerHTML = `
              <th scope="row">${hopDong.id}</th>
              <td>${hopDong.tenKhachHang}</td>
              <td class="text-truncate">${hopDong.tenNhaTro}</td>
              <td>${hopDong.ngayBatDau}</td>
              <td>${hopDong.ngayKetThuc}</td>
              <td>
                  <button class="btn btn-warning" onclick="xemHopDong(${hopDong.id})"><i class="fa-solid fa-circle-info"></i></button>
              </td>
          `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
}

window.onload = function () {
  getHoTenFromToken();
  loadHopDongData();
  loadHopDongHetHanData();
};
