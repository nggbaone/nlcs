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

// them bao cao su co
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy token từ local storage
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const accessToken = tokenData ? tokenData.accessToken : null;

  const urlParams = new URLSearchParams(window.location.search);
  const id_HopDong = urlParams.get("id");

  // Kiểm tra token
  if (!accessToken) {
    alert("Không tìm thấy access token, vui lòng đăng nhập lại.");
    return;
  }

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

      // Sau khi upload tất cả ảnh thành công, gọi API báo cáo sự cố
      const noiDung = document.getElementById("noiDung").value;

      // Lấy token từ local storage
      const t = JSON.parse(localStorage.getItem("token"));
      const a = t ? t.accessToken : null;

      const suCoData = {
        id_HopDong: id_HopDong,
        noiDung: noiDung,
        hinhAnh: fileNamesString, // Gửi chuỗi tên ảnh cách nhau bởi dấu ;
      };

      return fetch("http://localhost:8080/su-co/khach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + a,
        },
        body: JSON.stringify(suCoData),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi báo cáo sự cố.");
      }
      return response.json();
    })
    .then((result) => {
      if (result) {
        alert("Gửi báo cáo sự cố thành công!");
        window.location.href = "http://localhost:5500/baocaoKH.html";
      } else {
        throw new Error("Gửi báo cáo thất bại, vui lòng thử lại.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra: " + error.message);
    });
});

// Gọi cả hai hàm khi trang được tải
window.onload = function () {
  getHoTenFromToken();
};
