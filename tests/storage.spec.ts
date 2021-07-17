const expect = require("expect")
import {GradeStorage} from "../src/core/storage";
import {toIDBBoolean} from "../src/core/utils";

describe("core/storage.ts", ()=>{
    it("opens",async ()=>{
        // why? hope fake db is working
        let db = new GradeStorage()
        await db.open()
        await db.close()
    })

    it("also opens",async ()=>{
        let db = new GradeStorage()
        let id = Math.random().toString()
        let c = {
            assignments: [],
            description: Math.random().toString(),
            id,
            isActive: toIDBBoolean(true),
            name: Math.random().toString(),
            overrideGlobalConfigs: false,
            year: 0
        }
        await db.courses.put(c)
        let c2=await db.courses.get(id)
        expect(c2).toEqual(c)
    })
})
