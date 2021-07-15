import $ from "jquery";

export async function makeRequestToGradescope(endpoint: string) {
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
        // this is only possible if the browser has CORS restriction disabled
        // through the --disable-web-security flag at launch time or if the
        // code is running as a browser extension with origin permission to
        // www.gradescope.com.
        console.error(response)
        throw Error("Request failed")
    }
    let parser = new DOMParser;
    return $(parser.parseFromString(await response.text(), "text/html"));
}

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
export type DOM = Awaited<ReturnType<typeof makeRequestToGradescope>>
