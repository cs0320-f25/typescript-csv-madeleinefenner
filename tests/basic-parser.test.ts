import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { PersonRowSchema } from "../src/schemas";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PEOPLE_CSV_PATH_EMPTY_ROW = path.join(__dirname, "../data/people_empty_row.csv");
const PEOPLE_CSV_PATH_EXTRA_COLUMN = path.join(__dirname, "../data/people_extra_column.csv");
const PEOPLE_CSV_PATH_COMMA = path.join(__dirname, "../data/people_comma.csv");
const PEOPLE_CSV_PATH_WHITESPACE = path.join(__dirname, "../data/people_whitespace.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV ignores empty rows", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH_EMPTY_ROW, undefined)
  // checks if empty row ["",""] is ignored
  expect(results[3]).toEqual(["Charlie", "25"]);
});

test("parseCSV yields arrays of same length", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH_EXTRA_COLUMN, undefined)
  // checks if row with extra column ["Alice", "23", "23"] is ignored
  expect(results[1]).toEqual(["Bob", "30"]);
});

test("parseCSV ignores commas within double quotes", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH_COMMA, undefined)
   expect(results[3]).toEqual(["\"Hi, I'm Charlie\"","25"]);
});

test("parseCSV handles whitespace", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH_WHITESPACE, undefined)
    expect(results[0]).toEqual(["name", "age"]);
    expect(results[1]).toEqual(["Alice", "23"]);
    expect(results[2]).toEqual(["Bob Brown", "thirty"]);
    expect(results[3]).toEqual(["Charlie", "25"]);
    expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV validates with Zod schemas", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
    expect(results[0]).toEqual({name: "Alice", age: 23});
    expect(results[1]).toEqual({name: "Charlie", age: 25});
    expect(results[2]).toEqual({name: "Nim", age: 22});
});
