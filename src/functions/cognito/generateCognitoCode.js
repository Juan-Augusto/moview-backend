import Axios from "axios";
import jwt from "jsonwebtoken";
import { parseBody } from "../../shared/parsers";
import { formatResponse } from "../../shared/response";
export const handler = async (event, context) => {
  console.log("EVENT: ", event);
  const { code } = event;
  console.log("CODE: ", code);
  const clientId = process.env.COGNITO_CLIENT_ID;
  const redirectUri = process.env.COGNITO_REDIRECT_URI;
  const cognitoDomain = process.env.COGNITO_DOMAIN;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;
  const tokenEndpoint = `${cognitoDomain}/oauth2/token`;

  const requestBody = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code: event.code,
  });
  try {
    const response = await Axios.post(tokenEndpoint, requestBody.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const jwtToken = response.data.id_token;
    const decodedToken = jwt.decode(jwtToken);

    return formatResponse(200, {
      message: "Success",
      body: decodedToken,
      jwt: jwtToken,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to exchange authorization code for JWT token");
  }
};
