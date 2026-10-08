import assert from 'node:assert/strict';
import test from 'node:test';
import { advanceProjectPreview, getProjectPreviewDistance } from './project-cloud-scroll';

test('normal page scrolling shows four projects, then stops advancing the slider', () => {
  let state = { offset: 0, progress: 0 };
  const indices = [0];
  for (const offset of [150, 300, 450, 900]) {
    state = advanceProjectPreview(offset, state.offset, state.progress, 7);
    indices.push(Math.round(state.progress * 6));
  }
  assert.deepEqual(indices, [0, 1, 2, 3, 3]);
  assert.equal(getProjectPreviewDistance(7), 450);
});

test('resuming page scroll preserves a project reached manually beyond the preview', () => {
  const state = advanceProjectPreview(450, 300, 5 / 6, 7);
  assert.equal(state.progress, 1);
  assert.equal(advanceProjectPreview(800, state.offset, state.progress, 7).progress, 1);
});

test('scrolling back reverses the preview and releases it at the first project', () => {
  const state = advanceProjectPreview(150, 450, 0.5, 7);
  assert.ok(Math.abs(state.progress - 1 / 6) < 0.00001);
  assert.ok(advanceProjectPreview(-200, state.offset, state.progress, 7).progress < 0.00001);
});

test('short selections add no empty preview steps and never exceed their last project', () => {
  assert.equal(getProjectPreviewDistance(0), 0);
  assert.equal(getProjectPreviewDistance(1), 0);
  assert.equal(getProjectPreviewDistance(2), 150);
  assert.deepEqual(advanceProjectPreview(900, 0, 0, 2), { offset: 150, progress: 1 });
});
