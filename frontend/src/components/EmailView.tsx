import { Email } from '../pages/EmailDashboard';

const categoryColors: Record<string, string> = {
  Interested: 'bg-green-100 text-green-800',
  Spam: 'bg-red-100 text-red-800',
  'Not Interested': 'bg-yellow-100 text-yellow-800',
  'Meeting Booked': 'bg-blue-100 text-blue-800',
  'Out of Office': 'bg-purple-100 text-purple-800',
};

export default function EmailView({
  email,
  onBack,
}: {
  email: Email;
  onBack: () => void;
}) {
  const categoryColor = categoryColors[email.category] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white p-6 rounded shadow space-y-4 relative">
      {/* Top bar with back button and tags */}
      <div className="flex justify-between items-center">
        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={onBack}
        >
          ← Back to Inbox
        </button>

        <div className="flex space-x-2">
          <span className="px-2 py-1 text-xs font-bold bg-gray-200 text-gray-800 rounded">
            {email.folder}
          </span>
          <span className={`px-2 py-1 text-xs font-bold rounded ${categoryColor}`}>
            {email.category}
          </span>
        </div>
      </div>

      {/* Email Content */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{email.subject}</h1>
        <div className="text-sm text-gray-600">
          From: <strong>{email.from}</strong> <br />
          To: {email.to.join(', ')} <br />
          Account: {email.account} <br />
          Date: {new Date(email.date).toLocaleString()}
        </div>
        <div className="mt-4 whitespace-pre-wrap text-gray-800">{email.text}</div>
      </div>
    </div>
  );
}
