import { ChangeEvent, useState } from "react";
import "./style.css";

interface UploadFileProps {
  setError: (value: string) => void;
  setImg: (value: string) => void;
}

export const UploadFile = ({ setError, setImg }: UploadFileProps) => {
  const [fileName, setFileName] = useState("");
  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      setError("This is not a file");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {
      const url = fileReader.result ?? "";
      setImg(url.toString());
      setFileName(file.name);
    });
  };

  return (
    <div className="file-upload-container">
      <label className="file-upload-input-container">
        <input type="file" onChange={onUpload} />
        Upload file
      </label>
      <p>{fileName}</p>
    </div>
  );
};
