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

// js danh sach nha tro va tinh
// Hàm để lấy danh sách nhà trọ từ API
function fetchNhaTro() {
  const apiUrl = "http://localhost:8080/nha-tro/khach/show"; // Đường dẫn đến API của bạn

  fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
                      <img src="${imageUrl}" class="card-img-top" style="height: 200px;" alt="${
      nhaTro.tieuDe
    }">
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
                          }" class="btn btn-primary w-100">Chi tiết</a>
                      </div>
                  </div>
              </div>`;
    container.innerHTML += card; // Thêm thẻ card vào container
  });
}

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

// tim kiem nha tro
document.getElementById("tim-kiem").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn chặn reload trang
  // Lấy thông tin từ các input
  const tieuDe = document.getElementById("tieuDe").value;
  const giaTu = document.getElementById("giaTu").value;
  const giaDen = document.getElementById("giaDen").value;
  const dienTich = document.getElementById("dienTich").value;
  const hang = document.getElementById("hang").value;
  const huyen = document.getElementById("huyen").value;

  // Chuẩn bị dữ liệu gửi lên API
  const requestData = {
    tieuDe: tieuDe || null,
    giaTu: giaTu ? parseInt(giaTu) : null,
    giaDen: giaDen ? parseInt(giaDen) : null,
    dienTich: dienTich ? parseInt(dienTich) : null,
    hang: hang ? parseInt(hang) : null,
    huyen: huyen ? parseInt(huyen) : null,
  };

  // Lấy token từ local storage
  const token = JSON.parse(localStorage.getItem("token"))?.accessToken;

  // Gọi API tìm kiếm
  fetch("http://localhost:8080/nha-tro/tim-kiem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Không thể thực hiện tìm kiếm. Vui lòng thử lại!");
      }
      return response.json();
    })
    .then((data) => {
      const container = document.querySelector("#ds-tro"); // Lấy phần tử chứa danh sách nhà trọ
      container.innerHTML = ""; // Xóa nội dung cũ

      // Hàm định dạng giá VND
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      };

      if (data.length === 0) {
        alert("Không tìm thấy nhà trọ phù hợp!");
        return;
      }

      // Hiển thị thông báo số lượng kết quả tìm kiếm
      alert(`Tìm kiếm thành công! Có ${data.length} kết quả được tìm thấy.`);

      data.forEach((nhaTro) => {
        const imageUrl = `http://localhost:8080/files/${nhaTro.hinhAnh}`;
        const card = `
              <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div class="card">
                      <img src="${imageUrl}" class="card-img-top" style="height: 200px;" alt="${
          nhaTro.tieuDe
        }">
                      <div class="card-body">
                          <h5 class="card-title" style="white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;">${
                            nhaTro.tieuDe
                          }</h5>
                          <p class="card-text" style="white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;">Địa chỉ: ${
                            nhaTro.diaChi
                          } <br style="white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;"> Giá thuê: ${formatCurrency(
          nhaTro.giaThue
        )} VND</p>
                          <a href="chitiet.html?id=${
                            nhaTro.id
                          }" class="btn btn-primary w-100">Chi tiết</a>
                      </div>
                  </div>
              </div>`;
        container.innerHTML += card; // Thêm thẻ card vào container
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra: " + error.message);
    });
});

// Gọi cả hai hàm khi trang được tải
window.onload = function () {
  fetchNhaTro();
  fetchTinh();
  getHoTenFromToken();

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
