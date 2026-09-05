'use client';

import PageShell from '@/components/page-shell';
import ProjectCloudSection from '@/components/projects-v2/project-cloud-section';
import type { ProjectCloudItem } from '@/components/projects-v2/project-cloud-canvas';
import styles from './projects-v2.module.css';

interface ProjectsV2ClientProps {
  eyebrow: string;
  projects: ProjectCloudItem[];
}

/** Yerel prototip rotasi: anasayfadaki proje bulutunun tam sayfa hali. */
export default function ProjectsV2Client({ eyebrow, projects }: ProjectsV2ClientProps) {
  return (
    <PageShell immersive>
      <div className={styles.breakout}>
        <ProjectCloudSection projects={projects} variant="page" titleAs="h1" eyebrow={eyebrow} />
      </div>
    </PageShell>
  );
}
