interface Props {
    folders: string[];
    accounts: string[];
    selectedFolder: string | null;
    selectedAccount: string | null;
    onFolderChange: (val: string | null) => void;
    onAccountChange: (val: string | null) => void;
  }
  
  export default function FilterPanel({
    folders,
    accounts,
    selectedFolder,
    selectedAccount,
    onFolderChange,
    onAccountChange,
  }: Props) {
    return (
      <div className="flex flex-wrap gap-4 text-sm">
        <select
          className="p-2 border rounded"
          value={selectedFolder ?? ''}
          onChange={(e) => onFolderChange(e.target.value || null)}
        >
          <option value="">All Folders</option>
          {folders.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
  
        <select
          className="p-2 border rounded"
          value={selectedAccount ?? ''}
          onChange={(e) => onAccountChange(e.target.value || null)}
        >
          <option value="">All Accounts</option>
          {accounts.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
    );
  }
  