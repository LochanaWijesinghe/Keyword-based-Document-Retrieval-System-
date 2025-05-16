import React from "react";

export default function DocumentList({ documents }) {
    if (!Array.isArray(documents)) {
        console.error("Document List received non-array documents:", documents);
        return <p className="text-red-500">No documents uploaded.</p>;
    }

    // return (
    //     <div className="mt-6">
    //         <h2 className="text-lg font-semibold">Documents</h2>
    //         {documents.length === 0 ? (
    //             <p className="text-gray-500">No documents found.</p>
    //         ) : (
    //             <ul className="list-disc pl-5">
    //                 {documents.map((doc, index) => (
    //                     <li key={index} className="mb-2">
    //                         <h3 className="font-bold">{doc.title || 'Untitled Document'}</h3>
    //                     </li>
    //                 ))}
    //             </ul>
    //         )}
    //     </div>
    // );
    return (
        <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Documents</h2>
            {documents.length === 0 ? (
                <p className="text-gray-500">No documents found.</p>
            ) : (
                <ul className="space-y-4">
                    {documents.map((doc, index) => (
                        <li
                            key={index}
                            className="bg-gray-50 hover:bg-blue-50 transition-colors duration-150 rounded-lg p-4 shadow-sm"
                        >
                            <h3 className="font-semibold text-lg text-blue-700 mb-1">
                                {doc.title || doc.name || 'Untitled Document'}
                            </h3>
                            {doc.snippet && (
                                <p className="text-gray-600 text-sm">{doc.snippet}</p>
                            )}
                            {doc.id && (
                                <span className="text-xs text-gray-400">ID: {doc.id}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
