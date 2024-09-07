import { useStaff } from "../query/useStaff";
export default function StaffDetails({id}){
    const { staff, isLoading } = useStaff(id)
    if (isLoading) return null
       
    return (
        <p>{staff.name}</p>
    
    )
}