import { BaseAPI } from "./main";

const API = new BaseAPI(6805179, `qzeXqQD59si`, `41264645-a2df-42b6-9262-082ea08b0bad`);

const image =Buffer.from(((await (await fetch(`https://cbu01.alicdn.com/img/ibank/O1CN01v0A7W61SRLFBgWSMI_!!2215644472243-0-cib.jpg`, {
    method: `GET`
})).arrayBuffer()))).toString(`base64`);
//console.log(image);


const searchResult = await API.sendRequest(`http://gw.open.1688.com/openapi/param2/1/com.alibaba.product/alibaba.public.image.similar.offer.search`,
    {
        //imgBase64:image,
        imgUrl:`https://media.crocs.com/images/t_large/f_auto/products/10126_001_ALT140/crocs-baya-clog-black-angle-view`
    },
    `GET`);
console.log(JSON.stringify(searchResult, null, 4));
