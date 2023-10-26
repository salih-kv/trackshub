import { IoMdPersonAdd } from "react-icons/io";
import ProfileImg from "../ProfileImg";

const UsersCard = () => {
  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between w-full">
        <h2 className="font-semibold">People to Follow</h2>
        <span className="text-sm text-gray-500">Refresh</span>
      </header>
      <div className="mt-4 flex flex-col gap-6">
        <User
          imgUrl="https://picsum.photos/id/64/80/80"
          name="Alexander Shustov"
        />
        <User
          imgUrl="https://picsum.photos/id/91/80/80"
          name="Jennifer Trovato"
        />
        <User
          imgUrl="https://picsum.photos/id/65/80/80"
          name="Jussie Leibnow"
        />
        <User
          imgUrl="https://picsum.photos/id/239/80/80"
          name="Coley Christine"
        />
      </div>
    </div>
  );
};

export default UsersCard;

const User = ({ imgUrl, name }) => {
  return (
    <div className="flex items-center justify-between overflow-hidden">
      <div className="mr-6">
        <ProfileImg w={10} />
      </div>
      <div className="mr-auto">
        <h4 className="font-semibold text-sm">{name}</h4>
        <p className="text-gray-500 text-xs">567 Followers</p>
      </div>
      <div className="bg-black px-4 py-2 rounded-3xl">
        <IoMdPersonAdd className="text-white" />
      </div>
    </div>
  );
};
