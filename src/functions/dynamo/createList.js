import { createList } from "../../models/dynamo";
import { parseBody } from "../../shared/parsers";
import { formatResponse } from "../../shared/response";

export const handler = async (event, context) => {
  let { email, list } = parseBody(event);
  try {
    const userLists = await createList(email, list);
    return formatResponse(200, {
      message: "Success",
      lists: userLists,
    });
  } catch (err) {
    console.log(err);
  }
};
