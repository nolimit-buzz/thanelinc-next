// Cloudinary already sits in front of CMS-uploaded images; ask it to deliver an
// auto-format, auto-quality, width-capped version instead of shipping a large
// original for Next's own image optimizer to re-transcode on every request.
const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

export function withCloudinaryTransform(url: string, maxWidth: number): string {
  if (!url.includes("res.cloudinary.com") || !url.includes(CLOUDINARY_UPLOAD_SEGMENT)) return url;

  const [prefix, suffix] = url.split(CLOUDINARY_UPLOAD_SEGMENT);
  return `${prefix}${CLOUDINARY_UPLOAD_SEGMENT}f_auto,q_auto,w_${maxWidth}/${suffix}`;
}
