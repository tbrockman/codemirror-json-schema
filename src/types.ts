import { MODES } from "./constants";

export type RequiredPick<T, F extends keyof T> = Omit<T, F> &
  Required<Pick<T, F>>;

export type JSONPartialPointerData = {
  keyFrom: number;
  keyTo: number;
};

export type JSONPointerData = {
  keyFrom?: number;
  keyTo?: number;
  valueFrom: number;
  valueTo: number;
};

/**
 * If side is -1, this will move into nodes that end at the position. If 1, it'll move into nodes that start at the position. With 0, it'll only enter nodes that cover the position from both sides.
 *
 * See [`Tree.resolve`](https://lezer.codemirror.net/docs/ref/#common.Tree.resolve) for more information.
 */
export type Side = -1 | 1 | 0 | undefined;

export type JSONPointersMap = Map<
  string,
  JSONPointerData | JSONPartialPointerData
>;
export type JSONMode = (typeof MODES)[keyof typeof MODES];
