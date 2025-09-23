import { parseCSV } from "./basic-parser";
import { email, z } from "zod";
import { PersonRowSchema } from "./schemas";
import { StudentRowSchema } from "./schemas";

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name
const DATA_FILE2 = "./data/students.csv"; // second data example


async function main() {

  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, undefined)

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)

  // Example using Zod schema
  const personResults = await parseCSV(DATA_FILE, PersonRowSchema)

  for(const record of personResults)
    console.log(record)

  // Another schema example
  const studentResults = await parseCSV(DATA_FILE2, StudentRowSchema)

  for(const record of studentResults)
    console.log(record)
}

main();