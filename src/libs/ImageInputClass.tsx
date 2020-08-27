import { UploadFile } from "antd/lib/upload/interface";

export default class ImageInputClass {
    className: string = "Class 0";
    disabled: boolean = false;
    images: UploadFile[] = [];
    rendered:boolean = false;
    constructor(className?:string|number) {
        if (typeof className === "string") this.className = className;
        if (typeof className === "number") this.className = `Class ${className}`;
    }
};