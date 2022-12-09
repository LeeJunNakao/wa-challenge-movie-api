import { test, Group } from "@japa/runner";
import Database from "@ioc:Adonis/Lucid/Database";

type Tests = (group: Group) => void;

export const describe = (description: string, tests: Tests) =>
  test.group(description, (group) => {
    group.each.setup(async () => {
      await Database.beginGlobalTransaction();
      return () => Database.rollbackGlobalTransaction();
    });

    tests(group);
  });
