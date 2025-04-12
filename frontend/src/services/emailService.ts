export async function fetchEmails(params = {}): Promise<{ hits: Email[]; total: { value: number } }> {
  const cleanedParams: any = {};
  for (const key in params) {
    if (params[key] !== null && params[key] !== undefined) {
      cleanedParams[key] = params[key];
    }
  }

  const query = new URLSearchParams(cleanedParams).toString();
  const res = await fetch(`http://localhost:3000/api/emails?${query}`);

  if (!res.ok) {
    const text = await res.text();
    console.error('Backend error response:', text);
    throw new Error('Failed to fetch emails');
  }

  const data = await res.json();
  return { hits: data.hits || [], total: data.total || { value: 0 } };
}
