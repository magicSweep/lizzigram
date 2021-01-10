/**
 * @jest-environment node
 */
import { getAll } from ".";

describe("Firestore", () => {
  test("getAll", async () => {
    const snapshot = await getAll();

    expect(snapshot.size).toEqual(3);
  });
});
