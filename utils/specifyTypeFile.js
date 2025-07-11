export function specifyTypeFile(FileType) {
  let type = "";
  switch (FileType) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      type = "docx";
      break;

    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      type = "slide";
      break;

    case "video/mp4":
      type = "video";
      break;

    case "application/pdf":
      type = "pdf";
      break;

    default:
      type = "unknown";
      break;
  }
  return type;
}
