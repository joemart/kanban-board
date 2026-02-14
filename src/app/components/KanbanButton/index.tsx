import { Button } from "@/ui/button";

const KanbanButton = (props:React.ComponentProps<typeof Button>) => {
    return ( <Button {...props} variant={"outline"} size={"xs"}></Button> );
}
 
export default KanbanButton;