import requestData from '../../commons/libs/requestData';




export default function apiConfig(nid) {
    return requestData(`/note/config/${nid}`);
}