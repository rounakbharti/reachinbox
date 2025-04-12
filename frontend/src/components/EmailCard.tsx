import { Email } from '../pages/EmailDashboard';

const categoryColors: Record<string, string> = {
  Interested: 'bg-green-100 text-green-800',
  Spam: 'bg-red-100 text-red-800',
  'Not Interested': 'bg-yellow-100 text-yellow-800',
  'Meeting Booked': 'bg-blue-100 text-blue-800',
  'Out of Office': 'bg-purple-100 text-purple-800',
};

export default function EmailCard({
  email,
  onClick,
}: {
  email: Email;
  onClick: () => void;
}) {
  const color = categoryColors[email.category] || 'bg-gray-100 text-gray-800';

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{email.subject}</h3>
        <span className={`text-sm px-2 py-1 rounded ${color}`}>
          {email.category}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">{email.text.slice(0, 150)}...</p>
      <div className="text-xs mt-2 text-gray-500">
        From: {email.from} | Folder: {email.folder} | Account: {email.account} | Date:{' '}
        {new Date(email.date).toLocaleString()}
      </div>
    </div>
  );
}
