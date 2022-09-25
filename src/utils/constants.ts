import axios from "axios";

const baseUrl = "http://localhost:3001/api";
export const URL = {
  GET_TEAM: `${baseUrl}/user/view/team`,
  SIGN_IN: `${baseUrl}/user/login`,
  SELL: `${baseUrl}/transfer/post`,
  MARKET: `${baseUrl}/transfer/list`,
  BUY: `${baseUrl}/transfer/buy`,
  DEL: `${baseUrl}/transfer/delete`,
};

export const requestFunc = async <T>(
  method: "get" | "post" | "delete",
  url: string,
  token: string,
  values?: T
) => {
  try {
    let response: any;
    switch (method) {
      case "get":
        response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        break;
      case "post":
        response = await axios.post(
          url,
          { ...values },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        break;
      case "delete":
        response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        break;
    }
    const { data } = response;
    return { data };
  } catch (error: any) {
    const { status, data } = error.response;
    return { status, error: data };
  }
};
