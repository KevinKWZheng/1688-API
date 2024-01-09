import { BaseAPI } from "1688-api";

export class DropshippingSolution extends BaseAPI {
    protected readonly getDistributiveProductEndpoint = `param2/1/com.alibaba.fenxiao/alibaba.fenxiao.productInfo.get/`;
    protected readonly imageSearchEndpoint = `param2/1/com.alibaba.product/alibaba.public.image.similar.offer.search/`;

    constructor(appKey: number, secretKey: string, access_token: string) {
        super(appKey, secretKey, access_token);
    }

    public async getProductDetail(offerId: number) {
        const response = await this.sendRequest(this.getDistributiveProductEndpoint, { offerId: offerId }, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        return response.body as unknown as {
            success: boolean;
            errorCode: string;
            errorMsg: string;
            productInfo: ProductInfo
        };
    }

    public async imageSearch(param: {
        imgBase64?: string;
        imgUrl?: string;
        imageKeywords?: string;
        filter?: string[];
    }) {
        const response = await this.sendRequest(this.getDistributiveProductEndpoint, param, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        return response.body as unknown as {
            success: boolean;
            code: string;
            message: string;
            imageSearchUrl: string;
            imageSearchResult: {
                offerId: number;
                detailUrl: string;
                subject: string;
                image: string;
                price: string;
            }[];
        };
    }
}