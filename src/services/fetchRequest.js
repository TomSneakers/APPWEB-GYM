// // src/services/fetchRequest.js
// const API_URL = import.meta.env.VITE_API_URL;
// export class FetchRequest {
//     constructor(method, resource) {
//         this.method = method;
//         this.url = `${API_URL}${resource}`;
//         this.headers = {};
//         this.isUsingAuthorization = false;
//     }

//     withBody(body) {
//         this.body = JSON.stringify(body);
//         this.headers = {
//             "Content-Type": "application/json",
//         };
//         return this;
//     }

//     addHeader(key, value) {
//         this.headers[key] = value;
//         return this;
//     }

//     withAuthorization() {
//         this.isUsingAuthorization = true;
//         return this;
//     }

//     async send() {
//         if (this.isUsingAuthorization) {
//             const accessToken = localStorage.getItem("accessToken");

//             if (accessToken) {
//                 this.addHeader("Authorization", `Bearer ${accessToken}`);
//             } else {
//                 throw new Error("No access token found");
//             }
//         }

//         const options = {
//             method: this.method,
//             headers: this.headers,
//         };

//         if (this.body) {
//             options.body = this.body;
//         }

//         try {
//             const response = await fetch(this.url, options);

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 const errorMessage = errorData.message || "An error occurred";
//                 throw new Error(errorMessage);
//             }

//             return response.json();
//         } catch (error) {
//             throw new Error(error.message || "Network error");
//         }
//     }

//     static post(resource) {
//         return new FetchRequest("POST", resource);
//     }

//     static get(resource) {
//         return new FetchRequest("GET", resource);
//     }

//     static put(resource) {
//         return new FetchRequest("PUT", resource);
//     }

//     static delete(resource) {
//         return new FetchRequest("DELETE", resource);
//     }
// }
const API_URL = import.meta.env.VITE_API_URL;

export class FetchRequest {
    constructor(method, resource) {
        this.method = method;
        this.url = `${API_URL}${resource}`;
        this.headers = {};
        this.isUsingAuthorization = false;
    }

    withBody(body) {
        this.body = JSON.stringify(body);
        this.headers = {
            "Content-Type": "application/json",
        };
        return this;
    }

    addHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    withAuthorization() {
        this.isUsingAuthorization = true;
        return this;
    }

    async send() {
        if (this.isUsingAuthorization) {
            const accessToken = localStorage.getItem("accessToken");

            if (accessToken) {
                this.addHeader("Authorization", `Bearer ${accessToken}`);
            } else {
                throw new Error("No access token found");
            }
        }

        const options = {
            method: this.method,
            headers: this.headers,
        };

        if (this.body) {
            options.body = this.body;
        }

        try {
            const response = await fetch(this.url, options);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `HTTP error ${response.status}`;
                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error) {
            console.error("FetchRequest error:", error);
            throw new Error(error.message || "Network error");
        }
    }

    static post(resource) {
        return new FetchRequest("POST", resource);
    }

    static get(resource) {
        return new FetchRequest("GET", resource);
    }

    static put(resource) {
        return new FetchRequest("PUT", resource);
    }

    static delete(resource) {
        return new FetchRequest("DELETE", resource);
    }
}
