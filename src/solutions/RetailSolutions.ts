import { BaseAPI } from "./BaseAPI";

export class RetailSourcingSolution extends BaseAPI {

    protected readonly genDKeyEndpoint = `param2/1/com.alibaba.fenxiao/dkey.get/`;
    protected readonly getCategoryEndpoint = `param2/1/com.alibaba.product/alibaba.category.get/`;
    protected readonly accountInfoEndpoint = `param2/1/com.alibaba.account/alibaba.account.basic/`;
    protected readonly followProductEndpoint = `param2/1/com.alibaba.product/alibaba.product.follow/`;
    protected readonly getProductFilterEndpoint = `param2/1/com.alibaba.fenxiao/jxhy.productFilter.get/`;
    protected readonly productListEndpoint = `param2/1/com.alibaba.fenxiao/alibaba.pifatuan.product.list/`;
    protected readonly getAddressCodeEndpoint = `param2/1/com.alibaba.trade/alibaba.trade.addresscode.get/`;
    protected readonly getProductPageListEndpoint = `param2/1/com.alibaba.fenxiao/jxhy.product.getPageList/`;
    protected readonly matchProductEndpoint = `param2/1/com.alibaba.fenxiao/alibaba.pifatuan.product.match.get/`;
    protected readonly searchCategoryEndpoint = `param2/1/com.alibaba.product/alibaba.category.searchByKeyword/`;
    protected readonly unfollowProductEndpoint = `param2/1/com.alibaba.product/alibaba.product.unfollow.crossborder/`;
    protected readonly productRulesEndpoint = `param2/1/com.alibaba.fenxiao/alibaba.pifatuan.product.search.tag.list/`;
    protected readonly batchProductDetailEndpointV1 = `param2/1/com.alibaba.fenxiao/alibaba.pifatuan.product.detail.list/`;
    protected readonly batchProductDetailEndpointV2 = `param2/2/com.alibaba.fenxiao/alibaba.pifatuan.product.detail.list/`;
    protected readonly getChosenStockpileListEndpoint = `param2/1/com.alibaba.fenxiao/alibaba.fenxiao.chosen.offerlist.get/`;
    protected readonly clearChoseStockpileListEndpoint = `param2/1/com.alibaba.fenxiao:alibaba.fenxiao.chosen.offerlist.removeall/`;

    constructor(appKey: number, secretKey: string, access_token: string) {
        super(appKey, secretKey, access_token);
    }

    public async getProductRules() {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.productRulesEndpoint}`, {}, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }

    public async getProductList(params?: {
        ruleId?: number,
        categoryId?: number,
        keywords?: string,
        topOfferIds?: number[],
        pageNo?: number,
        pageSize?: number,
        filterFreePostage?: boolean,
        filterYjdf?: boolean,
        filter7dNoReasonReturn?: boolean,
        filter48hShip?: boolean,
        filterOrder48HPickUpRate?: string,
        filterOrder24HPickUpRate?: string,
        filterDyEncryptOrder?: boolean,
        filterKsEncryptOrder?: boolean,
        filterCommission?: boolean,
        sortByField?: `ww30DResponseRate` | `newTowerDisputeScore` | `order30DTurnoverRate`,
        sortByType?: `desc` | `asc`,
    }) {
        if (!params) params = {};
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.productListEndpoint}`, params as RequestParams, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }

    public async getAccountInfo() {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.accountInfoEndpoint}`, {}, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }

    public async getBatchProductDetail(offerIds: number[], version?: 1 | 2) {
        let endpoint = ``;
        if (version && (version == 1 || version == 2)) {
            endpoint = (version == 1) ? this.batchProductDetailEndpointV1 : this.batchProductDetailEndpointV2;
        } else {
            if (!version) endpoint = this.batchProductDetailEndpointV2;
            else throw new Error(`Invalid param value: ${version}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await this.sendRequest(`http://${this.BaseUrl}/${endpoint}`, { offerIds: offerIds }, `GET`) as any;
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body.result as APIResponse;
    }

    public async getChosenStockpileList(uniqueKey: string) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.getChosenStockpileListEndpoint}`,
            { uniqueKey: uniqueKey }, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }

    public async clearChosenStockpileList(uniqueKey: string) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.clearChoseStockpileListEndpoint}`,
            { uniqueKey: uniqueKey }, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }

    public async genDKey(params: { offerIds: number[], entranceCode?: string }) {
        if (!params.entranceCode) params.entranceCode = `1688`;
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.genDKeyEndpoint}`, params, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown as {
                errorMsg: string,
                resultCode: string,
                isSuccess: boolean,
                data: string
            };
    }

    public async followProduct(productId: number) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.followProductEndpoint}`,
            { productId: productId }, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown as {
                code: number,
                message: string,
            };
    }

    public async unfollowProduct(productId: number) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.unfollowProductEndpoint}`,
            { productId: productId }, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown as {
                code: number,
                message: string,
            };
    }

    public async searchCategory(keyword: string) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.searchCategoryEndpoint}`, { keyword: keyword }, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown as {
                success: string,
                errorCode: string,
                errorMsg: string,
                products: unknown[]
            };
    }

    public async getCategory(categoryId: string) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.getCategoryEndpoint}`,
            { categoryID: categoryId }, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown as {
                success: string,
                errorCode: string,
                errorMsg: string,
                categoryInfo: unknown[]
            };
    }

    public async matchProduct(params: {
        outPersonId?: string,
        outOfferId?: string
    }) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.matchProductEndpoint}`,
            params, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body;
    }

    public async getAddressCode(params: {
        areaCode: string,
        webSite: `alibaba` | `1688`
    }) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.getAddressCodeEndpoint}`,
            params, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown as {
                errorCode: string,
                errorMessage: string,
                result: unknown
            };
    }

    public async getProductPageList(params?: {
        pageNum?: number,
        pageSize?: number,
        keyword?: string,
        ruleIds?: string[],
        categoryId?: number,
        priceStart?: string,
        priceEnd?: string,
        filters?: string[]
    }) {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.getProductPageListEndpoint}`,
            params as RequestParams, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown;
    }

    public async getProductFilter() {
        const response = await this.sendRequest(`http://${this.BaseUrl}/${this.getProductFilterEndpoint}`, {}, `GET`);
        if (!response.status)
            return {
                statusText: response.statusText,
                body: response.body,
            } as APIErrorMsg;
        else
            return response.body as unknown;
    }
}