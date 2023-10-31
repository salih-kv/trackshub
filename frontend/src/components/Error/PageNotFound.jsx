const PageNotFound = () => {
  return (
    <section className="flex items-center h-full dark:bg-s-dark dark:text-gray-100">
      <div className="mx-auto">
        <div className="flex justify-center items-center gap-8 max-w-xl h-full pt-14">
          <h2 className="font-extrabold text-7xl dark:text-gray-600">404</h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&#39;t find this page.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
