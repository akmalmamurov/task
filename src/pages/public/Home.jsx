import { Typography, Card } from "@material-tailwind/react";

const Home = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      <Card className="p-8 shadow-lg bg-blue-gray-100">
        <Typography variant="h4" className="text-center font-bold text-blue-gray-800">
          Welcome to Our Project
        </Typography>
        <Typography className="mt-4 text-lg text-blue-gray-700">
          This project demonstrates a comprehensive approach to building web applications, incorporating the following tools and technologies:
        </Typography>

        <ul className="mt-4 space-y-2">
          <li><strong>Zustand:</strong> for state management, providing lightweight and efficient global state handling.</li>
          <li><strong>React Hook Form:</strong> to manage forms with ease, ensuring validation and controlled input handling.</li>
          <li><strong>Material Tailwind UI:</strong> used to create clean, responsive UI components.</li>
          <li><strong>Tailwind CSS:</strong> for utility-first CSS that helps us build custom designs rapidly.</li>
          <li><strong>React Auth Kit:</strong> manages authorization efficiently, allowing for secure user authentication.</li>
          <li><strong>React Router DOM:</strong> handles client-side routing with ease, enabling single-page navigation.</li>
          <li><strong>useDebounce:</strong> reduces unnecessary API requests by debouncing search queries.</li>
          <li><strong>Axios:</strong> for API requests, allowing efficient data fetching and interaction with the backend.</li>
        </ul>

        <Typography className="mt-4 text-lg text-blue-gray-700">
          Throughout the project, we implemented various functionalities such as CRUD operations, pagination, sorting, filtering, and more, providing a seamless user experience. Our goal was to create an intuitive, user-friendly interface backed by robust features.
        </Typography>

        <Typography className="mt-4 text-lg text-blue-gray-700">
          Explore the different pages to see how the random page functionality, single-page design, and optimized search work with ease.
        </Typography>
      </Card>
    </div>
  );
};

export default Home;
