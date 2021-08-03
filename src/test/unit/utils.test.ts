import * as utils from "../../helpers/utils";

test("check templage image function", () => {
    expect(utils.isTemplateImage("hello")).toEqual(false);
    expect(utils.isTemplateImage(undefined)).toEqual(false);
    expect(
        utils.isTemplateImage("2a96cbd8b46e442fc41c2b86b821562f.png")
    ).toEqual(true);
});
