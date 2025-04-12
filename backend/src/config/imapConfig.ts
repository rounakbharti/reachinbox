import { ImapFlow } from 'imapflow';

export interface ImapAccountConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}

export async function createImapClient(config: ImapAccountConfig): Promise<ImapFlow> {
  const client = new ImapFlow({
    host: config.host,
    port: config.port,
    secure: true,
    auth: { user: config.user, pass: config.password }
  });
  await client.connect();
  return client;
}
