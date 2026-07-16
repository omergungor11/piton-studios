import type { AbstractIntlMessages } from 'next-intl';

export function pickMessages(
  messages: AbstractIntlMessages,
  namespaces: readonly string[]
): AbstractIntlMessages {
  const result: AbstractIntlMessages = {};
  for (const ns of namespaces) {
    if (ns in messages) result[ns] = messages[ns] as AbstractIntlMessages[string];
  }
  return result;
}
