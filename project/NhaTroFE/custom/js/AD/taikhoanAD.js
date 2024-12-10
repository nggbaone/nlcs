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

// Hiện thông tin ng dùng
document.addEventListener("DOMContentLoaded", function () {
  // Lấy token từ localStorage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const token = tokenData?.accessToken; // Lấy accessToken từ token
  const idUser = tokenData?.taiKhoanId; // Lấy taiKhoanId từ token

  // Kiểm tra nếu token hoặc idUser không tồn tại
  if (!token || !idUser) {
    console.error("Token hoặc idUser không tồn tại");
    return;
  }

  const apiUrl = `http://localhost:8080/tai-khoan/${idUser}`; // Đường dẫn đến API của bạn

  // Gọi API
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi accessToken trong header Authorization
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // Đổ dữ liệu vào các input
        document.getElementById("input-1").value = data.hoTen;
        document.getElementById("input-2").value = data.taiKhoan;
        document.getElementById("input-3").value = data.email;
        document.getElementById("input-4").value = data.soDienThoai;
        document.getElementById("input-5").value = data.diaChi;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// cap nhat tai khoan
document
  .querySelector("#cap-nhat-from")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn không cho form reload trang

    // Lấy các giá trị từ form
    const hoTen = document.getElementById("input-1").value;
    const taiKhoan = document.getElementById("input-2").value;
    const email = document.getElementById("input-3").value;
    const soDienThoai = document.getElementById("input-4").value;
    const diaChi = document.getElementById("input-5").value;

    // Lấy token từ local storage
    const tokenData = JSON.parse(localStorage.getItem("token")); // Giả sử token là chuỗi JSON lưu trong localStorage
    const accessToken = tokenData.accessToken; // Lấy accessToken từ JSON
    const taiKhoanId = tokenData.taiKhoanId; // Lấy taiKhoanId từ JSON

    // Tạo đối tượng chứa dữ liệu cần cập nhật, bao gồm taiKhoanId
    const updatedData = {
      id: taiKhoanId,
      hoTen: hoTen,
      taiKhoan: taiKhoan,
      email: email,
      soDienThoai: soDienThoai,
      diaChi: diaChi,
    };

    // Gửi request API
    fetch("http://localhost:8080/tai-khoan/khach/cap-nhat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken, // Gửi accessToken trên header
      },
      body: JSON.stringify(updatedData), // Chuyển dữ liệu thành JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi cập nhật tài khoản");
        }
        return response.json();
      })
      .then((data) => {
        alert("Cập nhật tài khoản thành công");
        console.log(data); // Xử lý phản hồi từ server nếu cần
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Cập nhật tài khoản thất bại");
      });
  });

// doi mat khau
document
  .querySelector("#mat-khau-from")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn không cho form reload trang

    // Lấy các giá trị từ form
    const matKhauHienTai = document.getElementById("matKhauHienTai").value;
    const matKhauMoi1 = document.getElementById("matKhauMoi1").value;
    const matKhauMoi2 = document.getElementById("matKhauMoi2").value;

    // Lấy token từ local storage
    const tokenData = JSON.parse(localStorage.getItem("token")); // Giả sử token là chuỗi JSON lưu trong localStorage
    const accessToken = tokenData.accessToken; // Lấy accessToken từ JSON
    const taiKhoanId = tokenData.taiKhoanId; // Lấy taiKhoanId từ JSON

    // Tạo đối tượng chứa dữ liệu cần cập nhật, bao gồm taiKhoanId
    const updatedData = {
      id: taiKhoanId,
      matKhauHienTai: matKhauHienTai,
      matKhauMoi1: matKhauMoi1,
      matKhauMoi2: matKhauMoi2,
    };

    // Gửi request API
    fetch("http://localhost:8080/tai-khoan/khach/mat-khau", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken, // Gửi accessToken trên header
      },
      body: JSON.stringify(updatedData), // Chuyển dữ liệu thành JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi gọi API");
        }
        return response.json();
      })
      .then((data) => {
        if (data === true) {
          alert("Đổi mật khẩu thành công");
          location.reload(); // Reload lại trang
        } else {
          alert("Đổi mật khẩu thất bại");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Đổi mật khẩu thất bại");
      });
  });

