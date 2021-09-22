import differ from '../dist/index'

test(`compare(list1,list2)`, () => {
    differ.compare(li1, li2).getDiff(record => {
        expect(record.toJS()).toEqual([
            ["diff", [],
                [
                    ["del", 2],
                    ["update", 3, 56],
                    ["update", 6, "seven7"],
                    ["del", 8],
                    ["add", 10, "nine", "ooo"]
                ]
            ]
        ]);
    })
});

