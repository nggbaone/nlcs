// js đăng nhập
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn form reload trang

  // Lấy thông tin tài khoản và mật khẩu từ form
  const username = document.getElementById("tai-khoan").value;
  const password = document.getElementById("mat-khau").value;

  // Tạo request body
  const loginData = {
    taiKhoan: username,
    matKhau: password,
  };

  // Gọi API đăng nhập
  fetch("http://localhost:8080/tai-khoan/dang-nhap", {
    // Đổi URL cho phù hợp
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }
      return response.json(); // Chuyển đổi kết quả trả về thành JSON
    })
    .then((data) => {
      const tokenResponse = {
        accessToken: data.tokenResponse.accessToken,
        refreshToken: data.tokenResponse.refreshToken, // nếu bạn có refreshToken
        taiKhoanId: data.tokenResponse.taiKhoanId, // nếu bạn có taiKhoanId
      };
      // Lưu token vào localStorage
      localStorage.setItem("token", JSON.stringify(tokenResponse));
      localStorage.setItem("role", data.role);
      // Kiểm tra role và chuyển hướng trang
      if (data.role === 1) {
        window.location.href = "/ql_nhatroAD.html"; // Chuyển hướng đến trang admin
      } else if (data.role === 2) {
        window.location.href = "/homeKH.html"; // Chuyển hướng đến trang khách hàng
      } else {
        alert("Role không hợp lệ");
      }
    })
    .catch((error) => {
      // Hiển thị thông báo lỗi nếu đăng nhập thất bại
      alert("Tài khoản hoặc mật khẩu không chính xác!");
    });
});
