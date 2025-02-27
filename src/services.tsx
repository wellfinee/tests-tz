import arrow from "./assets/arrow.svg"

export function capitalizeFirstLetter(str: string): string {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
}
export function cleanURL(url:string) {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
}
export const handleSort = (key: string, setSortConfig: Function) => {
    setSortConfig((prev: { key: string; direction: "asc" | "desc" } | null) => ({
        key,
        direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
};


export const getSortSymbol = (key: string, sortConfig:{ key: string; direction: "asc" | "desc" } | null) => {
    if (sortConfig?.key === key) {
        return <img  src={arrow} style={{width: "10px", height: "10px",marginLeft: "10px", transform: sortConfig.direction === "asc" ? "rotateZ(90deg) translateX(-1px)" : " rotateZ(-90deg) translateX(-1px)"}}/>
    }
    return "";
};