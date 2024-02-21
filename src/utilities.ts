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

export async function getToken(appKey: number, redirectUrl: string) {
    const authResponse = await fetch(`https://auth.1688.com/oauth/authorize?client_id=${appKey}&site=1688&redirect_uri=${redirectUrl}`,
        { method: `GET`, });
    if (!authResponse.ok) {
        return { status: false };
    }
}