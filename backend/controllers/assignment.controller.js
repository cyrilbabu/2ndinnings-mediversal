import Assignment from "../models/assignment.model"

export const getAssignments=async (req,res)=>{
    try {
        const assignmentDetails = await Assignment.find({})
        if(!assignmentDetails){
            return res.status(400).json({message:"error in fetching assignment details"})
        }

        return res.status(200).json({message:"fetched assignment details successfully",assignmentDetails})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:"error in getAssignmet controller"})
    }
}

export const uploadAssignment=async (req,res)=>{
    try {
        const {patient,staff,date,role} = req.body
        const newAssignment = new Assignment({
            patient,staff,date,role
        })
        
        const result = await newAssignment.save()
        if(!result){
            return res.status(400).json({message:"error in saving assignment"})

        }
        return res.status(200).json({message:" assignment saved successfully",newAssignment})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:"error in uploadAssignment controller"})
    }
}