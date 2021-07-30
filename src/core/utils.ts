import {IDBBoolean} from "./types";

export function toIDBBoolean(b:boolean):IDBBoolean{
    return Number(b) as IDBBoolean
}
// from IDBBoolean is just the normal boolean constructor
