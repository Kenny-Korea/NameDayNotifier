import dayjs from "dayjs";

export class DateUtil {
  constructor() {
    this.date = dayjs();
  }

  public date: dayjs.Dayjs;

  public getMonth() {
    const dayjsMonth = dayjs().month();
    return dayjsMonth + 1;
  }
}

export const util = new DateUtil();
