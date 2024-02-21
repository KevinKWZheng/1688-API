import axios from "axios";
import { parseUrl, sign } from "../utilities";
const fetch = axios.create();

export class BaseAPI {
    protected readonly appKey: number;
    protected readonly secretKey: string;
    protected readonly access_token: string;
    protected readonly BaseUrl = `gw.open.1688.com/openapi`;

    constructor(appKey: number, secretKey: string, access_token: string) {
        this.appKey = appKey;
        this.secretKey = secretKey;
        this.access_token = access_token;
    }

    public getAppInfo() {
        return {
            appKey: this.appKey,
            secretKey: this.secretKey
        } as AppInfo;
    }

    public getAccessToken() {
        return this.access_token;
    }

    public async sendRequest(url: string, param: RequestParams,
        method: `POST` | `GET` = `POST`, requiresAuth: boolean = true, containsFile: boolean = false) {
        if (url.indexOf(`openapi`) == url.length - `openapi`.length) throw new Error(`Incorrect URL`);
        let urlPath = url.substring(url.indexOf(`openapi`) + `openapi`.length + 1);

        if (!urlPath.includes(this.appKey.toString())) {
            if (urlPath.endsWith(`/`)) {
                urlPath += this.appKey;
                url += this.appKey;
            }
            else {
                urlPath += `/${this.appKey}`;
                url += `/${this.appKey}`;
            }
        } else {
            if (urlPath.endsWith(`/`)) {
                url = url.substring(0, url.length - 1);
                urlPath = urlPath.substring(0, url.length - 1);
            }
        }

        if (!param.access_token && requiresAuth) param.access_token = this.access_token;
        for (const i in param) {
            if (i && !param[i]) {
                delete param[i];
            }
            if (typeof (param[i]) === `object`) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const obj = param[i] as any;
                for (const j in obj) {
                    if (!obj[j] && obj[j] != 0 && obj[j] != false && obj[j] != ``)
                        delete obj[j];
                }
            }
        }
        if (!param._aop_signature) {
            const signature = sign(urlPath, param, this.secretKey);
            param._aop_signature = signature;
        }
        const URL = parseUrl(url, param);
        const contentType = (!containsFile) ? `application/x-www-form-urlencoded; charset=UTF-8` : `multipart/form-data`;

        const response = await fetch(URL, {
            method: method,
            headers: {
                'Cache-Control': `no-cache`,
                'Connection': `Keep-Alive`,
                'User-Agent': `Ocean-SDK-Client`,
                'Content-Type': contentType
            }
        });
        return {
            status: response.status == 200,
            statusText: `${response.status} ${response.statusText}`,
            body: response.data
        } as BaseApiResponse;
    }

    public async distributiveImageSearch(params: ImageSearchParam) {
        const response = await this.sendRequest(`https://${this.BaseUrl}/param2/1/com.alibaba.linkplus/alibaba.cps.similar.offer.search/`,
            params, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }

    public async overseasImageSearch(params: ImageSearchParam) {
        const response = await this.sendRequest(`https://${this.BaseUrl}/param2/1/com.alibaba.linkplus/alibaba.cross.similar.offer.search`,
            params, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }
}