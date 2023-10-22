import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen dark:bg-p-dark">
      <Bars
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        color="#774eff"
      />
    </div>
  );
};

export default Loading;
