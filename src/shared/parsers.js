export const parseBody = (event) => {
  if (event.body) {
    return JSON.parse(event.body);
  }
  return {};
};

export const parsePathParameters = (event) => {
  if (event.pathParameters) {
    return event.pathParameters;
  }
  return {};
};

export const parseQueryStringParameters = (event) => {
  if (event.queryStringParameters) {
    return event.queryStringParameters;
  }
  return {};
};
