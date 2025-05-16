import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import SearchBar from './components/SearchBar';
import DocumentList from './components/DocumentList';

function App() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('/api/documents');
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-8">
            <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-8">
                {/* Title Section */}
                <div className="bg-blue-100 rounded-lg p-6 shadow mb-4">
                    <h1 className="text-3xl font-extrabold text-center text-blue-700 tracking-tight drop-shadow">
                        Keyword-based Document Retrieval System
                    </h1>
                </div>
                {/* Upload Section */}
                <div className="bg-green-50 rounded-lg p-6 shadow mb-4">
                    <UploadForm />
                </div>
                {/* Search Section */}
                <div className="bg-yellow-50 rounded-lg p-6 shadow mb-4">
                    <SearchBar onSearch={setDocuments} />
                </div>
                {/* Document List Section */}
                <div className="bg-gray-50 rounded-lg p-6 shadow">
                    <DocumentList documents={documents} />
                </div>
            </div>
        </div>
        
        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">Document Retrieval System</h1>
        //     <UploadForm />
        //     <SearchBar onSearch={setDocuments} />
        //     <DocumentList documents={documents} />
        // </div>
    );
}

export default App;