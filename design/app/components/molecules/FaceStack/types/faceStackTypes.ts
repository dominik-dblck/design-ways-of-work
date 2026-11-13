/**
 * - `FaceStackPerson` · one face of the stack: who, and the face the directory holds
 */
/** No face on file, the initials of the name stand in. */
export type FaceStackPerson = {
  readonly id: string;
  readonly name: string;
  readonly face: string | null;
};
