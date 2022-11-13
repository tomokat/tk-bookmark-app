import { Types } from "mongoose";

export class CreateBookmarkDto {
  readonly title: String;
  readonly url: String;
  readonly labels: Types.Array<number>;
}
