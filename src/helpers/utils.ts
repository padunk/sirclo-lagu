export function isTemplateImage(url: string | undefined): boolean {
    const templateURL = "2a96cbd8b46e442fc41c2b86b821562f.png";
    if (typeof url === "string" && url.includes(templateURL)) {
        return true;
    }
    return false;
}

export const customAvatarTemplate = "/assets/images/undraw_mello_otq1.svg";
export const customCoverTemplate = "/assets/images/cover_template.jpg";
