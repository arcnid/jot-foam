// app/services/jotFormService.ts
import { get } from "http";
import Jotform from "jotform";

const client = new Jotform(process.env.JOTFORM_API_KEY as string);

//singleton pattern to ensure only one instance of the client is created

export const getClient = () => {
  return client;
};
