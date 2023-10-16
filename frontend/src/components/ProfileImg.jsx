const ProfileImg = ({ w, buttonStyle, children, ...rest }) => {
  return (
    <button className={`${buttonStyle}`} {...rest}>
      <div className={`flex items-center justify-center w-${w} h-${w}`}>
        <img
          className="w-full h-auto rounded-full"
          src="https://ui-avatars.com/api/?name=User&background=4285F5&color=fff&size=256"
          alt="user photo"
        />
      </div>
      {children}
    </button>
  );
};

export default ProfileImg;
