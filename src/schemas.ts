import { email, z } from "zod";

export const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                                .transform( tup => ({name: tup[0], age: tup[1]}))

export const StudentRowSchema = z.tuple([z.string(), z.coerce.number(), z.email()])
                                 .transform( tup => ({name: tup[0], year: tup[1], email: tup[2]}))
