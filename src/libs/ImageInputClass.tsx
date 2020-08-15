export default class ImageInputClass {
    className: string = "Class 0";
    disabled: boolean = false;
    images: [] = [];
    constructor(className?:string|number) {
        if (typeof className === "string") this.className = className;
        if (typeof className === "number") this.className = `Class ${className}`;
    }
};