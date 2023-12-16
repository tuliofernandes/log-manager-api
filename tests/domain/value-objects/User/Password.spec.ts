import { Password } from "@/domain/value-objects";

describe("[VO] Password", () => {
  const invalidValues = [
    "",
    "password",
    "12345678",
    "Abcdefgh",
    "abcdefgh",
    "12345678a",
    "Abcdefgh1",
    "Abcdefgh123$Abcdefgh123@@Abcdefg%%",
  ];
  const validValues = [
    "Abcdefgh1!",
    "Abcdefgh12!",
    "Abcdefgh123!",
    "Abcdefgh1!@",
    "Abcdefgh12#",
    "Abcdefgh123$Abcdefgh123@@Abcdefg",
    "_],kqFPI+o9v",
    "))Z#3PyO=4S<T",
    "Y`g8Z[s8",
    "e=RzgR6n:T6V;'s_9~`",
    "ZH]hq?9Oeu.H",
    "(5k>`WE8|x/BP7^Cy;?*",
    'E"3O!#!f%BClD`(-,077w',
    "]rV:128p ;JQi?c",
    '7Z7YsZrr`_2aY h8"cc;3RV[JB`@',
    ")P9>A8~4lK,nmQlH,k=(G/cf9yZ%",
    "[ ]mnS}~48qMZ);rKicLYUAOIQd#)u+*",
    "/!x)0|U~Iz?(C",
    '.p7"*2WLBl6LtTXO! [!DPndAT$hp&u',
    "MmbaCI!r8+7NdSO@%m/+D!4o~U2Cv<",
    ".TkF,1%5JMU<+3Sxh}",
    "7zM`!o)[%DV@[]~L}nM)Fq9ni",
    "-S5%47c(h%E<e!s6ew4f}Tu;ny",
    "EKs9_}:BxZ)8:/!EM+BOE3{WIhIq2U)",
    "UN&j)hpP5737C?)tR<.0DRA^",
    '!gq`oMvE>_/-e)SL.U2"@EBQLm',
    "! ,W;vA*h.(:tfwB0fOCyZ3Qd[",
  ];

  describe("validation", () => {
    invalidValues.forEach((value) => {
      it(`Should throw on invalid value "${value}"`, () => {
        expect(() => new Password(value)).toThrow("Invalid password");
      });
    });

    validValues.forEach((value) => {
      it(`Should not throw on valid value "${value}"`, () => {
        expect(() => new Password(value)).not.toThrow();
      });
    });
  });

  describe("methods", () => {
    it("toString should return the value", () => {
      expect(new Password("Abcdefgh1!").toString()).toBe("Abcdefgh1!");
    });

    it("getRegexp should return the value-object regexp", () => {
      expect(Password.getPattern()).toEqual(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,32}$/
      );
    });
  });
});
