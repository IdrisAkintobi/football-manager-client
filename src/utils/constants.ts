import axios, { Method } from "axios";

const baseUrl = "http://localhost:3001/api";
export const URL = {
  GET_TEAM: "/user/view/team",
  SIGN_IN: "/user/login",
  SELL: "/transfer/post",
  MARKET: "/transfer/list",
  BUY: "/transfer/buy",
  DEL: "/transfer/delete",
};

axios.defaults.baseURL = baseUrl;

export const requestFunc = async <T>(
  method: Method,
  url: string,
  token: string,
  values?: T
) => {
  try {
    const { data } = await axios.request({
      method,
      url,
      data: { ...values },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const { status, data } = error.response;
    return { status, error: data };
  }
};
