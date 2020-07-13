export const handleResponse = (req,res,data) => {
  let statusCode, status;
  switch (req.method) {
    case "GET": {
      statusCode = 200;
      status = "Lấy dữ liệu thành công";
      break;
    }
    case "POST": {
      statusCode = 201;
      status = "Thêm dữ liệu thành công";
      break;
    }
    case "PUT": {
      statusCode = 200;
      status = "Cập nhật dữ liệu thành công";
      break;
    }
    case "DELETE": {
      statusCode = 200;
      status = "Xóa dữ liệu thành công";
      break;
    }
    default: {
      statusCode = 404;
      status = "Không có resoure được mô tả";
      break;
    }
  }
  return res.status(200).json({
    status,
    statusCode,
    data
  });
};
