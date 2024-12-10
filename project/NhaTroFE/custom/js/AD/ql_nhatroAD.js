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

// Hàm để lấy danh sách tỉnh từ API
function fetchTinh() {
  const apiUrl = "http://localhost:8080/tinh"; // Đường dẫn đến API của bạn

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      populateTinhSelect(data); // Gọi hàm để hiển thị tỉnh
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

// Hàm để cập nhật dropdown tỉnh
function populateTinhSelect(tinhList) {
  const tinhSelect = document.getElementById("tinh"); // Lấy phần tử select

  // Xóa các option cũ
  tinhSelect.innerHTML =
    '<option value="" style="background-color: white !important; color: black !important;">Chọn tỉnh</option>';

  // Thêm các tỉnh vào select
  tinhList.forEach((tinh) => {
    const option = document.createElement("option");
    option.value = tinh.id; // Hoặc giá trị phù hợp với yêu cầu của bạn
    option.textContent = tinh.tenTinh; // Hiển thị tên tỉnh
    tinhSelect.appendChild(option); // Thêm option vào select
  });
}

// Hàm để lấy danh sách huyện theo tỉnh
function fetchHuyenByTinh(tinhId) {
  const apiUrl = `http://localhost:8080/huyen/${tinhId}`; // Đường dẫn đến API của bạn

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      populateHuyenSelect(data); // Gọi hàm để hiển thị huyện
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

// Hàm để cập nhật dropdown huyện
function populateHuyenSelect(huyenList) {
  const huyenSelect = document.getElementById("huyen"); // Lấy phần tử select huyện

  // Xóa các option cũ
  huyenSelect.innerHTML = '<option value="">Chọn huyện</option>';

  // Thêm các huyện vào select
  huyenList.forEach((huyen) => {
    const option = document.createElement("option");
    option.value = huyen.id; // Hoặc giá trị phù hợp với yêu cầu của bạn
    option.textContent = huyen.tenHuyen; // Hiển thị tên huyện
    huyenSelect.appendChild(option); // Thêm option vào select
  });
}

// xem NhaTro
function xemNhaTro(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `xem_nhatroAD.html?id_tro=${id}`;
}

// sua NhaTro
function suaNhaTro(id) {
  // Chuyển hướng đến trang chi tiết nhà trọ với id trên URL
  window.location.href = `sua_nhatroAD.html?id_tro=${id}`;
}

// Thêm biến quản lý phân trang
let currentPage = 1;
const itemsPerPage = 5; // Số nhà trọ hiển thị trên mỗi trang
let totalItems = 0;
let allNhaTro = []; // Mảng lưu tất cả nhà trọ

// Sửa lại hàm hienThiNhaTro
function hienThiNhaTro() {
  const apiUrl = "http://localhost:8080/nha-tro";
  const parsedToken = JSON.parse(token);
  const accessToken = parsedToken.accessToken;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      allNhaTro = data;
      totalItems = data.length;
      displayPagination();
      displayNhaTroPage(currentPage);
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}

// Thêm hàm hiển thị phân trang
function displayPagination() {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // Nút Previous
  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `<a class="page-link" href="#" ${currentPage === 1 ? 'tabindex="-1"' : ''}><<</a>`;
  prevLi.onclick = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayNhaTroPage(currentPage);
      displayPagination();
      scrollToTable();
    }
  };
  pagination.appendChild(prevLi);

  // Các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${currentPage === i ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = (e) => {
      e.preventDefault();
      currentPage = i;
      displayNhaTroPage(currentPage);
      displayPagination();
      scrollToTable();
    };
    pagination.appendChild(li);
  }

  // Nút Next
  const nextLi = document.createElement('li');
  nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `<a class="page-link" href="#" ${currentPage === totalPages ? 'tabindex="-1"' : ''}>>></a>`;
  nextLi.onclick = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayNhaTroPage(currentPage);
      displayPagination();
      scrollToTable();
    }
  };
  pagination.appendChild(nextLi);
}

