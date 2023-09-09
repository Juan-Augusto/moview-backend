import { getListsByUserEmail, updateList } from "../../models/dynamo";
import { parseBody, parseQueryStringParameters } from "../../shared/parsers";
import { formatResponse } from "../../shared/response";

export const handler = async (event, context) => {
  let { email } = parseQueryStringParameters(event);
  let { lists } = parseBody(event);
  try {
    const { id } = await getListsByUserEmail(email);
    await updateList(id, lists);
    return formatResponse(200, {
      message: "Success",
      data: email + " updated",
    });
  } catch (err) {
    console.log(err);
  }
};
