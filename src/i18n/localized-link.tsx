'use client';

import type { ComponentProps } from 'react';
import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
import { localizeHref } from '@/lib/slugs';

const { Link: BaseLink } = createNavigation(routing);

type Props = ComponentProps<typeof BaseLink>;

/**
 * next-intl Link + yerel slug: href'teki kanonik kimlik hedef dilin slug'ina cevrilir
 * (`{ pathname: '/services/[slug]', params: { slug: 'custom-software' } }` → /tr/hizmetler/ozel-yazilim).
 * Kimlik → dil hook'u gerektirdigi icin istemci bileseni.
 */
export default function LocalizedLink(props: Props) {
  const current = useLocale();
  return <BaseLink {...props} href={localizeHref(props.href, props.locale ?? current)} />;
}
