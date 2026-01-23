"use client";

import "./globals.css";
import { ApolloProvider } from "@apollo/client/react";
import { makeClient } from "./apollo-client";
import { Suspense } from "react";
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from "@/src/lib/nhost";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const client = makeClient()
    return (
        <>
                <Suspense>
                    <NhostProvider nhost={nhost}>
                        <ApolloProvider client={client}>
                            {children}
                        </ApolloProvider>
                    </NhostProvider>
                </Suspense>
    </>
    );
}