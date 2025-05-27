import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const base_url = process.env.BASE_URL;
export const port = process.env.PORT;
// export const HTTPStatusList = [
//     { code: 200, defaultmessage: "OK – The request has succeeded." },
//     { code: 201, defaultmessage: "Created – The request has been fulfilled and resulted in a new resource being created." },
//     { code: 204, defaultmessage: "No Content – The server successfully processed the request, but is not returning any content." },
//     { code: 400, defaultmessage: "Bad Request – The server could not understand the request due to invalid syntax." },
//     { code: 401, defaultmessage: "Unauthorized – The client must authenticate itself to get the requested response." },
//     { code: 403, defaultmessage: "Forbidden – The client does not have access rights to the content." },
//     { code: 404, defaultmessage: "Not Found – The server can not find the requested resource." },
//     { code: 409, defaultmessage: "Conflict – The request could not be completed due to a conflict with the current state of the resource." },
//     { code: 422, defaultmessage: "Unprocessable Entity – The request was well-formed but was unable to be followed due to semantic errors." },
//     { code: 500, defaultmessage: "Internal Server Error – The server has encountered a situation it does not know how to handle." },
//     { code: 502, defaultmessage: "Bad Gateway – The server received an invalid response from the upstream server." },
//     { code: 503, defaultmessage: "Service Unavailable – The server is not ready to handle the request." },
//     { code: 504, defaultmessage: "Gateway Timeout – The server did not receive a timely response from the upstream server." }
// ];
