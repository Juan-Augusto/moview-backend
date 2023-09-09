export const formatResponse = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
};
