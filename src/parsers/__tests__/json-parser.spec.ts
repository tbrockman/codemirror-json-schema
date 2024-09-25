import { it, describe, expect } from "vitest";
import { parseJSONDocument } from "../json-parser";

describe("parseJSONDocument", () => {
  it("should return a map of all pointers for a json4 document", () => {
    const doc = parseJSONDocument(`{"object": { "foo": true }, "bar": 123}`);
    expect(doc.data).toEqual({ object: { foo: true }, bar: 123 });
    expect(Array.from(doc.pointers.keys())).toEqual([
      "",
      "/object",
      "/object/foo",
      "/bar",
    ]);
  });
});
