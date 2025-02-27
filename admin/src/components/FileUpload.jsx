import React, { useState } from "react";

const FileUpload = () => {
    const [fileName, setFileName] = useState("");
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (fileExtension === "jpg" || fileExtension === "png" || fileExtension === "jpeg") {
                setFileName(file.name);
                setError(""); // Reset error message

                // Kreiraj URL za prikaz slike
                const imageUrl = URL.createObjectURL(file);
                setPreview(imageUrl);
            } else {
                setFileName("");
                setPreview(null);
                setError("Samo jpg, jpeg i png su dozvoljeni.");
            }
        }
    };

    return (
        <div className="flex flex-row  gap-4 ">
            Nova:
            {preview && (
                <div >
                    <img
                        className="relative mr-4 inline-block h-16 w-16 rounded-lg object-cover object-center"
                        alt="Image placeholder"
                        src={preview}
                    />
                    <div className='cursor-pointer w-[20px] px-2' onClick={()=>{setPreview() ; setFileName("")}}>
                        X
                    </div>
                </div>
            )}
            {!preview && <label className="w-[80px] h-[88px] flex flex-col items-center px-4 py-6 bg-white text-orange-500 rounded-lg shadow-lg tracking-wide uppercase border border-orange-700 cursor-pointer hover:bg-orange-700 hover:text-white">
                <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                    {fileName || "Select a file"}
                </span>
                <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpeg"
                    onChange={handleFileChange}
                />
            </label>}

            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

        </div>
    );
};

export default FileUpload;
