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

// js danh sach nha tro tu yeu cau
// Hàm để lấy danh sách nhà trọ từ API
function fetchNhaTro() {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const token = tokenData?.accessToken;
  const idUser = tokenData?.taiKhoanId; // Giả sử `iduser` được lưu trong `taiKhoanId`

  // Kiểm tra nếu token hoặc iduser không tồn tại
  if (!token || !idUser) {
    console.error("Token hoặc iduser không tồn tại");
    return;
  }

  const apiUrl = `http://localhost:8080/yeu-cau/hien-thi-1/${idUser}`; // Đường dẫn đến API của bạn

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi từ server hoặc token không hợp lệ");
      }
      return response.json();
    })
    .then((data) => {
      displayNhaTro(data); // Hiển thị danh sách nhà trọ
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

// Hàm để hiển thị danh sách nhà trọ
function displayNhaTro(nhaTroList) {
  const container = document.querySelector("#ds-tro"); // Lấy phần tử chứa danh sách nhà trọ
  container.innerHTML = ""; // Xóa nội dung cũ

  // Hàm định dạng giá VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  nhaTroList.forEach((nhaTro) => {
    const imageUrl = `http://localhost:8080/files/${nhaTro.hinhAnh}`;
    const card = `
              <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div class="card">
                      <img src="${imageUrl}" class="card-img-top" alt="${
      nhaTro.tieuDe
    }" style="height: 200px;">
                      <div class="card-body">
                          <h5 class="card-title" style="white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;">${
                            nhaTro.tieuDe
                          }</h5>
                          <p class="card-text" style="white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;">Địa chỉ: ${
                            nhaTro.diaChi
                          } 
                          <br style="white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;"> Giá thuê: ${formatCurrency(
                            nhaTro.giaThue
                          )} VND</p>
                          <a href="chitiet.html?id=${
                            nhaTro.id
                          }" class="btn btn-primary w-100" style="margin-bottom: 10px;">Chi tiết</a>
                          <a href="yeuthichKH.html" class="btn btn-danger w-100" data-id="${
                            nhaTro.id
                          }" onclick="removeFromFavorites(event)">Hủy yêu cầu</a>
                      </div>
                  </div>
              </div>`;
    container.innerHTML += card; // Thêm thẻ card vào container
  });
}

// bo yeu cau thue nha tro
// Gọi fetchNhaTro trong removeFromFavorites để cập nhật danh sách
function removeFromFavorites(event) {
  event.preventDefault();
  const nhaTroId = event.target.getAttribute("data-id");
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const token = tokenData?.accessToken;
  const idTaiKhoan = tokenData?.taiKhoanId;

  if (!token || !idTaiKhoan) {
    console.error("Token hoặc idTaiKhoan không tồn tại");
    return;
  }

  const apiUrl = `http://localhost:8080/yeu-cau`;

  const requestBody = {
    id_NhaTro: nhaTroId,
    id_TaiKhoan: idTaiKhoan,
  };

  fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response); // trả về
      alert("Hủy  yêu cầu thuê thành công");
      fetchNhaTro();
      return response.json();
    })
    .then((data) => {
      // console.log("Đã bỏ yêu thích nhà trọ:", data); //tra ve
      // fetchNhaTro(); // Gọi lại để cập nhật danh sách ngay sau khi xóa
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

window.onload = function () {
  fetchNhaTro(); // Tải danh sách khi trang vừa load
  getHoTenFromToken();
};
