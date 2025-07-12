import { toast } from "react-toastify";

export const handleFileChange = (e, allowedTypes, size, setSelectedFile) => {
  const file = e.target.files[0];
  if (file) {
    if (!allowedTypes.includes(file.type)) {
      toast.error("فرمت فایل مجاز نیست.");
      e.target.value = "";
      return;
    }
    const maxSize = size * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`فایل ${file.name} بزرگ‌تر از ${size} مگابایت است.`);
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
  }
};
