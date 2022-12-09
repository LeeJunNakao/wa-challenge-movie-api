import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Movie extends BaseModel {
  public static table = "movie";

  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "external_id" })
  public externalId: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public director: string;

  @column()
  public producer: string;

  @column({ columnName: "movie_banner" })
  public banner: string;

  @column({ columnName: "release_date" })
  public releaseDate: number;

  @column({ columnName: "rt_score" })
  public score: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
