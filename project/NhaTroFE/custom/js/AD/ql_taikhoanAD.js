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

// xem taiKhoan
function xemTaiKhoan(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `xem_taikhoanAD.html?id=${id}`;
}

// sua TaiKhoan
function suaTaiKhoan(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `sua_taikhoanAD.html?id=${id}`;
}

// xoa TaiKhoan
function xoaTaiKhoan(id) {
  const tokenData = JSON.parse(localStorage.getItem("token")); // Lấy token từ local storage
  const accessToken = tokenData ? tokenData.accessToken : null;

  const id_active = tokenData ? tokenData.taiKhoanId : null;
  if (id_active == id) {
    alert("Không thể xóa tài khoản đang hoạt động!");
    return;
  }

  if (!accessToken) {
    console.error("Không tìm thấy accessToken");
    return;
  }

  fetch(`http://localhost:8080/tai-khoan/admin/xoa/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Thêm token vào header
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Xóa tài khoản thành công");
        location.reload(); // Reload lại trang sau khi người dùng ấn "OK"
      } else {
        response.text().then((text) => {
          console.error("Lỗi khi xóa tài khoản:", text);
          alert("Không thể xóa tài khoản. Lỗi: " + text);
        });
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      alert("Lỗi khi gọi API. Vui lòng thử lại sau.");
    });
}

let currentPage = 1;
const itemsPerPage = 5;
let allData = []; // Lưu trữ tất cả dữ liệu

// Cập nhật hàm fetchTaiKhoanData
function fetchTaiKhoanData() {
  const token = localStorage.getItem("token");
  const parsedToken = JSON.parse(token);
  const accessToken = parsedToken.accessToken;

  fetch("http://localhost:8080/tai-khoan/admin/hien-thi", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
      }
      return response.json();
    })
    .then((data) => {
      allData = data; // Lưu trữ tất cả dữ liệu
      updateDisplay(); // Cập nhật hiển thị ban đầu
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

// Hàm lấy dữ liệu cho trang hiện tại
function getCurrentPageData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return allData.slice(startIndex, endIndex);
}

// Hàm cập nhật hiển thị bảng dữ liệu
function renderTableData(data) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${item.id}</th>
      <td>${item.hoTen}</td>
      <td>${item.taiKhoan}</td>
      <td>${item.chucVu == 1 ? "Admin" : "Khách hàng"}</td>
      <td>${item.trangThai == 1 ? "Hoạt động" : "Ngưng hoạt động"}</td>
      <td>
        <button class="btn btn-warning xem" onclick="xemTaiKhoan(${item.id})">
          <i class="fa-solid fa-circle-info"></i>
        </button>
        <button class="btn btn-success sua" onclick="suaTaiKhoan(${item.id})">
          <i class="fa-solid fa-screwdriver-wrench"></i>
        </button>
        <button class="btn btn-danger xoa" onclick="xoaTaiKhoan(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Hàm tạo phân trang
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationElement = document.getElementById('pagination');
  paginationElement.innerHTML = '';

  // Nút Previous
  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `<a class="page-link" ${currentPage === 1 ? 'tabindex="-1"' : ''}><<</a>`;
  prevLi.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });
  paginationElement.appendChild(prevLi);

  // Các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${currentPage === i ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link">${i}</a>`;
    li.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      updateDisplay();
    });
    paginationElement.appendChild(li);
  }

  // Nút Next
  const nextLi = document.createElement('li');
  nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `<a class="page-link" ${currentPage === totalPages ? 'tabindex="-1"' : ''}>>></a>`;
  nextLi.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });
  paginationElement.appendChild(nextLi);
}

// Hàm cập nhật hiển thị
function updateDisplay() {
  const currentPageData = getCurrentPageData();
  renderTableData(currentPageData);
  renderPagination(allData.length);
}

// Thêm tài khoản

document
  .getElementById("them-taikhoan")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy accessToken từ localStorage
    const tokenData = JSON.parse(localStorage.getItem("token")); // Assumes token in { "accessToken": "...", "idTaiKhoan": "..." }
    const accessToken = tokenData ? tokenData.accessToken : null;

    // Kiểm tra nếu không có token
    if (!accessToken) {
      alert("Vui lòng đăng nhập lại.");
      return;
    }

    // Tạo dữ liệu để gửi lên API
    const hoTen = document.getElementById("ho_va_ten").value.trim();
    const taiKhoan = document.getElementById("tai_khoan").value.trim();
    const matKhau = document.getElementById("mat_khau").value.trim();
    const diaChi = document.getElementById("dia_chi").value.trim();
    const email = document.getElementById("email").value.trim();
    const soDienThoai = document.getElementById("so_dien_thoai").value.trim();
    const chucVu = document.getElementById("chuc-vu").value;

    // Kiểm tra các trường bắt buộc
    if (!hoTen || !taiKhoan || !matKhau || !chucVu) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Tạo object dữ liệu gửi lên
    const requestData = {
      hoTen,
      taiKhoan,
      matKhau,
      diaChi,
      email,
      soDienThoai,
      chucVu: parseInt(chucVu), // Đảm bảo chucVu là số
    };

    // Gọi API thêm tài khoản
    fetch("http://localhost:8080/tai-khoan/admin/them", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        // Kiểm tra nếu request thất bại
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Thêm tài khoản thất bại");
          });
        }
        return response.text(); // Nếu thành công, trả về text thay vì JSON
      })
      .then((data) => {
        alert("Thêm tài khoản thành công!");
        // Có thể reset form hoặc chuyển hướng tại đây nếu cần
        document.getElementById("them-taikhoan").reset();
      })
      .catch((error) => {
        alert("Lỗi: " + error.message);
      });
  });

// Khởi tạo khi trang load
window.onload = function () {
  getHoTenFromToken();
  fetchTaiKhoanData();
};
