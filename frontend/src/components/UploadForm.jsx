import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("documents", file);
    }

    setUploading(true);
    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadSuccess();
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

//   return (
//     <div className="p-4 border rounded my-4">
//       <input type="file" multiple onChange={handleFileChange} />
//       <button
//         onClick={handleUpload}
//         disabled={uploading || files.length === 0}
//         className="ml-2 bg-green-500 text-white px-4 py-1 rounded"
//       >
//         {uploading ? "Uploading..." : "Upload"}
//       </button>
//     </div>
//   );
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Documents</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select file(s) to upload
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className={`w-full py-2 px-4 rounded transition-colors duration-150 ${
          uploading || files.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        } text-white font-semibold`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadForm;