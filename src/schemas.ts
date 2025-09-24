import { email, z } from "zod";

/**
 * Schema for person [name, age] transforms to object { name, age }
 */
export const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                                .transform( tup => ({name: tup[0], age: tup[1]}))

export type Person = z.infer<typeof PersonRowSchema>;

/**
 * Schema for student [name, year, email] transforms to object { name, year, email }
 */
export const StudentRowSchema = z.tuple([z.string(), z.coerce.number(), z.email()])
                                 .transform( tup => ({name: tup[0], year: tup[1], email: tup[2]}))

export type Student = z.infer<typeof StudentRowSchema>;
