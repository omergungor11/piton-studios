import 'server-only';

import { count, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { contactMessages, projects, services } from '@/lib/db/schema';

/**
 * Panel ozet sorgulari. Yalnizca admin oturumundan cagrilir; ziyaretci
 * trafiginde calismaz — Neon'un CU butcesi bu yuzden guvende.
 */

export async function unreadMessageCount(): Promise<number> {
  const [row] = await getDb()
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.status, 'new'));
  return row?.value ?? 0;
}

export async function contentCounts() {
  const db = getDb();
  const [projectRow, unpublishedRow, serviceRow] = await Promise.all([
    db.select({ value: count() }).from(projects),
    db.select({ value: count() }).from(projects).where(eq(projects.isPublished, false)),
    db.select({ value: count() }).from(services),
  ]);

  return {
    projects: projectRow[0]?.value ?? 0,
    unpublished: unpublishedRow[0]?.value ?? 0,
    services: serviceRow[0]?.value ?? 0,
  };
}
