/**
 * - `Written`, `Screen` · a wireframe as its row writes it, and as it is numbered
 */
interface Written {
  readonly key: string;
  readonly variantOf?: string;
  readonly tone: string;
  readonly track: string;
  readonly kind: string;
  readonly shows?: string;
  readonly preview?: string;
  readonly nav: string;
  readonly title: string;
  readonly sub: string;
  readonly see?: readonly string[];
}

interface Screen extends Written {
  readonly num: string;
  readonly id: string;
  readonly see: readonly string[];
}

export type { Screen, Written };
