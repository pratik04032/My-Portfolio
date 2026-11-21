const GMAIL_API_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  unread: boolean;
}

interface RawGmailHeader {
  name: string;
  value: string;
}

interface RawGmailMessage {
  id: string;
  threadId: string;
  snippet?: string;
  labelIds?: string[];
  payload?: {
    headers?: RawGmailHeader[];
  };
}

function encodeBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function getHeader(headers: RawGmailHeader[] | undefined, name: string): string {
  if (!headers) return '';
  const match = headers.find((h) => h.name.toLowerCase() === name.toLowerCase());
  return match?.value || '';
}

export async function sendGmailMessage(
  accessToken: string,
  params: {
    to: string;
    subject: string;
    body: string;
    replyTo?: string;
  }
): Promise<{ id: string }> {
  const safeTo = params.to.replace(/[\r\n]/g, '').trim();
  const safeSubject = params.subject.replace(/[\r\n]/g, '').trim();
  const safeReplyTo = params.replyTo?.replace(/[\r\n]/g, '').trim();

  const lines = [
    `To: ${safeTo}`,
    ...(safeReplyTo ? [`Reply-To: ${safeReplyTo}`] : []),
    `Subject: ${safeSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    params.body,
  ];

  const raw = encodeBase64Url(lines.join('\r\n'));

  const response = await fetch(`${GMAIL_API_BASE}/messages/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(
      `Gmail send failed (${response.status})${errText ? `: ${errText}` : ''}`
    );
  }

  return response.json();
}

export async function listRecentGmailMessages(
  accessToken: string,
  options?: { maxResults?: number; query?: string }
): Promise<GmailMessageSummary[]> {
  const maxResults = options?.maxResults ?? 6;
  const searchParams = new URLSearchParams({
    maxResults: String(maxResults),
  });
  if (options?.query?.trim()) {
    searchParams.set('q', options.query.trim());
  }

  const listResponse = await fetch(
    `${GMAIL_API_BASE}/messages?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!listResponse.ok) {
    throw new Error(`Unable to fetch Gmail messages (${listResponse.status})`);
  }

  const listData = (await listResponse.json()) as {
    messages?: Array<{ id: string; threadId: string }>;
  };

  if (!listData.messages || listData.messages.length === 0) {
    return [];
  }

  const detailed = await Promise.all(
    listData.messages.map(async (item) => {
      const msgRes = await fetch(
        `${GMAIL_API_BASE}/messages/${encodeURIComponent(item.id)}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!msgRes.ok) {
        return null;
      }

      const msg = (await msgRes.json()) as RawGmailMessage;
      return {
        id: msg.id,
        threadId: msg.threadId,
        subject: getHeader(msg.payload?.headers, 'Subject') || '(No subject)',
        from: getHeader(msg.payload?.headers, 'From') || 'Unknown sender',
        date: getHeader(msg.payload?.headers, 'Date') || '',
        snippet: msg.snippet || '',
        unread: Boolean(msg.labelIds?.includes('UNREAD')),
      } satisfies GmailMessageSummary;
    })
  );

  return detailed.filter((item): item is GmailMessageSummary => item !== null);
}

export async function trashGmailMessage(
  accessToken: string,
  messageId: string
): Promise<void> {
  const response = await fetch(
    `${GMAIL_API_BASE}/messages/${encodeURIComponent(messageId)}/trash`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Unable to move message to Trash (${response.status})`);
  }
}
