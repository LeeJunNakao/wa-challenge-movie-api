import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "movie";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("external_id").unique();
      table.string("title");
      table.text("description");
      table.string("director");
      table.string("producer");
      table.string("banner");
      table.string("movie_banner");
      table.integer("release_date");
      table.integer("rt_score");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
