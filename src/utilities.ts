import { createHmac } from "crypto";

export function sign(urlPath: string, params: object, secretKey: string) {
    let str = urlPath;
    const list: string[] = [];
    const hmac = createHmac(`sha1`, secretKey);
    for (const i in params) {
        if (typeof (params[i]) === `string`)
            list.push(i + params[i]);
        else
            list.push(i + JSON.stringify(params[i]));
    }
    list.sort();
    str += list.join(``);
    hmac.update(str);
    return hmac.digest(`hex`).toUpperCase();
}

export function parseUrl(baseUrl: string, param: RequestParams) {
    let str = ``;
    for (const i in param) {
        if (i && (!param[i])) continue;
        if (typeof (param[i]) === `string`) {
            str += `${i}=${encodeURIComponent(param[i] as string)}&`;
        }
        else {
            str += `${i}=${encodeURIComponent(JSON.stringify(param[i]))}&`;
        }
    }
    if (str.endsWith(`&`)) str = str.substring(0, str.length - 1);
    return (`${baseUrl}?${str}`);
}

export function encodeProperties(params: object) {
    for (const i in params) {
        if (typeof (params[i]) === `string`)
            params[i] = encodeURI(params[i] as string);
        if (typeof (params[i]) === `object`)
            params[i] = encodeProperties(params[i]);
    }
    return params;
}

export async function sendRequest(url: string, param: RequestParams, appInfo: AppInfo,
    method: `POST` | `GET` = `POST`, requiresAuth: boolean = true, containsFile: boolean = false) {
    if (url.indexOf(`openapi`) == url.length - `openapi`.length) throw new Error(`Incorrect URL`);
    let urlPath = url.substring(url.indexOf(`openapi`) + `openapi`.length + 1);

    if (!urlPath.includes(appInfo.appKey.toString())) {
        if (urlPath.endsWith(`/`)) {
            urlPath += appInfo.appKey;
            url += appInfo.appKey;
        }
        else {
            urlPath += `/${appInfo.appKey}`;
            url += `/${appInfo.appKey}`;
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
    const signature = sign(urlPath, param, appInfo.secretKey);
    param._aop_signature = signature;
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
        status: response.ok,
        statusText: `${response.status} ${response.statusText}`,
        body: (await response.json())
    } as BaseApiResponse;
}