import { CustomCVData } from "../types";

export const handleCVDownload = (customCV: CustomCVData | null) => {
  // Agar admin panel se CV upload nahi hui
  if (!customCV?.dataUrl) {
    alert(
      "CV is not uploaded yet. Please upload your CV from the Admin Panel.",
    );
    return;
  }

  // Uploaded CV download karega
  const link = document.createElement("a");

  link.href = customCV.dataUrl;

  // Original uploaded file ka naam use hoga
  link.download = customCV.fileName || "Talha_Ahmad_CV.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
