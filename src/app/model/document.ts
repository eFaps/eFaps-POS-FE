export interface Document {
    oid: string;
    number: string;
    items: DocItem[];
}

export interface Order extends Document {

}

export interface Receipt extends Document {

}

export interface DocItem {
    index: number;
}
