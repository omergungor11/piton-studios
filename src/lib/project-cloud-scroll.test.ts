import assert from 'node:assert/strict';
import test from 'node:test';
import { advanceProjectPreview, getProjectPreviewDistance } from './project-cloud-scroll';

test('normal page scrolling shows four projects, then stops advancing the slider', () => {
  let state = { offset: 0, progress: 0 };
  const indices = [0];
  for (const offset of [75, 150, 225, 450]) {
    state = advanceProjectPreview(offset, state.offset, state.progress, 7);
    indices.push(Math.round(state.progress * 6));
  }
  assert.deepEqual(indices, [0, 1, 2, 3, 3]);
  assert.equal(getProjectPreviewDistance(7), 225);
});

test('resuming page scroll preserves a project reached manually beyond the preview', () => {
  const state = advanceProjectPreview(225, 150, 5 / 6, 7);
  assert.equal(state.progress, 1);
  assert.equal(advanceProjectPreview(400, state.offset, state.progress, 7).progress, 1);
});

test('scrolling back reverses the preview and releases it at the first project', () => {
  const state = advanceProjectPreview(75, 225, 0.5, 7);
  assert.ok(Math.abs(state.progress - 1 / 6) < 0.00001);
  assert.ok(advanceProjectPreview(-100, state.offset, state.progress, 7).progress < 0.00001);
});

test('short selections add no empty preview steps and never exceed their last project', () => {
  assert.equal(getProjectPreviewDistance(0), 0);
  assert.equal(getProjectPreviewDistance(1), 0);
  assert.equal(getProjectPreviewDistance(2), 75);
  assert.deepEqual(advanceProjectPreview(450, 0, 0, 2), { offset: 75, progress: 1 });
});
