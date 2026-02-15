import { Button } from "@/ui/button";

const KanbanButton = (props:React.ComponentProps<typeof Button>) => {
    return ( <Button {...props} variant={"outline"} size={"xs"} className=" border-prime bg-prime"></Button> );
}
 
export default KanbanButton;