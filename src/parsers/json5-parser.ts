/**
 * Mimics the behavior of `json-source-map`'s `parseJSONDocument` function using codemirror EditorState... for json5
 */

// import { json5 as json5mode } from "codemirror-json5";
// import json5 from "json5";
import { EditorState } from "@codemirror/state";
// import { parse } from "best-effort-json-parser";
// import { getJsonPointers } from "../utils/json-pointers";
// import { MODES } from "../constants";

/**
 * Return parsed data and json5 pointers for a given codemirror EditorState
 * @group Utilities
 */
export function parseJSON5DocumentState(state: EditorState) {
  // let data = null;
  // try {
  //   data = json5.parse(state.doc.toString());
  //   // return pointers regardless of whether JSON.parse succeeds
  // } catch {
  //   try {
  //     data = parse(state.doc.toString());
  //   } catch {}
  // }
  // const pointers = getJsonPointers(state, MODES.JSON5);
  // return { data, pointers };
  return {} as any;
}

/**
 * Mimics the behavior of `json-source-map`'s `parseJSONDocument` function, for json5!
 * @group Utilities
 */
export function parseJSON5Document(jsonString: string) {
  const state = EditorState.create({
    doc: jsonString,
    // extensions: [json5mode()],
  });
  return parseJSON5DocumentState(state);
}
