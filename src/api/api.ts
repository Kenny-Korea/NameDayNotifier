import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Data } from "../types/model";

const client = new DynamoDBClient({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "NameDayNotificator";

// 전체 데이터 가져오기
export const getAllNameDayData = async (): Promise<Data[]> => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const response = await docClient.send(command);
    console.log("FETCHED DATA");
    return response.Items as Data[];
  } catch (error) {
    console.error("DynamoDB 데이터 조회 오류:", error);
    throw new Error("데이터 조회 중 오류가 발생했습니다.");
  }
};

// 특정 카테고리의 데이터만 가져오기
export const getNameDayDataByCategory = async (catName: string) => {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "catName = :catName",
      ExpressionAttributeValues: {
        ":catName": catName,
      },
      IndexName: "catName-index", // 보조 인덱스가 있는 경우
    });

    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    console.error("DynamoDB 데이터 조회 오류:", error);
    throw new Error("데이터 조회 중 오류가 발생했습니다.");
  }
};

// 특정 날짜의 데이터 가져오기
export const getNameDayDataByDate = async (date: string) => {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "date = :date",
      ExpressionAttributeValues: {
        ":date": date,
      },
      IndexName: "date-index", // 보조 인덱스가 있는 경우
    });

    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    console.error("DynamoDB 데이터 조회 오류:", error);
    throw new Error("데이터 조회 중 오류가 발생했습니다.");
  }
};
