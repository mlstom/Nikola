import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";

const FileUpload = () => {
    const [error, setError] = useState("");
    const { files, setFiles } = useStateContext();

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter(file => {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            return ["jpg", "png", "jpeg"].includes(fileExtension);
        });

       /* if (validFiles.length !== selectedFiles.length) {
            setError("Samo jpg, jpeg i png su dozvoljeni.");
        } else {
            setError("");
        }*/

        const newFiles = validFiles.map(file => ({
            file: file, // 🛠 Sačuvaj originalni fajl
            previewUrl: URL.createObjectURL(file) // 🖼 Sačuvaj URL za prikaz
        }));

        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles(prevFiles => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            return updatedFiles;
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
                {files && files.map((fileObj, index) => (
                    <div key={index} className="relative">
                        <img
                            className="h-16 w-16 rounded-lg object-cover object-center"
                            alt={fileObj.file.name}
                            src={fileObj.previewUrl}
                        />
                        <button
                            className="absolute cursor-pointer hover:bg-red-700 top-0 right-0 bg-red-500 text-white rounded-full px-2"
                            onClick={() => removeFile(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <label className="w-[120px] h-[88px] flex flex-col items-center px-4 py-6 bg-white text-orange-500 rounded-lg shadow-lg tracking-wide uppercase border border-orange-700 cursor-pointer hover:bg-orange-700 hover:text-white">
                <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                    Dodaj slike
                </span>
                <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpeg"
                    multiple
                    onChange={handleFileChange}
                />
            </label>

            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </div>
    );
};

export default FileUpload;
