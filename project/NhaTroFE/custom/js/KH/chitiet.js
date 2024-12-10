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

// dang xuat
document.getElementById("btn-dangxuat").addEventListener("click", function () {
  // Xóa toàn bộ key-value trong local storage
  localStorage.clear();

  // Có thể chuyển hướng đến trang đăng nhập hoặc trang chính
  window.location.href = "/login.html"; // Thay đổi đường dẫn đến trang đăng nhập của bạn
});

// lay id va hien thi thong tin tro
// Lấy id từ query parameters trong URL
const params = new URLSearchParams(window.location.search);
const nhaTroId = params.get("id"); // 'id' là tên query parameter

if (nhaTroId && nhaTroId !== "undefined") {
  // Nếu id tồn tại và không phải là 'undefined', gọi API để lấy chi tiết nhà trọ
  fetchChiTietNhaTro(nhaTroId);
} else {
  console.error("Không tìm thấy id nhà trọ trong URL");
  // Chuyển hướng về trang khác nếu không có ID
  window.location.href = "homeKH.html";
}

function fetchChiTietNhaTro(nhaTroId) {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const token = tokenData?.accessToken;

  if (!token) {
    console.error("Token không tồn tại");
    return;
  }

  const apiUrl = `http://localhost:8080/nha-tro/${nhaTroId}`; // API để lấy chi tiết nhà trọ

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayChiTietNhaTro(data); // Hiển thị thông tin chi tiết nhà trọ
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

// Hàm để hiển thị thông tin chi tiết nhà trọ lên trang
function displayChiTietNhaTro(nhaTro) {
  const tenGiaElement = document.querySelector("#ten-gia #tieuDe");
  const giaElement = document.getElementById("gia");
  const diaChiElement = document.getElementById("dia-chi");
  const hinhAnhElement = document.querySelector("#hinh-anh img");

  // Kiểm tra nếu phần tử tồn tại trước khi gán giá trị
  if (tenGiaElement) {
    tenGiaElement.textContent = nhaTro.tieuDe || "Không có tiêu đề";
  } else {
    console.error("Phần tử tiêu đề không tồn tại");
  }

  if (giaElement) {
    // Định dạng giá thuê thành dạng có dấu phân cách
    const formattedGiaThue = new Intl.NumberFormat("vi-VN").format(
      nhaTro.giaThue
    );
    giaElement.textContent =
      "Giá thuê: " + `${formattedGiaThue} VND` || "Không có giá";
  } else {
    console.error("Phần tử giá không tồn tại");
  }

  if (diaChiElement) {
    diaChiElement.textContent =
      "Địa chỉ: " + nhaTro.diaChi || "Không có địa chỉ";
  } else {
    console.error("Phần tử địa chỉ không tồn tại");
  }

  if (hinhAnhElement) {
    const imageUrl = `http://localhost:8080/files/${nhaTro.hinhAnh}`;
    hinhAnhElement.src = imageUrl || ""; // Cập nhật hình ảnh, nếu có
    hinhAnhElement.alt = nhaTro.tieuDe || "Hình ảnh nhà trọ";
  } else {
    console.error("Phần tử hình ảnh không tồn tại");
  }

  // Cập nhật các phần tử mô tả trực tiếp qua ID
  const dienTichElement = document.getElementById("dienTich");
  const noiThatElement = document.getElementById("noiThat");
  const giaDienElement = document.getElementById("giaDien");
  const giaNuocElement = document.getElementById("giaNuoc");
  const hangElement = document.getElementById("hang");
  const trangThaiElement = document.getElementById("trangThai");

  if (dienTichElement) {
    dienTichElement.textContent = `Diện tích: ${
      nhaTro.dienTich || "Không có thông tin"
    } m²`;
  } else {
    console.error("Phần tử diện tích không tồn tại");
  }

  if (noiThatElement) {
    noiThatElement.textContent = `Nội thất: ${
      nhaTro.noiThat || "Không có thông tin"
    }`;
  } else {
    console.error("Phần tử nội thất không tồn tại");
  }

  if (giaDienElement) {
    giaDienElement.textContent =
      `Giá điện: ${new Intl.NumberFormat("vi-VN").format(
        nhaTro.giaDien || 0
      )} VND` + " /kW";
  } else {
    console.error("Phần tử giá điện không tồn tại");
  }

  if (giaNuocElement) {
    giaNuocElement.textContent =
      `Giá nước: ${new Intl.NumberFormat("vi-VN").format(
        nhaTro.giaNuoc || 0
      )} VND` + " /Khối";
  } else {
    console.error("Phần tử giá nước không tồn tại");
  }

  if (hangElement) {
    hangElement.textContent = `Hạng: ${nhaTro.hang || "Không có thông tin"}`;
  } else {
    console.error("Phần tử hạng không tồn tại");
  }

  if (trangThaiElement) {
    if (nhaTro.trangThai === 1) {
      trangThaiElement.textContent = "Trạng thái: Có thể thuê";
    } else if (nhaTro.trangThai === 0) {
      trangThaiElement.textContent = "Trạng thái: Đã được thuê";
    } else {
      trangThaiElement.textContent = "Trạng thái: Không rõ";
    }
  } else {
    console.error("Phần tử trạng thái không tồn tại");
  }
}

// them nha tro vao yeu thich
// Thêm sự kiện cho nút "Yêu thích"
document
  .querySelector("#thao-tac .btn-danger")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const nhaTroId = new URLSearchParams(window.location.search).get("id"); // Lấy id từ URL
    const tokenData = JSON.parse(localStorage.getItem("token")); // Lấy token từ local storage
    const token = tokenData?.accessToken;
    const taiKhoanId = tokenData?.taiKhoanId; // Lấy id tài khoản

    if (!token || !taiKhoanId) {
      console.error("Token hoặc ID tài khoản không tồn tại");
    }

    const yeuThichRequest = {
      id_NhaTro: nhaTroId,
      id_TaiKhoan: taiKhoanId,
    };

    fetch("http://localhost:8080/yeu-thich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(yeuThichRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi thêm vào danh sách yêu thích");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          console.log("Thêm vào yêu thích thành công");
          alert("Thêm vào danh sách yêu thích thành công!"); // Hiển thị thông báo thành công
        } else {
          alert("Bạn đã yêu thích trước đó!");
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  });

// them nha tro vao yeu cau
// Thêm sự kiện cho nút "Yêu cầu"
document
  .querySelector("#thao-tac .btn-success")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const nhaTroId = new URLSearchParams(window.location.search).get("id"); // Lấy id từ URL
    const tokenData = JSON.parse(localStorage.getItem("token")); // Lấy token từ local storage
    const token = tokenData?.accessToken;
    const taiKhoanId = tokenData?.taiKhoanId; // Lấy id tài khoản

    if (!token || !taiKhoanId) {
      console.error("Token hoặc ID tài khoản không tồn tại");
    }

    const yeuCauRequest = {
      idNhaTro: nhaTroId,
      idTaiKhoan: taiKhoanId,
    };

    fetch("http://localhost:8080/yeu-cau", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(yeuCauRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi thêm vào danh sách yêu cầu");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          console.log("Thêm vào yêu cầu thành công");
          alert("Yêu cầu thành công!"); // Hiển thị thông báo thành công
        } else {
          alert("Bạn đã yêu cầu trước đó!");
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  });

window.onload = function () {
  getHoTenFromToken();
};
