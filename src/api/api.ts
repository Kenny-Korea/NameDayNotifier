import { DataType } from "../types/model";
import { parseNameDayData } from "../util/util.data";
import { setLocalStorageItem } from "../util/util.localStorage";

export const getAllNameDayData = async (): Promise<Map<number, Map<number, DataType[]>> | null> => {
  try {
    const url = import.meta.env.VITE_API_GATEWAY_URL;
    const response = await fetch(url + "/nameday");
    const data = await response.json();
    if (data) {
      const parsedData = parseNameDayData(data);
      console.log(parsedData);
      setLocalStorageItem("nameDayData", parsedData);
      return parsedData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching name day data:", error);
    return null;
  }
};

export const postNotification = async () => {
  const url = import.meta.env.VITE_API_GATEWAY_URL;
  const response = await fetch(url + "/notification");
  return response.json();
};
