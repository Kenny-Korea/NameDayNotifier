import { DataType } from "../../types/model";

export const mapToObject = (map: Map<number, Map<number, DataType[]>>) => {
  const obj: { [key: number]: { [key: number]: DataType[] } } = {};

  map.forEach((value, key) => {
    obj[key] = {};
    value.forEach((innerValue, innerKey) => {
      obj[key][innerKey] = innerValue;
    });
  });

  return obj;
};

// 객체를 Map으로 변환하는 함수
export const objectToMap = (obj: { [key: number]: { [key: number]: DataType[] } }) => {
  const map = new Map<number, Map<number, DataType[]>>();

  Object.entries(obj).forEach(([key, value]) => {
    const innerMap = new Map<number, DataType[]>();
    Object.entries(value).forEach(([innerKey, innerValue]) => {
      innerMap.set(Number(innerKey), innerValue);
    });
    map.set(Number(key), innerMap);
  });

  return map;
};

export const getLocalStorageItems = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    const objData = JSON.parse(value);
    return objectToMap(objData);
  }
  return null;
};

export const setLocalStorageItem = (key: string, value: Map<number, Map<number, DataType[]>>) => {
  try {
    const objData = mapToObject(value);
    const stringData = JSON.stringify(objData);
    localStorage.setItem(key, stringData);
    return "ok";
  } catch (error) {
    console.error(error);
    return error;
  }
};