// them giay to
document
  .getElementById("giay-to-from")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy token từ local storage
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const accessToken = tokenData ? tokenData.accessToken : null;
    const id_active = tokenData ? tokenData.taiKhoanId : null;

    // Lấy thông tin các file
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    // Kiểm tra nếu không có file nào được chọn
    if (!files.length) {
      alert("Vui lòng chọn ít nhất một hình ảnh để tải lên.");
      return;
    }

    // Tạo mảng chứa các promise upload file
    const uploadPromises = [];
    const uploadedFileNames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const uploadPromise = fetch("http://localhost:8080/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken, // Gửi accessToken
        },
        body: uploadFormData,
      })
        .then((response) => {
          // if (!response.ok) {
          //   throw new Error(`Lỗi khi upload file: ${file.name}`);
          // }
          // return response.json(); // Lấy phản hồi từ API upload
        })
        .then((uploadResponse) => {
          console.log(`File uploaded: ${file.name}`);
          uploadedFileNames.push(file.name); // Thêm tên file đã upload thành công vào danh sách
        });

      uploadPromises.push(uploadPromise);
    }

    // Chờ tất cả các file được upload
    Promise.all(uploadPromises)
      .then(() => {
        // Biến uploadedFileNames thành chuỗi cách nhau bởi dấu ;
        const fileNamesString = uploadedFileNames.join(";");

        // Lấy token từ local storage
        const temp_token = JSON.parse(localStorage.getItem("token"));
        const temp_accsessToken = temp_token ? temp_token.accessToken : null;
        const temp_id_active = temp_token ? temp_token.taiKhoanId : null;

        const giayToData = {
          id: temp_id_active,
          giayTo: fileNamesString, // Gửi chuỗi tên ảnh cách nhau bởi dấu ;
        };

        return fetch(`http://localhost:8080/tai-khoan/them-giay-to`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + temp_accsessToken,
          },
          body: JSON.stringify(giayToData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi thêm giấy tờ.");
        }
        return response.json();
      })
      .then((result) => {
        if (result) {
          alert("Thêm giấy tờ thành công!");
          location.reload();
        } else {
          throw new Error("Thêm thất bại, vui lòng thử lại.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Có lỗi xảy ra: " + error.message);
      });
  });

// Hàm tạo carousel tùy chỉnh
function createCustomCarousel(hinhAnhArray) {
  const carouselImages = document.getElementById("carousel-images");

  if (hinhAnhArray.length > 0) {
    // Tạo các phần tử ảnh trong carousel
    const imagesHTML = hinhAnhArray
      .map((hinhAnh, index) => {
        return `<div class="carousel-item ${index === 0 ? "active" : ""}">
                      <img src="http://localhost:8080/files/${hinhAnh.trim()}" class="d-block" alt="Hình ảnh">
                  </div>`;
      })
      .join("");

    carouselImages.innerHTML = imagesHTML;
  } else {
    carouselImages.innerHTML = "<p>Không có ảnh để hiển thị.</p>";
  }
}

// Hàm gọi API và hiển thị dữ liệu
function hienThiGiayTo() {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;
  const id = tokenData ? tokenData.taiKhoanId : null;

  fetch(`http://localhost:8080/tai-khoan/hien-giay-to/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải dữ liệu chi tiết sự cố.");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        const hinhAnhChuoi = data.giayTo; // Chuỗi ảnh, ví dụ: "image1.jpg;image2.jpg"
        let hinhAnhArray = []; // Đổi từ const sang let
        if (hinhAnhChuoi !== null && hinhAnhChuoi.trim() !== "") {
          hinhAnhArray = hinhAnhChuoi
            .split(";")
            .filter((hinhAnh) => hinhAnh.trim() !== "");
        }

        // Tạo carousel nếu có hình ảnh
        if (hinhAnhArray.length > 0) {
          createCustomCarousel(hinhAnhArray);
        } else {
          document.getElementById("carousel-images").innerHTML =
            "<p>Không có ảnh để hiển thị.</p>";
        }
      } else {
        alert("Không tìm thấy dữ liệu giấy tờ.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra: " + error.message);
    });
}

function xoaGiayTo() {
  // Xác nhận trước khi xóa
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa giấy tờ này không?");
  if (!confirmDelete) return;

  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;
  const id = tokenData ? tokenData.taiKhoanId : null;

  // Gửi yêu cầu API xóa
  fetch(`http://localhost:8080/tai-khoan/xoa-giay-to/${id}`, {
    method: "POST", // API của bạn sử dụng POST
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Nếu phản hồi trả về JSON
      } else {
        throw new Error(`Lỗi xóa giấy tờ: ${response.status}`);
      }
    })
    .then((result) => {
      if (result) {
        alert("Xóa giấy tờ thành công!");
        location.reload(); // Làm mới trang sau khi xóa thành công
      } else {
        alert("Không thể xóa giấy tờ. Vui lòng thử lại.");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API xóa giấy tờ:", error);
      alert("Đã xảy ra lỗi khi xóa giấy tờ.");
    });
}

window.onload = function () {
  getHoTenFromToken();
  hienThiGiayTo();
};
