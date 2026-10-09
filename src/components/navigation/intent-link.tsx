'use client';

import { useState, type ComponentProps, type ReactElement, type SyntheticEvent } from 'react';
import { useLocale } from 'next-intl';
import { Link as LocalizedLink } from '@/i18n/navigation';

export type IntentLinkProps = ComponentProps<typeof LocalizedLink>;

interface PrefetchConnection {
  readonly saveData?: boolean;
  readonly effectiveType?: string;
}

type NavigatorWithConnection = Navigator & {
  readonly connection?: PrefetchConnection;
};

function allowsPrefetch(): boolean {
  const connection = (navigator as NavigatorWithConnection).connection;
  return (
    navigator.onLine !== false &&
    !connection?.saveData &&
    connection?.effectiveType !== 'slow-2g' &&
    connection?.effectiveType !== '2g'
  );
}

/**
 * Keep localized Next navigation, but wait for user intent before enabling its
 * normal prefetch/cache behavior. An explicit false always disables prefetch.
 */
export function Link({
  prefetch,
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: IntentLinkProps): ReactElement {
  const currentLocale = useLocale();
  const targetKey = JSON.stringify([props.href, props.locale ?? currentLocale]);
  const [intentTarget, setIntentTarget] = useState<string | null>(null);

  function enablePrefetch(event: SyntheticEvent<HTMLAnchorElement>): void {
    if (
      prefetch !== false &&
      intentTarget !== targetKey &&
      !event.defaultPrevented &&
      event.nativeEvent.isTrusted &&
      allowsPrefetch()
    ) {
      setIntentTarget(targetKey);
    }
  }

  return (
    <LocalizedLink
      {...props}
      prefetch={intentTarget === targetKey ? prefetch : false}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        enablePrefetch(event);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        enablePrefetch(event);
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event);
        enablePrefetch(event);
      }}
    />
  );
}

export default Link;
