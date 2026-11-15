/**
 * Client-safe content: the few strings client-only components (the error
 * boundary) need. Pure data, no file system access. The same object is fully
 * validated on the server by lib/content/index.ts during the build.
 */
import { site } from "@/content/site";

export const errorCopy = site.ui.error;
