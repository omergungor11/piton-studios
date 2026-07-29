import 'server-only';

import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { auditLog, adminUsers } from '@/lib/db/schema';

/**
 * Denetim kaydi. Tek kisilik ekipte bile "bunu ne zaman, neden degistirdim"
 * sorusunun cevabi. Tum mutasyonlarda cagrilmali.
 */

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'publish'
  | 'unpublish'
  | 'login'
  | 'upload';

export type AuditEntity =
  | 'project'
  | 'project_translation'
  | 'service'
  | 'service_translation'
  | 'media'
  | 'message'
  | 'admin_user';

interface RecordInput {
  actorId: string | null;
  action: AuditAction;
  entity: AuditEntity;
  entityId?: string;
  /** Degisiklik ozeti — { alan: { from, to } } veya serbest bicim. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  diff?: Record<string, any>;
}

export async function recordAudit(input: RecordInput): Promise<void> {
  try {
    await getDb().insert(auditLog).values({
      actorId: input.actorId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? null,
      diff: input.diff ?? null,
    });
  } catch (error) {
    // Denetim kaydi asla asil islemi dusurmemeli — logla, gec.
    console.error('[audit] kayit basarisiz:', error);
  }
}

export async function recentAudit(limit = 10) {
  return getDb()
    .select({
      id: auditLog.id,
      action: auditLog.action,
      entity: auditLog.entity,
      entityId: auditLog.entityId,
      createdAt: auditLog.createdAt,
      actorName: adminUsers.name,
      actorEmail: adminUsers.email,
    })
    .from(auditLog)
    .leftJoin(adminUsers, eq(adminUsers.id, auditLog.actorId))
    .orderBy(desc(auditLog.createdAt))
    .limit(limit);
}

/** Iki nesne arasindaki degisen alanlari cikarir — diff alanina yazmak icin. */
export function computeDiff<T extends Record<string, unknown>>(
  before: T | undefined,
  after: T
): Record<string, { from: unknown; to: unknown }> {
  const diff: Record<string, { from: unknown; to: unknown }> = {};
  for (const key of Object.keys(after)) {
    const from = before?.[key];
    const to = after[key];
    if (JSON.stringify(from) !== JSON.stringify(to)) {
      diff[key] = { from, to };
    }
  }
  return diff;
}
