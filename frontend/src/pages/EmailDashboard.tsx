import { useEffect, useState } from 'react';
import { fetchEmails } from '../services/emailService';
import EmailCard from '../components/EmailCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EmailView from '../components/EmailView';

export interface Email {
  subject: string;
  text: string;
  folder: string;
  account: string;
  date: string;
  from: string;
  to: string[];
  category: string;
  uid: string;
}

const PAGE_SIZE = 200;

function EmailDashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const loadEmails = async () => {
    const { hits, total } = await fetchEmails({
      query,
      folder: selectedFolder,
      account: selectedAccount,
      page,
      size: PAGE_SIZE,
    });
    setEmails(hits);
    setTotal(total.value || 0); // Elasticsearch returns total as an object
  };

  useEffect(() => {
    loadEmails();
  }, [query, selectedFolder, selectedAccount, page]);

  const uniqueFolders = [...new Set(emails.map((e) => e.folder))];
  const uniqueAccounts = [...new Set(emails.map((e) => e.account))];

  return (
    <div className="space-y-4">
      <SearchBar query={query} setQuery={setQuery} />
      <FilterPanel
        folders={uniqueFolders}
        accounts={uniqueAccounts}
        selectedFolder={selectedFolder}
        selectedAccount={selectedAccount}
        onFolderChange={(f) => {
          setSelectedFolder(f);
          setPage(1); // Reset to page 1 on filter change
        }}
        onAccountChange={(a) => {
          setSelectedAccount(a);
          setPage(1); // Reset to page 1 on filter change
        }}
      />

      {selectedEmail ? (
        <EmailView email={selectedEmail} onBack={() => setSelectedEmail(null)} />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4">
            {emails.map((email) => (
              <div key={email.uid} onClick={() => setSelectedEmail(email)}>
                <EmailCard email={email} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil(total / PAGE_SIZE)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * PAGE_SIZE >= total}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailDashboard;
