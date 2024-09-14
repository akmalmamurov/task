import { Link, useParams } from "react-router-dom";
import { Card, Typography, Avatar, Button } from "@material-tailwind/react";
import useFetchDataById from "@/hooks/useFetchDataById";

const UserDetails = () => {
  const { id } = useParams();
  const { data: user } = useFetchDataById("users", id);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="my-6 ">
      <Link to="/dashboard/users">
        <Button variant="text" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
          Back
        </Button>
      </Link>
      <div className="w-full flex justify-center">
        <Card className="w-full max-w-3xl p-6 my-6 bg-white shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              size="lg"
            />
            <div>
              <Typography variant="h5" className="font-bold text-blue-gray-800">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle1" className="text-blue-gray-600">
                {user.role === "admin"
                  ? "Admin"
                  : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Typography>
            </div>
          </div>

          <Typography variant="subtitle2" className="text-blue-gray-700 mb-2">
            Age: {user.age}, Gender: {user.gender}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700 mb-2">
            Eye Color: {user.eyeColor}, Hair: {user.hair.color} (
            {user.hair.type})
          </Typography>

          <Typography
            variant="h6"
            className="font-bold text-blue-gray-800 mt-4"
          >
            Contact Information
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Email: {user.email}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Phone: {user.phone}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Address: {user.address.address}, {user.address.city},{" "}
            {user.address.state} ({user.address.stateCode}),{" "}
            {user.address.postalCode}, {user.address.country}
          </Typography>

          <Typography
            variant="h6"
            className="font-bold text-blue-gray-800 mt-4"
          >
            Company Information
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Company: {user.company.name}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Department: {user.company.department}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Title: {user.company.title}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Address: {user.company.address.address}, {user.company.address.city}
            , {user.company.address.state}
          </Typography>

          <Typography
            variant="h6"
            className="font-bold text-blue-gray-800 mt-4"
          >
            Bank Details
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Card Type: {user.bank.cardType}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Card Expire: {user.bank.cardExpire}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Currency: {user.bank.currency}
          </Typography>

          <Typography
            variant="h6"
            className="font-bold text-blue-gray-800 mt-4"
          >
            Crypto Information
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Coin: {user.crypto.coin}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Wallet: {user.crypto.wallet}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-gray-700">
            Network: {user.crypto.network}
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
