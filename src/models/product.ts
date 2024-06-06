// To parse this data:
//
//   import { Convert, Jewelry } from "./file";
//
//   const jewelry = Convert.toJewelry(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Jewelry {
    id:          number;
    created_at:  Date;
    updated_at:  Date;
    created_by:  string;
    updated_by:  string;
    is_deleted:  boolean;
    sku_code:    string;
    name:        string;
    description: string;
    rating:      number;
    category:    number;
    coupon:      Coupon;
    reviews:     Review[];
    images:      Image[];
    variants:    number[];
    options:     Image[];
    price:       number;
    quantity:    number;
}

export interface Coupon {
    id:                  number;
    created_at:          Date;
    updated_at:          Date;
    created_by:          string;
    updated_by:          string;
    is_deleted:          boolean;
    code:                string;
    discount_percentage: number;
    expiration_date:     Date;
    applicable_items:    string[];
}

export interface Image {
    id:            number;
    created_at:    Date;
    updated_at:    Date;
    created_by:    string;
    updated_by:    string;
    is_deleted:    boolean;
    url?:          string;
    name?:         string;
    optionValues?: Image[];
    value?:        string;
}

export interface Review {
    id:         number;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    is_deleted: boolean;
    user:       User;
    text:       string;
    images:     Image[];
    rating:     number;
}

export interface User {
    id:          number;
    created_at:  Date;
    updated_at:  Date;
    created_by:  string;
    updated_by:  string;
    is_deleted:  boolean;
    account_id:  string;
    username:    string;
    avatar:      Image;
    status:      boolean;
    information: Information;
    employee:    number;
    customer:    number;
    is_employee: boolean;
}

export interface Information {
    id:         number;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    is_deleted: boolean;
    name:       string;
    birthday:   Date;
    gender:     string;
    contact:    Contact;
}

export interface Contact {
    id:         number;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    is_deleted: boolean;
    email:      string;
    phone:      string;
    address:    string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toJewelry(json: string): Jewelry {
        return cast(JSON.parse(json), r("Jewelry"));
    }

    public static jewelryToJson(value: Jewelry): string {
        return JSON.stringify(uncast(value, r("Jewelry")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}


function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Jewelry": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "created_by", js: "created_by", typ: "" },
        { json: "updated_by", js: "updated_by", typ: "" },
        { json: "is_deleted", js: "is_deleted", typ: true },
        { json: "sku_code", js: "sku_code", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "rating", js: "rating", typ: 0 },
        { json: "category", js: "category", typ: 0 },
        { json: "coupon", js: "coupon", typ: r("Coupon") },
        { json: "reviews", js: "reviews", typ: a(r("Review")) },
        { json: "images", js: "images", typ: a(r("Image")) },
        { json: "variants", js: "variants", typ: a(0) },
        { json: "options", js: "options", typ: a(r("Image")) },
        { json: "price", js: "price", typ: 0 },
        { json: "quantity", js: "quantity", typ: 0 },
    ], false),
    "Coupon": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "created_by", js: "created_by", typ: "" },
        { json: "updated_by", js: "updated_by", typ: "" },
        { json: "is_deleted", js: "is_deleted", typ: true },
        { json: "code", js: "code", typ: "" },
        { json: "discount_percentage", js: "discount_percentage", typ: 0 },
        { json: "expiration_date", js: "expiration_date", typ: Date },
        { json: "applicable_items", js: "applicable_items", typ: a("") },
    ], false),
    "Image": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "created_by", js: "created_by", typ: "" },
        { json: "updated_by", js: "updated_by", typ: "" },
        { json: "is_deleted", js: "is_deleted", typ: true },
        { json: "url", js: "url", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "optionValues", js: "optionValues", typ: u(undefined, a(r("Image"))) },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], false),
    "Review": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "created_by", js: "created_by", typ: "" },
        { json: "updated_by", js: "updated_by", typ: "" },
        { json: "is_deleted", js: "is_deleted", typ: true },
        { json: "user", js: "user", typ: r("User") },
        { json: "text", js: "text", typ: "" },
        { json: "images", js: "images", typ: a(r("Image")) },
        { json: "rating", js: "rating", typ: 0 },
    ], false),
    "User": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "created_by", js: "created_by", typ: "" },
        { json: "updated_by", js: "updated_by", typ: "" },
        { json: "is_deleted", js: "is_deleted", typ: true },
        { json: "account_id", js: "account_id", typ: "" },
        { json: "username", js: "username", typ: "" },
        { json: "avatar", js: "avatar", typ: r("Image") },
        { json: "status", js: "status", typ: true },
        { json: "information", js: "information", typ: r("Information") },
        { json: "employee", js: "employee", typ: 0 },
        { json: "customer", js: "customer", typ: 0 },
        { json: "is_employee", js: "is_employee", typ: true },
    ], false),
    "Information": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "created_by", js: "created_by", typ: "" },
        { json: "updated_by", js: "updated_by", typ: "" },
        { json: "is_deleted", js: "is_deleted", typ: true },
        { json: "name", js: "name", typ: "" },
        { json: "birthday", js: "birthday", typ: Date },
        { json: "gender", js: "gender", typ: "" },
        { json: "contact", js: "contact", typ: r("Contact") },
    ], false),
    "Contact": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "created_by", js: "created_by", typ: "" },
        { json: "updated_by", js: "updated_by", typ: "" },
        { json: "is_deleted", js: "is_deleted", typ: true },
        { json: "email", js: "email", typ: "" },
        { json: "phone", js: "phone", typ: "" },
        { json: "address", js: "address", typ: "" },
    ], false),
};
