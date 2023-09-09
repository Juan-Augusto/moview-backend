import { deleteList, getListsByUserEmail } from "../../models/dynamo";
import { parseQueryStringParameters } from "../../shared/parsers";
import { formatResponse } from "../../shared/response";

export const handler = async (event, context) => {
  let email = parseQueryStringParameters(event).email;
  try {
    const { id } = await getListsByUserEmail(email);
    const userLists = await deleteList(id);
    return formatResponse(200, {
      message: "Success",
      data: userLists,
    });
  } catch (err) {
    console.log(err);
  }
};
