import { maskFromString, maskToString, parseReviver, pipe } from './json.utils';

describe("JSON utils test suite", () => {

    it("should convert a text mask to string correctly", () => {

        let testValue1 = "test",
            testValue2 = /[1-9]/,
            testValue3 = [testValue1, testValue2],
            testResult3 = maskToString(testValue3) as string[];

        expect(maskToString(testValue1)).toEqual(testValue1);
        expect(maskToString(testValue2)).toEqual(testValue2.toString());

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(testValue2.toString());

        expect(maskToString({} as string)).toBeNull();
    });

    it("should recreate a text mask from string correctly", () => {

        let testValue1 = "test",
            testValue2 = "/[1-9]/",
            testValue3 = [testValue1, testValue2],
            testResult3 = maskFromString(testValue3) as (string | RegExp)[];

        expect(maskFromString(testValue1)).toEqual(testValue1);
        expect(maskFromString(testValue2)).toEqual(new RegExp("[1-9]"));

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(new RegExp("[1-9]"));

        expect(maskFromString({} as string)).toBeNull();
    });

    it("should recreate a date from string correctly", () => {

        let testValue1 = "2011-10-05T14:48:00.000Z";

        expect(parseReviver("test", testValue1)).toEqual(new Date(testValue1));
    });

    it("should pass object in multiple functions", () => {
       const object = { id: 'test' },
            modifyId = (modifier: string) => (x: any) => {
           x.id = `${x.id}${modifier}`;
           return x;
       };

       expect(pipe(modifyId('1'), modifyId('2'))(object)).toEqual(jasmine.objectContaining({ id: 'test12' }));
    });
});
