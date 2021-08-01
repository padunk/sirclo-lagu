export function isTemplateImage(url: string): boolean {
    const templateURL = "2a96cbd8b46e442fc41c2b86b821562f.png";
    if (url.includes(templateURL)) {
        return true;
    }
    return false;
}
