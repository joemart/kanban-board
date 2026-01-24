import { NhostClient } from "@nhost/nextjs";

export const nhost = new NhostClient(process.env.NODE_ENV == "development" ? {
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!,
} : {
    subdomain: process.env.NHOST_SUBDOMAIN,
    region: process.env.NHOST_REGION
});