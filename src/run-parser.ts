import { parseCSV } from "./basic-parser";
import { email, z } from "zod";

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name
const DATA_FILE2 = "./data/students.csv"; // second example


async function main() {

  // Define the schema
  const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                          .transform( tup => ({name: tup[0], age: tup[1]}))

  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, PersonRowSchema)

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)

  // Another schema example
  const StudentRowSchema = z.tuple([z.string(), z.coerce.number(), z.email()])
                          .transform( tup => ({name: tup[0], year: tup[1], email: tup[2]}))

  const studentResults = await parseCSV(DATA_FILE2, StudentRowSchema)

  for(const record of studentResults)
    console.log(record)
}

main();