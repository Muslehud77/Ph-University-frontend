import { Button, Modal, Space } from "antd";
import { useState } from "react";
import { useGetAssignedFacultiesQuery, useUpdateAssignedFacultiesMutation } from "../../../redux/features/admin/courseManagement.api";
import { TFaculty } from "../../../types";
import PHForm from "../../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { useToastPromise } from "../../../hooks/useToastPromise";



type AssignFacultyProps = {
  _id: string;
};

const AssignFaculty = ({ _id }: AssignFacultyProps) => {
    const {toastPromise} = useToastPromise()
    const [skipFetching,setSkipFetching] = useState(true) 
    const { data: assignedFaculties, isLoading: assignedFacultiesLoading } =
      useGetAssignedFacultiesQuery(_id, { skip: skipFetching });
    const {data:allFaculties, isLoading:allFacultiesLoading} = useGetAllFacultiesQuery(undefined,{skip:skipFetching||assignedFacultiesLoading})

    const [assignFaculty] = useUpdateAssignedFacultiesMutation()

    const [open, setOpen] = useState<boolean>(false);
   

    const faculties = assignedFaculties?.data?.faculties;

    
   

    const assignedFacultyIds = new Set(faculties?.map((f: TFaculty) => f._id));

    const options = allFaculties?.data.filter(
      (f: TFaculty) => !assignedFacultyIds?.has(f._id)
    );

    
    
    const onclick = ()=>{
        setSkipFetching(false)
        setOpen(true);
    }
    
    const closeModal = ()=>{
        setSkipFetching(true);
        setOpen(false);
    }

     const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
       await toastPromise(
         assignFaculty,
         { data, _id },
         "Assigning faculties..."
       );
       closeModal()
     };


    const facultyOptions = options?.map((f: TFaculty) => ({
      value: f._id,
      label: `${f.name.firstName} ${f.name.middleName} ${f.name.lastName} ${f.id}`,
    })) || [];


  return (
    <>
      <Button type="dashed" onClick={onclick}>
        Assign Faculty
      </Button>
      <Modal
      footer={null}
        title={<h2>Assign Faculties</h2>}
        loading={assignedFacultiesLoading || allFacultiesLoading}
        open={open}
        onOk={closeModal}
        onCancel={closeModal}
      >
        {faculties?.length && (
          <>
            <h3>Existing Faculties</h3>
            {!assignedFacultiesLoading || faculties?.length ? (
              faculties?.map((faculty: TFaculty) => (
                <p key={faculty._id}>
                  {`${faculty.name.firstName} ${faculty.name.middleName} ${faculty.name.lastName} ${faculty.id}`}
                </p>
              ))
            ) : (
              <></>
            )}
          </>
        )}
        <h3>Choose Faculties</h3>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect options={facultyOptions} name="faculties" multiple={true} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default AssignFaculty;
