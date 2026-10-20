import { describe, expect, test } from "bun:test";
import { PRODUCTS } from "./products";

describe("Restored perfume catalog", () => {
  test("contains only the four requested perfumes", () => {
    expect(PRODUCTS.map((product) => product.name)).toEqual([
      "Sweet Dreams", "Honey Touch", "Dziria", "Afro Passion",
    ]);
  });
  test("preserves Sweet Dreams at 2500 DA", () => {
    expect(PRODUCTS.find((product) => product.id === "sweet-dreams")?.price).toBe(2500);
  });
  test("preserves Honey Touch at 2800 DA", () => {
    expect(PRODUCTS.find((product) => product.id === "honey-touch")?.price).toBe(2800);
  });
});
