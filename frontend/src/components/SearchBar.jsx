import React, { useState } from 'react';
import axios from 'axios';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            const response = await axios.get(`/api/documents/search?query=${query}`);
            onSearch(response.data);
        } catch (error) {
            console.error('Error searching documents:', error);
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold">Search Documents</h2>
            <input
                type="text"
                placeholder="Enter text to search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="border p-2 w-full"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mt-2 rounded">Search</button>
        </div>
    );
}