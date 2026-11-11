/**
 * - `FROZEN_NOTEBOOKS` · each closed epic's notebook, the sha256 of its text as it closed
 * - `A_NOTEBOOK` · where an epic's notebook stands: markdown once closed, data while open
 */
const FROZEN_NOTEBOOKS: Readonly<Record<string, string>> = {
  E03: '67837185845fd626ae787649edc754562b7e7a08fb3af4ebdad0ea41aa5c0b07',
  E04: '138d316bca50574d3ac2fc08b6313c6d00ecfd2e99005f77bb6bb021578af47a',
  E06: '06a654a7aa3477157b9690deda496c9980555c2da248ea483df49f7c8cc67999',
  E09: '3dab01272763f86a1a4c5bca1c5f1ca8310d83b70e43eb5da643f82103a245db',
  E18: 'f1523f11f2dcc0d6387ea90d8ed57ec9302259561e1cd8d0e435d80157993228',
  E19: 'b69cac667ce3dbe369769187d35d3afcb4135d8643c804c8c99adaa11e9707ff',
};

const A_NOTEBOOK = /^roadmaps\/(E\d{2})\/(?:feature-\1\.md|\1Notes\.ts)$/;

export { A_NOTEBOOK, FROZEN_NOTEBOOKS };
