import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  primaryKey,
  index,
  uniqueIndex,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

/**
 * Icerik ve ceviri AYRISTIRILMIS tutulur.
 *
 * Mevcut i18n borcunun kok nedeni bu ayrimin olmamasiydi: bir proje eklemek
 * data.ts + tr.json + en.json + ru.json olmak uzere dort dosyaya elle dokunmayi
 * gerektiriyordu ve eksik ceviriler sessizce birikiyordu.
 *
 * Burada her dil kendi satirinda ve `status` alaniyla izlenebilir.
 */

export const localeEnum = pgEnum('locale', ['tr', 'en', 'ru']);
export const projectTypeEnum = pgEnum('project_type', ['work', 'story']);
export const translationStatusEnum = pgEnum('translation_status', [
  'missing',
  'draft',
  'done',
]);
export const mediaKindEnum = pgEnum('media_kind', ['image', 'video']);
export const messageStatusEnum = pgEnum('message_status', [
  'new',
  'read',
  'replied',
  'archived',
]);
export const adminRoleEnum = pgEnum('admin_role', ['owner', 'editor']);

// ============================================================
// Medya
// ============================================================

export const mediaAssets = pgTable(
  'media_assets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    /** R2 nesne anahtari — bucket icindeki yol. */
    r2Key: text('r2_key').notNull(),
    publicUrl: text('public_url').notNull(),
    kind: mediaKindEnum('kind').notNull().default('image'),
    width: integer('width'),
    height: integer('height'),
    sizeBytes: integer('size_bytes'),
    /** Dil basina alt metin: { tr: "...", en: "...", ru: "..." } */
    altText: jsonb('alt_text').$type<Partial<Record<string, string>>>().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex('media_assets_r2_key_idx').on(table.r2Key)]
);

// ============================================================
// Projeler
// ============================================================

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    /** data.ts'teki `n` / `no` alani — listede gosterilen sira numarasi. */
    number: text('number'),
    type: projectTypeEnum('type').notNull().default('work'),
    year: text('year'),
    client: text('client'),
    /** Ceviriye tabi olmayan teknik alan; gorunen metin project_translations'ta. */
    kindKey: text('kind_key'),
    roleKey: text('role_key'),
    collaborator: text('collaborator'),
    externalUrl: text('external_url'),
    tags: text('tags').array().notNull().default([]),
    /** Eski `image` alani — dosya adi. Medya gocunden sonra coverMediaId kullanilacak. */
    imageFile: text('image_file'),
    coverMediaId: uuid('cover_media_id').references(() => mediaAssets.id, {
      onDelete: 'set null',
    }),
    /** { desktop: "...", mobile: "..." } */
    previews: jsonb('previews').$type<{ desktop?: string; mobile?: string }>(),
    sortOrder: integer('sort_order').notNull().default(0),
    isFeatured: boolean('is_featured').notNull().default(false),
    isPublished: boolean('is_published').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('projects_slug_idx').on(table.slug),
    index('projects_type_idx').on(table.type),
    index('projects_published_idx').on(table.isPublished),
    index('projects_sort_idx').on(table.sortOrder),
  ]
);

export const projectTranslations = pgTable(
  'project_translations',
  {
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    locale: localeEnum('locale').notNull(),
    title: text('title').notNull(),
    /** work icin `summary`, story icin `sub`. */
    summary: text('summary'),
    scope: text('scope'),
    role: text('role'),
    kind: text('kind'),
    body: text('body').array().notNull().default([]),
    status: translationStatusEnum('status').notNull().default('done'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.locale] }),
    index('project_translations_status_idx').on(table.status),
  ]
);

// ============================================================
// Hizmetler
// ============================================================

export const services = pgTable(
  'services',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    number: text('number'),
    category: text('category'),
    tools: text('tools').array().notNull().default([]),
    relatedServices: text('related_services').array().notNull().default([]),
    sortOrder: integer('sort_order').notNull().default(0),
    isPublished: boolean('is_published').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('services_slug_idx').on(table.slug),
    index('services_sort_idx').on(table.sortOrder),
  ]
);

export const serviceTranslations = pgTable(
  'service_translations',
  {
    serviceId: uuid('service_id')
      .notNull()
      .references(() => services.id, { onDelete: 'cascade' }),
    locale: localeEnum('locale').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    longDescription: text('long_description'),
    items: text('items').array().notNull().default([]),
    features: jsonb('features').$type<{ title: string; desc: string }[]>().default([]),
    process: jsonb('process')
      .$type<{ step: string; title: string; desc: string }[]>()
      .default([]),
    stats: jsonb('stats').$type<{ value: string; label: string }[]>().default([]),
    faq: jsonb('faq').$type<{ q: string; a: string }[]>().default([]),
    status: translationStatusEnum('status').notNull().default('done'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.serviceId, table.locale] }),
    index('service_translations_status_idx').on(table.status),
  ]
);

// ============================================================
// Iletisim mesajlari (Sprint 4'te kullanilacak)
// ============================================================

export const contactMessages = pgTable(
  'contact_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    service: text('service'),
    message: text('message').notNull(),
    locale: localeEnum('locale').notNull().default('tr'),
    status: messageStatusEnum('status').notNull().default('new'),
    /** Panelde tutulan dahili not — gonderene gorunmez. */
    internalNote: text('internal_note'),
    source: text('source'),
    referrer: text('referrer'),
    /** Ham IP saklanmaz; rate limit ve spam tespiti icin hash. */
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('contact_messages_status_idx').on(table.status),
    index('contact_messages_created_idx').on(table.createdAt),
  ]
);

// ============================================================
// Yonetim (Sprint 3'te kullanilacak)
// ============================================================

export const adminUsers = pgTable(
  'admin_users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    name: text('name'),
    role: adminRoleEnum('role').notNull().default('editor'),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex('admin_users_email_idx').on(table.email)]
);

export const auditLog = pgTable(
  'audit_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    actorId: uuid('actor_id').references(() => adminUsers.id, { onDelete: 'set null' }),
    action: text('action').notNull(),
    entity: text('entity').notNull(),
    entityId: text('entity_id'),
    diff: jsonb('diff'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('audit_log_entity_idx').on(table.entity, table.entityId),
    index('audit_log_created_idx').on(table.createdAt),
  ]
);

// ============================================================
// Iliskiler
// ============================================================

export const projectsRelations = relations(projects, ({ many, one }) => ({
  translations: many(projectTranslations),
  cover: one(mediaAssets, {
    fields: [projects.coverMediaId],
    references: [mediaAssets.id],
  }),
}));

export const projectTranslationsRelations = relations(projectTranslations, ({ one }) => ({
  project: one(projects, {
    fields: [projectTranslations.projectId],
    references: [projects.id],
  }),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  translations: many(serviceTranslations),
}));

export const serviceTranslationsRelations = relations(serviceTranslations, ({ one }) => ({
  service: one(services, {
    fields: [serviceTranslations.serviceId],
    references: [services.id],
  }),
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  actor: one(adminUsers, {
    fields: [auditLog.actorId],
    references: [adminUsers.id],
  }),
}));
