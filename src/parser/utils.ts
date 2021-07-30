import $ from "jquery";

export async function makeRequest(endpoint: string) {
    let response = await fetch("https://www.gradescope.com"+endpoint,{
        referrer:"https://www.gradescope.com",
        credentials:"include",
        keepalive:true,
        mode:"cors"

    })
    if (response.status!=200){
        console.error(response)
        throw Error("Request failed")
    }
    if (response.type!=="basic"){
        console.error(response)
        throw Error("Request failed")
    }
    let parser = new DOMParser;
    return $(parser.parseFromString(await response.text(), "text/html"));
}

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
export type DOM = Awaited<ReturnType<typeof makeRequest>>