// Thêm hàm hiển thị nhà trọ theo trang
function displayNhaTroPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const nhaTroPage = allNhaTro.slice(startIndex, endIndex);
  
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  nhaTroPage.forEach((nhaTro) => {
    const giaThueFormatted = nhaTro.giaThue.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row" class="text-truncate" title="${nhaTro.id}">${nhaTro.id}</th>
        <td class="text-truncate" title="${nhaTro.tieuDe}">${nhaTro.tieuDe}</td>
        <td class="text-truncate" title="${nhaTro.dienTich} m²">${nhaTro.dienTich} m²</td>
        <td class="text-truncate" title="${giaThueFormatted}">${giaThueFormatted}</td>
        <td class="text-truncate" title="${nhaTro.trangThai === 1 ? "Còn trống" : "Đã cho thuê"}">
          ${nhaTro.trangThai === 1 ? "Còn trống" : "Đã cho thuê"}
        </td>
        <td>
          <button class="btn btn-warning xem" onclick="xemNhaTro(${nhaTro.id})"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn btn-success sua" onclick="suaNhaTro(${nhaTro.id})"><i class="fa-solid fa-screwdriver-wrench"></i></button>
          <button class="btn btn-danger xoa" onclick="xoaNhaTro(${nhaTro.id})"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;
    tbody.appendChild(row);
  });
}

// Thêm hàm cuộn đến bảng
function scrollToTable() {
  const table = document.querySelector(".table");
  if (table) {
    table.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// them nha tro
document.getElementById("them-nhatro").addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy token từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token")); // Giả sử token được lưu dưới dạng JSON
  const accessToken = tokenData ? tokenData.accessToken : null;

  // Kiểm tra xem có accessToken hay không
  if (!accessToken) {
    alert("Không tìm thấy access token, vui lòng đăng nhập lại.");
    return;
  }

  // Lấy thông tin file
  const fileInput = document.getElementById("hinh_anh");
  const file = fileInput.files[0];

  // Kiểm tra nếu người dùng chưa chọn file
  if (!file) {
    alert("Vui lòng chọn một hình ảnh để tải lên.");
    return;
  }

  // Tạo FormData để upload file
  const uploadFormData = new FormData();
  uploadFormData.append("file", file);

  // Gọi API /upload để tải file
  fetch("http://localhost:8080/upload", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken, // Gửi accessToken trong header
    },
    body: uploadFormData, // Sử dụng FormData để gửi file
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi upload file");
      }
      return response.json(); // API trả về thông báo từ backend
    })
    .then((uploadResponse) => {
      console.log("Upload Response:", uploadResponse.message);

      // Sau khi upload file thành công, gọi API thêm nhà trọ
      const formData = {
        tieuDe: document.getElementById("ten_tro").value,
        diaChi: document.getElementById("dia_chi").value,
        dienTich: document.getElementById("dien_tich").value,
        giaThue: document.getElementById("gia_thue").value,
        giaDien: document.getElementById("gia_dien").value,
        giaNuoc: document.getElementById("gia_nuoc").value,
        noiThat: document.getElementById("noi_that").value,
        hang: document.getElementById("hang").value,
        moTa: document.getElementById("mo_ta").value,
        huyen: document.getElementById("huyen").value,
        tinh: document.getElementById("tinh").value,
        hinhAnh: file.name, // Tên file đã upload
      };

      return fetch("http://localhost:8080/nha-tro/them", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(formData),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi thêm nhà trọ");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Response text:", data);
      alert("Thêm nhà trọ thành công!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra: " + error.message);
    });
});

// Xóa nhà trọ
function xoaNhaTro(id) {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;
  if (!accessToken) {
    alert("Không tìm thấy access token.");
    return;
  }
  fetch(`http://localhost:8080/nha-tro/admin/xoa/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result === true) {
        alert("Đã xóa thành công!");
        location.reload();
      } else {
        alert("Lỗi: Không thể xóa nhà trọ.");
      }
    })
    .catch((error) => alert("Lỗi khi xóa nhà trọ: " + error.message));
}

window.onload = function () {
  fetchTinh();
  getHoTenFromToken();
  hienThiNhaTro();

  // Thêm sự kiện lắng nghe thay đổi cho select tỉnh
  document.getElementById("tinh").addEventListener("change", function () {
    const tinhId = this.value; // Lấy giá trị tỉnh đã chọn
    if (tinhId) {
      fetchHuyenByTinh(tinhId); // Gọi hàm lấy danh sách huyện theo tỉnh đã chọn
    } else {
      populateHuyenSelect([]); // Nếu không có tỉnh nào được chọn, xóa danh sách huyện
    }
  });
};
