import * as utils from "../../helpers/utils";
import { QueryMethod } from "../../types";

test("check templage image function", () => {
    expect(utils.isTemplateImage("hello")).toEqual(false);
    expect(utils.isTemplateImage(undefined)).toEqual(false);
    expect(
        utils.isTemplateImage("2a96cbd8b46e442fc41c2b86b821562f.png")
    ).toEqual(true);
});

test("check range function", () => {
    expect(utils.range(0, 9, 1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(utils.range(0, 9, 2)).toEqual([0, 2, 4, 6, 8]);
    expect(utils.range(0, 9, 3)).toEqual([0, 3, 6, 9]);
});

test("generate end point function", () => {
    let method = QueryMethod.searchArtist;
    let _page = 1,
        _limit = 24,
        query = "u2";
    let expectedResult = `http://ws.audioscrobbler.com/2.0/?method=${method}&artist=${query}&page=${_page}&limit=${_limit}&api_key=${process.env.VITE_LAST_FM_API_KEY}&format=json`;

    expect(utils.generateEndPoint({ method, _page, _limit, query })).toEqual(
        expectedResult
    );
    expect(utils.generateEndPoint({ method, _limit, query })).toEqual(
        expectedResult
    );
    expect(utils.generateEndPoint({ method, query })).toEqual(expectedResult);

    method = QueryMethod.searchTrack;
    expectedResult = `http://ws.audioscrobbler.com/2.0/?method=${method}&track=${query}&page=${_page}&limit=${_limit}&api_key=${process.env.VITE_LAST_FM_API_KEY}&format=json`;

    expect(utils.generateEndPoint({ method, query })).toEqual(expectedResult);
});
