import React from 'react';

const EmailList = ({ emails }: { emails: any[] }) => {
    return (
        <div className="space-y-4">
            {emails.length > 0 ? (
                emails.map((email, index) => (
                    <div
                        key={index}
                        className="border rounded px-4 py-2 shadow-sm hover:shadow-md"
                    >
                        <h3 className="font-semibold">{email.subject}</h3>
                        <p>{email.body}</p>
                    </div>
                ))
            ) : (
                <p>No emails found.</p>
            )}
        </div>
    );
};

export default EmailList;
