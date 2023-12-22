import http from "../http-common";

class UploadFileService {
    upload(file: any, onUploadProgress: any) {
        const formData = new FormData();

        formData.append("file", file);

        return http.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress
        })
    }

    getFiles() {
        return http.get("/files");
    }
}

export default new UploadFileService();