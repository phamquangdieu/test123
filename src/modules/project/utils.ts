export function getMsgIdForField(field: string) {
  if (field === "address") {
    return "detailAddress";
  } else if (field === "area") {
    return "area";
  } else if (field === "avatar") {
    return "area";
  } else if (field === "developer") {
    return "project.developer";
  } else if (field === "district") {
    return "district";
  } else if (field === "latitude" || field === "longitude") {
    return "location";
  }
}
