// js Đăng ký
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn chặn hành động submit mặc định của form

    // Lấy dữ liệu từ form
    const hoTen = document.getElementById("reg_hovaten").value;
    const taiKhoan = document.getElementById("reg_taikhoan").value;
    const matKhau = document.getElementById("reg_matkhau").value;

    // Tạo đối tượng yêu cầu
    const requestData = {
      hoTen: hoTen,
      taiKhoan: taiKhoan,
      matKhau: matKhau,
    };

    // Gọi API bằng fetch
    fetch("http://localhost:8080/tai-khoan/dang-ky", {
      // Đường dẫn này tùy thuộc vào mapping trong controller Spring Boot của bạn
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Lấy phản hồi text từ server (ví dụ: "Đăng ký tài khoản thành công!")
        } else {
          throw new Error("Đăng ký thất bại!"); // Ném lỗi nếu trạng thái không OK
        }
      })
      .then((data) => {
        // Hiển thị thông báo thành công
        alert("Đăng ký tài khoản thành công!");
      })
      .catch((error) => {
        // Hiển thị thông báo thất bại
        alert("Đăng ký tài khoản thất bại!");
      });
  });
