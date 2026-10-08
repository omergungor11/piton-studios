export const PROJECT_SCROLL_PX_PER_CARD = 150;
const PAGE_PREVIEW_PROJECTS = 4;

export function getProjectPreviewDistance(projectCount: number): number {
  return Math.max(0, Math.min(PAGE_PREVIEW_PROJECTS, projectCount) - 1) * PROJECT_SCROLL_PX_PER_CARD;
}

/** Sayfa akisi ilk dort projeyi gosterir; elle gezinilen konumu geri sarmaz. */
export function advanceProjectPreview(
  offset: number,
  previousOffset: number,
  progress: number,
  projectCount: number,
): { offset: number; progress: number } {
  const nextOffset = Math.min(getProjectPreviewDistance(projectCount), Math.max(0, offset));
  const scrollSteps = Math.max(1, projectCount - 1);
  const nextProgress = progress + (nextOffset - previousOffset) / (PROJECT_SCROLL_PX_PER_CARD * scrollSteps);
  return { offset: nextOffset, progress: Math.min(1, Math.max(0, nextProgress)) };
}
