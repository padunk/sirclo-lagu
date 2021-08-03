import * as utils from "../../helpers/utils";

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
