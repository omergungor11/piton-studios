import 'server-only';

import { asc, eq, and } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import {
  projects,
  projectTranslations,
  services,
  serviceTranslations,
} from '@/lib/db/schema';
import type {
  Locale,
  ProjectContent,
  ServiceContent,
  TranslationHealth,
} from './types';

/**
 * DB kaynagi. CONTENT_SOURCE=db oldugunda devreye girer.
 *
 * Bu fonksiyonlar yalnizca build sirasinda (generateStaticParams / generateMetadata /
 * sayfa uretimi) veya admin panelinde cagrilir. Ziyaretci istekleri statik HTML'e
 * dustugu icin DB'ye ulasmaz.
 */

export async function listProjects(locale: Locale): Promise<ProjectContent[]> {
  const db = getDb();

  const rows = await db
    .select({ project: projects, translation: projectTranslations })
    .from(projects)
    .innerJoin(
      projectTranslations,
      and(
        eq(projectTranslations.projectId, projects.id),
        eq(projectTranslations.locale, locale)
      )
    )
    .where(eq(projects.isPublished, true))
    .orderBy(asc(projects.sortOrder));

  return rows.map(({ project, translation }) => ({
    slug: project.slug,
    number: project.number ?? '',
    type: project.type,
    title: translation.title,
    summary: translation.summary ?? '',
    body: translation.body,
    scope: translation.scope ?? '',
    role: translation.role ?? project.roleKey ?? '',
    kind: translation.kind ?? project.kindKey ?? '',
    year: project.year ?? '',
    client: project.client ?? '',
    collaborator: project.collaborator ?? undefined,
    externalUrl: project.externalUrl ?? undefined,
    tags: project.tags,
    image: project.imageFile ?? '',
    previews: project.previews ?? undefined,
    isFeatured: project.isFeatured,
    sortOrder: project.sortOrder,
  }));
}

export async function getProject(
  locale: Locale,
  slug: string
): Promise<ProjectContent | undefined> {
  const all = await listProjects(locale);
  return all.find((p) => p.slug === slug);
}

export async function listServices(locale: Locale): Promise<ServiceContent[]> {
  const db = getDb();

  const rows = await db
    .select({ service: services, translation: serviceTranslations })
    .from(services)
    .innerJoin(
      serviceTranslations,
      and(
        eq(serviceTranslations.serviceId, services.id),
        eq(serviceTranslations.locale, locale)
      )
    )
    .where(eq(services.isPublished, true))
    .orderBy(asc(services.sortOrder));

  return rows.map(({ service, translation }) => ({
    slug: service.slug,
    number: service.number ?? '',
    category: service.category ?? '',
    title: translation.title,
    description: translation.description ?? '',
    longDescription: translation.longDescription ?? '',
    items: translation.items,
    features: translation.features ?? [],
    process: translation.process ?? [],
    stats: translation.stats ?? [],
    faq: translation.faq ?? [],
    tools: service.tools,
    relatedServices: service.relatedServices,
    sortOrder: service.sortOrder,
  }));
}

export async function getService(
  locale: Locale,
  slug: string
): Promise<ServiceContent | undefined> {
  const all = await listServices(locale);
  return all.find((s) => s.slug === slug);
}

export async function translationHealth(): Promise<TranslationHealth[]> {
  const db = getDb();

  const [projectRows, serviceRows] = await Promise.all([
    db
      .select({
        locale: projectTranslations.locale,
        status: projectTranslations.status,
        slug: projects.slug,
      })
      .from(projectTranslations)
      .innerJoin(projects, eq(projects.id, projectTranslations.projectId)),
    db
      .select({
        locale: serviceTranslations.locale,
        status: serviceTranslations.status,
        slug: services.slug,
      })
      .from(serviceTranslations)
      .innerJoin(services, eq(services.id, serviceTranslations.serviceId)),
  ]);

  return [
    ...projectRows.map((r) => ({ ...r, entity: 'project' as const })),
    ...serviceRows.map((r) => ({ ...r, entity: 'service' as const })),
  ];
}
