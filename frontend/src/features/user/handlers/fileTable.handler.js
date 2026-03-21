import * as fileTableService from "../services/fileTable.service";

export const getUserVideos = async () => {
    return await fileTableService.getUserVideos();
};
