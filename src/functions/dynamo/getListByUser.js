import { getListsByUserEmail } from "../../models/dynamo";
import { parseQueryStringParameters } from "../../shared/parsers";
import { formatResponse } from "../../shared/response";

export const handler = async (event, context) => {
  let email = parseQueryStringParameters(event).email;
  try {
    const userLists = await getListsByUserEmail(email);
    return formatResponse(200, {
      message: "Success",
      data: userLists,
    });
  } catch (err) {
    console.log(err);
  }
};
