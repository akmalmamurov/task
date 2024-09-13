import { useDeleteData } from "@/hooks/useDeleteData";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

const UserTable = ({ element, handleOpen }) => {
  const className = ` py-3 px-4`;
  const { mutate: deleteUser } = useDeleteData("users");
  const handleDelte = (id) => {
    deleteUser(id);
  };
  return (
    <>
      <tr className="bg-white text-black overflow-x-auto">
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.username}
          </Typography>
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.firstName}
          </Typography>
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.lastName}
          </Typography>
        </td>
        <td className={className}>
          <img src={element.image} alt="" className="w-10 h-10" />
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.birthDate.split("-").reverse().join("-")}
          </Typography>
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.email}
          </Typography>
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.gender}
          </Typography>
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.role}
          </Typography>
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            <span className=""> {element.address.city},</span>
            {element?.address.address}
          </Typography>
        </td>
        <td className={className}>
          <Typography variant="small" className="text-xs font-medium">
            {element.phone}
          </Typography>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-5 w-5 text-blue-500 cursor-pointer"
              onClick={() => handleOpen(element)}
            >
              <PencilSquareIcon />
            </div>

            <div
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => handleDelte(element.id)}
            >
              <TrashIcon />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserTable;
