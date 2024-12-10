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

// xem YeuCau
function xemYeuCau(id) {
  window.location.href = `xem_yeucauAD.html?id=${id}`;
}

// dong y YeuCau
function acceptYeuCau(id) {
  window.location.href = `acept_yeucauAD.html?id=${id}`;
}

// Hàm xóa yêu cầu
function cancelYeuCau(id) {
  const token = JSON.parse(localStorage.getItem("token")).accessToken; // Lấy token từ localStorage

  fetch(`http://localhost:8080/yeu-cau/admin/xoa/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Gửi token trong header
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        alert("Xóa yêu cầu thành công");
        window.location.reload(); // Reload lại trang sau khi xóa thành công
      } else {
        alert("Lỗi khi xóa yêu cầu");
      }
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi gọi API:", error);
      alert("Lỗi kết nối với server");
    });
}

// Hàm gọi API hiển thị yêu cầu từ cơ sở dữ liệu
function hienThiYeuCau_Admin() {
  // Lấy token từ localStorage
  const token = localStorage.getItem("token");
  const parsedToken = JSON.parse(token);
  const accessToken = parsedToken.accessToken; // Lấy accessToken từ token

  // Gọi API để lấy dữ liệu yêu cầu
  fetch("http://localhost:8080/yeu-cau/admin/hien-thi", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, // Gửi accessToken trong header
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gọi API");
      }
      return response.json(); // Chuyển dữ liệu API thành JSON
    })
    .then((data) => {
      // Gọi hàm để hiển thị dữ liệu lên bảng
      renderTableData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Hàm hiển thị dữ liệu lên bảng HTML
function renderTableData(data) {
  // Lấy phần tbody trong bảng
  const tableBody = document.querySelector("table tbody");

  // Xóa nội dung cũ trong bảng (nếu có)
  tableBody.innerHTML = "";

  // Lặp qua dữ liệu và tạo các dòng mới trong bảng
  data.forEach((item) => {
    const row = document.createElement("tr");

    // Tạo các cột dữ liệu tương ứng với cấu trúc bảng
    row.innerHTML = `
            <th scope="row">${item.id}</th>
            <td class="text-truncate">${item.tenKhach}</td>
            <td class="text-truncate">${item.tenTro}</td>
            <td>
                <button class="btn btn-warning xem" onclick="xemYeuCau(${item.id})"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn btn-success accept" onclick="acceptYeuCau(${item.id})"><i class="fa-solid fa-square-check"></i></button>
                <button class="btn btn-danger cancel" onclick="cancelYeuCau(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;

    // Thêm dòng vào tbody
    tableBody.appendChild(row);
  });
}

window.onload = function () {
  getHoTenFromToken();
  hienThiYeuCau_Admin();
};
