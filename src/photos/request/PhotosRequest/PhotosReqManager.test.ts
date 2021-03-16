import PhotosReqManager from "./PhotosReqManager";

global.AbortController = jest.fn();

let reqManager = null;

describe("PhotosReqManager", () => {
  test("Does it work", async () => {
    reqManager = new PhotosReqManager();

    const resData: TGetPhotosData = {
      hasNextPage: false,
      photos: new Map(),
      nextPageDocRef: "nextPageDocRef",
    };

    const reqData: IPhotosReqData = {
      isLoadMore: false,
      searchState: {
        tagsIds: [],
        yearsOld: -1,
        isSearch: false,
      },
      //nextPageDocRef?: any;
    };

    //req.request = jest.fn().mockResolvedValue(resData);

    //req.fetch(reqData);
  });
});
