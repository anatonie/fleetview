import Amplify, { API } from 'aws-amplify';

let orgInfo;
export const getOrgInfo = async () => {
    if (orgInfo) {
        return orgInfo;
    }
    const apiConfig = Amplify._config.aws_cloud_logic_custom.find(({name}) => name === 'apie2d7ff2b');
    orgInfo = await API.get(apiConfig.name, '/describe-org', {});
    return orgInfo;
};
