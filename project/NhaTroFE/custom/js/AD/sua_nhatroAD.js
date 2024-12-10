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

// cap nhat
document
  .getElementById("capnhat-nhatro")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn hành vi submit mặc định

    // Lấy id từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id_tro");

    if (!id) {
      alert("Không tìm thấy ID trong URL");
      return;
    }

    // Lấy token từ local storage
    const token = JSON.parse(localStorage.getItem("token")).accessToken;

    // Tạo đối tượng chứa dữ liệu từ form
    const data = {
      id: parseInt(id), // Sử dụng id từ URL
      tieuDe: document.getElementById("ten_tro").value,
      diaChi: document.getElementById("dia_chi").value,
      dienTich: parseInt(document.getElementById("dien_tich").value),
      giaThue: parseInt(document.getElementById("gia_thue").value),
      giaDien: parseInt(document.getElementById("gia_dien").value),
      giaNuoc: parseInt(document.getElementById("gia_nuoc").value),
      noiThat: document.getElementById("noi_that").value,
      hang: parseInt(document.getElementById("hang").value),
      moTa: document.getElementById("mo_ta").value,
      tinh: parseInt(document.getElementById("tinh").value),
      huyen: parseInt(document.getElementById("huyen").value),
      trangThai: parseInt(document.getElementById("trang_thai").value),
    };

    // Gửi yêu cầu PUT
    fetch("http://localhost:8080/nha-tro/admin/cap-nhat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          alert("Cập nhật thành công");
        } else {
          alert("Có lỗi xảy ra, vui lòng thử lại");
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng kiểm tra lại");
      });
  });

// du lieu tro
function loadChiTietNhaTro() {
  // Lấy id từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id_tro");

  if (!id) {
    alert("Không tìm thấy ID trong URL");
    return;
  }

  // Lấy token từ local storage
  const token = JSON.parse(localStorage.getItem("token")).accessToken;

  // Gọi API để lấy chi tiết nhà trọ
  fetch(`http://localhost:8080/nha-tro/admin/chi-tiet/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // Đổ dữ liệu vào các input
        document.getElementById("ten_tro").value = data.tieuDe || "";
        document.getElementById("dia_chi").value = data.diaChi || "";
        document.getElementById("dien_tich").value = data.dienTich || "";
        document.getElementById("gia_thue").value = data.giaThue || "";
        document.getElementById("gia_dien").value = data.giaDien || "";
        document.getElementById("gia_nuoc").value = data.giaNuoc || "";
        document.getElementById("noi_that").value = data.noiThat || "";
        document.getElementById("hang").value = data.hang || "";
        document.getElementById("mo_ta").value = data.moTa || "";
        document.getElementById("trang_thai").value = data.trangThai || 0;
        const hinhAnhElement = document.querySelector("#hinhanh img");
        if (hinhAnhElement) {
          const imageUrl = `http://localhost:8080/files/${data.hinhAnh}`;
          hinhAnhElement.src = imageUrl || ""; // Cập nhật hình ảnh, nếu có
          hinhAnhElement.alt = data.tieuDe || "Hình ảnh nhà trọ";
        } else {
          console.error("Phần tử hình ảnh không tồn tại");
        }
      } else {
        alert("Không tìm thấy dữ liệu");
      }
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra khi tải dữ liệu");
    });
}

window.onload = function () {
  fetchTinh();
  loadChiTietNhaTro();

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
