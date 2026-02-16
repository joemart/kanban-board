import Kanban from "./page.server";
import { Metadata } from "next";


export async function generateMetadata():Promise<Metadata>{


    return {
        title: "Kanban board",
        description: "This is a Kanban board that allows you to create your own board. Inside the board, you can create columns and adjust their information and positioning. You will need an email to log in.",
        applicationName: "Kanban board",
        authors: {name: "Joe", url: "https://portfolio-joemart.vercel.app/"},
        keywords: ["kanban", "board", "joemart", "next", "nextjs", "graphql", "nhost", "apollo", "tailwindcss", "tailwind", "proxy", "auth", "codegen", "jest", "vercel"],
        robots: {googleBot: {index: true, follow: true}}
    }
}

const Home = () => {

    return ( <Kanban></Kanban> );
}
 
export default Home;