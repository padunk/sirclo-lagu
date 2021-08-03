import * as formatter from "../../helpers/formatter";

test("should format time correctly", () => {
    expect(formatter.timeFormatter(201000)).toEqual("3:21");
    expect(formatter.timeFormatter(61000)).toEqual("1:01");
});

test("should format number correctly", () => {
    expect(formatter.numberFormatter()).toEqual({
        formattedNumber: "",
        satuan: "",
    });
    expect(formatter.numberFormatter(999_999)).toHaveProperty(
        "formattedNumber"
    );
    expect(formatter.numberFormatter(999_999)).toHaveProperty("satuan");
    expect(formatter.numberFormatter("999999")).toEqual({
        formattedNumber: "999.99",
        satuan: "K",
    });
    expect(formatter.numberFormatter(999_999)).toEqual({
        formattedNumber: "999.99",
        satuan: "K",
    });
    expect(formatter.numberFormatter(9_999_999)).toEqual({
        formattedNumber: "9.99",
        satuan: "M",
    });
    expect(formatter.numberFormatter(99_999_999)).toEqual({
        formattedNumber: "99.99",
        satuan: "M",
    });
});
