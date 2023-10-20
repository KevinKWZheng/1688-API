// eslint-disable-next-line quotes
declare module "1688-api" {
    export class API1688 {
        constructor(appKey: number, secretKey: string, access_token: string);

        /**
         * @returns {AppInfo} {appKey:string, secretKey:string}
         */
        public getAppInfo(): AppInfo;

        public getAccessToken(): string;

        /**
         * Sends a custom request to API endpoint
         * @param url Full URL containing protocal (http/https) and endpoint
         * @param param 
         * @param method 
         * @param containsFile 
         */
        public sendRequest(url: string, param: RequestParams, method: `POST` | `GET`, containsFile: boolean): BaseApiResponse
    }

    /**
     * Documentations (only Chinese): 
     * @link https://open.1688.com/solution/solutionDetail.htm?spm=a260s.11247765.je8hk6gy.17.66cf32ba9bXrso&solutionKey=1662715146260#apiAndMessageList
     */
    export class RetailSourcingSolution extends API1688 {
        constructor(appKey: number, secretKey: string, access_token: string);

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.account:alibaba.account.basic-1&aopApiCategory=member
         */
        public getAccountInfo(): Promise<APIResponse>

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.pifatuan.product.search.tag.list-1
         */
        public getProductRules(): Promise<APIResponse>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.pifatuan.product.list-1
         * @param param 
         */
        public getProductList(param?: {
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
        }): Promise<APIResponse>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.pifatuan.product.detail.list-1
         * @param params 
         */
        public getBatchProductDetail(params: { offerIds: number[] }): Promise<APIResponse>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.fenxiao.chosen.offerlist.get-1
         * @param params 
         */
        public getChosenStockpileList(params: { uniqueKey: string }): Promise<APIResponse>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.fenxiao.chosen.offerlist.removeall-1
         * @param params 
         */
        public clearChosenStockpileList(params: { uniqueKey: string }): Promise<APIResponse>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:dkey.get-1
         * @param params 
         */
        public genDKey(params: { offerIds: number[], entranceCode?: string }):
            Promise<{
                errorMsg: string,
                resultCode: string,
                isSuccess: boolean,
                data: string
            }>

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.product:alibaba.product.follow-1
         * @param productId 
         */
        public followProduct(productId: number):
            Promise<{
                code: number,
                message: string,
            }>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.product:alibaba.product.unfollow.crossborder-1
         * @param productId 
         */
        public unfollowProduct(productId: number):
            Promise<{
                code: number,
                message: string,
            }>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.product:alibaba.category.searchByKeyword-1&aopApiCategory=category_new
         * @param keyword 
         */
        public searchCategory(keyword: string):
            Promise<{
                success: string,
                errorCode: string,
                errorMsg: string,
                products: unknown[]
            }>

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.product:alibaba.category.get-1&aopApiCategory=category_new
         * @param categoryId 
         */
        public getCategory(categoryId: string):
            Promise<{
                success: string,
                errorCode: string,
                errorMsg: string,
                categoryInfo: unknown[]
            }>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.pifatuan.product.match.get-1
         * @param params 
         */
        public matchProduct(params: { outPersonId?: string, outOfferId?: string }): Promise<APIResponse>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.trade:alibaba.trade.addresscode.get-1&aopApiCategory=trade_new
         * @param params 
         */
        public getAddressCode(params: { areaCode: string, webSite: string }):
            Promise<{
                errorCode: string,
                errorMessage: `alibaba` | `1688`,
                result: unknown
            }>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:jxhy.product.getPageList-1
         * @param params 
         */
        public getProductPageList(params?: {
            pageNum?: number,
            pageSize?: number,
            keyword?: string,
            ruleIds?: string[],
            categoryId?: number,
            priceStart?: string,
            priceEnd?: string,
            filters?: string[]
        }): Promise<{
            success: boolean,
            message: string,
            code: string,
            result: unknown,
            pageInfo: unknown
        }>;

        /**
         * @link https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:jxhy.productFilter.get-1
         */
        public getProductFilter(): Promise<unknown>;
    }

    /**
     * Creates signature according to 1688 documentation.
     * 
     * http://gw.open.1688.com/dev/tools/request_signature.html?spm=a260s.26059351.0.0.47a055edCGYShm
     */
    export function sign(): string;
}

type AppInfo = {
    appKey: number;
    secretKey: string;
}

interface BaseApiResponse {
    status: boolean;
    statusText: string;
    body: APIResponse;
}

interface APIResponse {
    success: boolean;
    code: string;
    message: string;
    result: unknown;
    [key: string]: unknown;
}

interface APIErrorMsg {
    statusText: string;
    body: APIResponse;
}

interface RequestParams {
    access_token?: string;
    _aop_signature?: string;
    _aop_timestamp?: string;
    [key: string]: unknown;
}

interface CargoParam {
    offerId: number;
    specId: string;
    quantity: number;
}

interface AddressParam {
    addressId: number;
    fullName: string;
    mobile: string;
    phone: string;
    postCode: string;
    cityText: string;
    areaText: string;
    townText: string;
    provinceText: string;
    adress: string;
    districtCode: string;
}