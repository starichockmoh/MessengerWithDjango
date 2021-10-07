export const ToCorrectImage = (image: string) => {
    if (image && image.startsWith("http://127.0.0.1:8000")) return image
    return "http://127.0.0.1:8000" + image
}