import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import EmailList from '../components/EmailList';
import { fetchEmails } from '../services/apiService.ts';

const HomePage = () => {
    const [emails, setEmails] = useState([]);

    const handleSearch = async (query: string) => {
        try {
            const response = await fetchEmails(query);
            setEmails(response.data);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Email Search</h1>
            <SearchBar onSearch={handleSearch} />
            <EmailList emails={emails} />
        </div>
    );
};

export default HomePage;
