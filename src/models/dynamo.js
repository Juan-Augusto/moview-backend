import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
const dynamoDb = new DynamoDB.DocumentClient();

export const getListsByUserEmail = async (email) => {
  const params = {
    TableName: "prod-movies-by-user",
    IndexName: "userEmail-index",
    KeyConditionExpression: "userEmail = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  const result = await dynamoDb.query(params).promise();
  return result.Items.shift();
};

export const createList = async (email, list) => {
  const params = {
    TableName: "prod-movies-by-user",
    Item: {
      id: uuidv4(),
      userEmail: email,
      allLists: list,
    },
  };
  const result = await dynamoDb.put(params).promise();
  return result;
};

export const deleteList = async (id) => {
  const params = {
    TableName: "prod-movies-by-user",
    Key: {
      id: id,
    },
  };
  const result = await dynamoDb.delete(params).promise();
  return result;
};

export const updateList = async (id, lists) => {
  const params = {
    TableName: "prod-movies-by-user",
    Key: {
      id: id,
    },
    UpdateExpression: "set allLists = :l",
    ExpressionAttributeValues: {
      ":l": lists,
    },
    ReturnValues: "UPDATED_NEW",
  };
  const result = await dynamoDb.update(params).promise();
  return result;
};
