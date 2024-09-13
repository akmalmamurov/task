import UserModal from "@/components/modal/UserModal";
import Pagination from "@/components/pagination/Pagination";
import UserTable from "@/components/table/UserTable";
import { LIMIT } from "@/constants/api";
import { userHeader } from "@/data";
import { useCreateData, useFetchData } from "@/hooks";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";

const Users = () => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [tableElement, setTableElement] = useState({});
  const ref = useRef(null);
  const { data: user, isLoading } = useFetchData(
    "users",
    skip,
    search,
    sortBy,
    order
  );
  const { mutate: createUser } = useCreateData("users");
  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setIsOpen(!isOpen);
  };
  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      address: {
        city: data.city,
        address: data.address,
      },
    };
    createUser(formattedData);
    handleOpen();
  };
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSearch("");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(user);
  const pageProps = {
    skip,
    setSkip,
    totalPages: Math.ceil((user?.total || 0) / LIMIT),
    limit: LIMIT,
  };
  const classBtn = "min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm";
  return (
    <div className="my-6">
      <div className="flex mb-4 justify-between">
        <div className="flex gap-10">
          <Button className={classBtn} onClick={() => handleOpen({})}>
            Create User
          </Button>
          <div className="relative" ref={ref}>
            <Input
              value={search}
              label="Search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white"
            />
            {search && (
              <span className="cursor-pointer" onClick={(e) => setSearch("")}>
                <XMarkIcon className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-10">
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            className="bg-white"
          >
            <Option value="firstName">First Name</Option>
            <Option value="lastName">Last Name</Option>
          </Select>
          <Select
            label="Order"
            value={order}
            onChange={(value) => setOrder(value)}
            className="bg-white"
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <Button
            className={classBtn}
            onClick={() => {
              setSortBy("");
              setOrder("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      <Card className="my-6 bg-transparent">
        <CardBody
          className="px-0 pt-0 pb-2 overflow-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          <table className="w-full min-w-[640px] table-auto">
            <thead className="bg-blue-gray-900 text-white">
              <tr>
                {Object.values(userHeader).map((el, index) => (
                  <th
                    key={index}
                    className="py-3 px-5 text-left border-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase"
                    >
                      {el.name}
                    </Typography>
                  </th>
                ))}
                <th
                  key="Действия"
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase"
                  >
                    Действия
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="12">
                    <div className="flex justify-center items-center h-20">
                      <Spinner className="h-12 w-12 text-blue-gray-500" />
                    </div>
                  </td>
                </tr>
              ) : (
                user?.users.map((el, index) => (
                  <UserTable key={index} element={el} handleOpen={handleOpen} />
                ))
              )}
            </tbody>
          </table>
        </CardBody>
        <Pagination {...pageProps} />
      </Card>
      <UserModal
        isModalOpen={isOpen}
        handleOpen={handleOpen}
        onSubmit={onSubmit}
        element={tableElement}
      />
    </div>
  );
};

export default Users;
