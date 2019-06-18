import global from '@/core/global/global'
const getparams=global.getParam()
const params={
    name:getparams.name||"",
    sex:getparams.sex||"",
    v:new Date().getTime()
}
export default params;