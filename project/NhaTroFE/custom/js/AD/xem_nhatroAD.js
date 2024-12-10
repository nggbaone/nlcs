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

window.onload = function () {
  // Lấy id_tro từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const nhaTroId = urlParams.get("id_tro");

  // Hàm gọi API chi tiết nhà trọ
  async function loadChiTietNhaTro() {
    try {
      const parsedToken = JSON.parse(token);
      const accessToken = parsedToken.accessToken; // Lấy accessToken từ token
      const response = await fetch(
        `http://localhost:8080/nha-tro/admin/chi-tiet/${nhaTroId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải dữ liệu");
      }

      const data = await response.json();

      // Gán dữ liệu vào các input trong form
      document.getElementById("ten_tro").value = data.tieuDe;
      document.getElementById("dien_tich").value = data.dienTich;
      document.getElementById("gia_thue").value = data.giaThue;
      document.getElementById("gia_dien").value = data.giaDien;
      document.getElementById("gia_nuoc").value = data.giaNuoc;
      document.getElementById("noi_that").value = data.noiThat;
      document.getElementById("hang").value = data.hang;
      document.getElementById("mo_ta").value = data.moTa;
      document.getElementById("dia_chi").value = data.diaChi;
      document.getElementById("tinh").value = data.tinh;
      document.getElementById("id").value = data.id;
      document.getElementById("huyen").value = data.huyen;
      document.getElementById("trang_thai").value = data.trangThai;

      const hinhAnhElement = document.querySelector("#hinh_anh img");
      if (hinhAnhElement) {
        const imageUrl = `http://localhost:8080/files/${data.hinhAnh}`;
        hinhAnhElement.src = imageUrl || ""; // Cập nhật hình ảnh, nếu có
        hinhAnhElement.alt = data.tieuDe || "Hình ảnh nhà trọ";
      } else {
        console.error("Phần tử hình ảnh không tồn tại");
      }
      
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết nhà trọ:", error);
    }
  }

  // Gọi hàm khi trang load xong
  if (nhaTroId) {
    loadChiTietNhaTro();
  } else {
    console.error("Không tìm thấy id_tro trong URL");
  }
};
